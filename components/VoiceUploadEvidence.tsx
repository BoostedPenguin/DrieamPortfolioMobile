import React, { useState } from "react";
import {
  IconButton,
  Text,
  View,
  HStack,
  Button,
  Box,
  VStack,
  Pressable,
  Input,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProps } from "../types/NavigationProps";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { configFiles } from "../sdk";

export default function VoiceUploadEvidence({ navigation }: NavigationProps) {
  const [evidenceName, setEvidenceName] = useState("");

  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );

  const [recordingUri, setRecordingUri] = useState<string | null>();

  const startRecordingAudio = async () => {
    await Audio.requestPermissionsAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    setRecording(recording);
  };

  const stopRecordingAudio = async () => {
    setRecording(undefined);

    if (recording) {
      await recording.stopAndUnloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      setRecordingUri(recording.getURI());
    }
  };

  const getRecordingText = () => {
    if (recording !== undefined) {
      return "Stop Recording";
    }

    if (recordingUri === undefined && recording === undefined) {
      return "Start Recording";
    }

    return "Start New Recording";
  };

  const onRecordButtonClick = async () => {
    if (recording) {
      await stopRecordingAudio();
    } else {
      await startRecordingAudio();
    }
  };

  const sendEvidence = async () => {
    let formData = new FormData();

    formData.append("files[]", {
      //@ts-ignore
      uri: recordingUri,
      name: evidenceName,
      type: "audio",
    });
    formData.append("evidence_type", "file");
    formData.append("name", evidenceName);

    const result = await fetch(
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
    ).catch((error) => console.log(error));

    console.log(result);

    navigation.navigate("Home");
  };

  return (
    <>
      <View style={{ flex: 1, marginTop: 50, marginHorizontal: 25 }}>
        <HStack>
          <IconButton
            mr={4}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignSelf: "center",
            }}
            size="sm"
            borderColor="#797979"
            variant="outline"
            _icon={{
              as: AntDesign,
              size: "sm",
              name: "left",
              color: "#000",
            }}
          />

          <VStack>
            <Text fontSize={"lg"}>Add voice upload evidence</Text>
          </VStack>
        </HStack>

        <VStack mt={5}>
          <Text>Name</Text>
          <Input
            placeholder="Name your evidence..."
            onChangeText={(value) => setEvidenceName(value)}
          />

          <Pressable onPress={async () => await onRecordButtonClick()}>
            {({ isPressed }) => {
              return (
                <Box
                  my={4}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderColor="red.500"
                  borderWidth={1}
                  height={70}
                  p={3}
                  bg={isPressed ? "#DADADA" : "#F2F2F2"}
                  style={{
                    elevation: 1,
                  }}
                >
                  <FontAwesome name="microphone" size={24} color="black" />
                  <Text>{getRecordingText()}</Text>
                </Box>
              );
            }}
          </Pressable>
          {recordingUri && (
            <Button mt={2} onPress={async () => await sendEvidence()}>
              Upload recording
            </Button>
          )}
        </VStack>
      </View>
    </>
  );
}
