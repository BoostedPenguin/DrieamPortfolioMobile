import { Camera, CameraCapturedPicture } from "expo-camera";
import { Box, Button, HStack, Image, Text, View, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { configFiles } from "../sdk";
import { NavigationProps } from "../types/NavigationProps";
import { CustomInput } from "./VoiceUploadEvidence";

const styles = StyleSheet.create({
  information: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  cameraPreview: {
    flex: 1,
  },
});

export default function ImageUploadEvidence({ navigation }: NavigationProps) {
  //  camera permissions
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [camera, setCamera] = useState<Camera | null>(null);

  const [evidenceName, setEvidenceName] = useState("");

  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>();

  async function addPictureEvidence() {
    if (!capturedImage) return;

    let localUri = capturedImage.uri;
    let filename = localUri.split("/").pop();

    if (!filename) return;

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    //@ts-ignore
    formData.append("files[]", { uri: localUri, name: filename, type });
    formData.append("evidence_type", "file");
    formData.append("name", `Picture - ${evidenceName}`);
    //formData.append('collection_ids[]', configFiles.portfolioId);

    const res = await fetch(
      `https://portfolio.drieam.app/api/v1/portfolios/${configFiles.portfolioId}/evidence`,
      {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${configFiles.bearerToken}`,
          "X-CSRF-Token": configFiles.XCSRF,
        },
      }
    ).catch(() => {});

    navigation.navigate("Home");
  }
  async function takePicture() {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setCapturedImage(photo);
  }

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // on screen  load, ask for permission to use the camera
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status == "granted");
    }
    getCameraStatus();
  }, []);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      if (!camera) return;
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances: any = {};
      let realRatios: any = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance!;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  if (capturedImage) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <VStack>
          <CustomInput
            label="Name"
            placeholder="Enter evidence name..."
            onChangeText={setEvidenceName}
          />

          <HStack borderBottomWidth={1} borderColor="#e5e7eb" py={15} px={15}>
            <VStack flexGrow={1}>
              <Text mb={1}>Picture</Text>
              {capturedImage && (
                <Image
                  style={{
                    height: 200,
                    marginVertical: 5,
                    alignContent: "center",
                    justifyContent: "center",
                    resizeMode: "contain",
                  }}
                  alt=""
                  source={{
                    uri: capturedImage.uri,
                  }}
                />
              )}
            </VStack>
          </HStack>

          <View px={15} py={5}>
            <Button
              onPress={addPictureEvidence}
              disabled={evidenceName === ""}
              backgroundColor={evidenceName === "" ? "#d1d5db" : "#1890FF"}
            >
              Add evidence
            </Button>
          </View>
        </VStack>
      </View>
    );
  }

  if (hasCameraPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* 
              We created a Camera height by adding margins to the top and bottom, 
              but we could set the width/height instead 
              since we know the screen dimensions
              */}
        <Camera
          style={[
            styles.cameraPreview,
            { marginTop: imagePadding, marginBottom: imagePadding },
          ]}
          onCameraReady={setCameraReady}
          ratio={ratio}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignSelf: "center",
              alignItems: "center",
            }}
            onPress={takePicture}
          >
            <Box
              style={{
                width: 75,
                height: 75,
                borderRadius: 50,
                backgroundColor: "#fff",
              }}
            />
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }
}
