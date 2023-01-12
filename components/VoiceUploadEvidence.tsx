import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import {
  Button,
  HStack,
  IconButton,
  Input,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { useElapsedTime } from "use-elapsed-time";
import { configFiles } from "../sdk";
import { NavigationProps } from "../types/NavigationProps";

export default function VoiceUploadEvidence({ navigation }: NavigationProps) {
  const [playing, setPlaying] = useState(false);

  const [evidenceName, setEvidenceName] = useState("");

  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );

  const [recordingUri, setRecordingUri] = useState<string | null>();

  const { elapsedTime } = useElapsedTime({ isPlaying: playing });

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

  const onRecordButtonClick = async () => {
    if (recording) {
      setPlaying(false);

      await stopRecordingAudio();
    } else {
      setPlaying(true);

      await startRecordingAudio();
    }
  };

  const saveTranscription = async () => {
    try {
      const formData = new FormData();

      formData.append("data_file", {
        //@ts-ignore
        uri: recordingUri,
        name: evidenceName + ".m4a",
        type: "audio",
      });

      formData.append(
        "config",
        JSON.stringify({
          type: "transcription",
          transcription_config: {
            language: "en",
          },
        })
      );

      const responseUpload = await fetch(
        "https://asr.api.speechmatics.com/v2/jobs/",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer OOFj76JSRhyomKGxCejXwomyY97xeECM`,
          },
        }
      );

      const data = await responseUpload.json();

      return data.id;
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const sendEvidence = async () => {
    const transcriptionId = await saveTranscription();

    let formData = new FormData();

    formData.append("files[]", {
      //@ts-ignore
      uri: recordingUri,
      name: evidenceName + ".m4a",
      type: "audio",
    });
    formData.append("evidence_type", "file");
    formData.append("name", `Voice - ${evidenceName}`);
    formData.append("description", transcriptionId);

    await fetch(
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

    navigation.replace("Home");
  };

  const getPlaceholderText = () => {
    if ((recordingUri !== undefined && recordingUri !== null) || playing) {
      const minutes = Math.floor(elapsedTime / 60);

      const seconds = Math.floor(elapsedTime % 60);

      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    return "Record your evidence...";
  };

  const canUploadEvidence =
    evidenceName !== "" && recordingUri !== undefined && recordingUri !== null;

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
            <Text mb={1}>Recording</Text>
            <Text color="#a1a1aa" fontSize={16}>
              {getPlaceholderText()}
            </Text>
          </VStack>
          <HStack>
            <IconButton
              icon={
                <MaterialIcons
                  name={playing ? "stop" : "keyboard-voice"}
                  size={28}
                />
              }
              onPress={async () => await onRecordButtonClick()}
            />
          </HStack>
        </HStack>

        <View px={15} py={5}>
          <Button
            onPress={async () => await sendEvidence()}
            disabled={!canUploadEvidence}
            backgroundColor={!canUploadEvidence ? "#d1d5db" : "#1890FF"}
          >
            Add evidence
          </Button>
        </View>
      </VStack>
    </View>
  );
}

interface CustomInputProps {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}

export function CustomInput(props: CustomInputProps) {
  return (
    <View borderBottomWidth={1} borderColor="#e5e7eb" py={15} px={15}>
      <Text>{props.label}</Text>
      <Input
        size="lg"
        variant="unstyled"
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        borderWidth={0}
        px={0}
      />
    </View>
  );
}
