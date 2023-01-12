import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import { HStack, IconButton, Image, Text, View, VStack } from "native-base";
import { useEffect, useState } from "react";
import { configFiles } from "../sdk";
import { getPrettyName, getType } from "../sdk/evidence";
import { RootStackParamList } from "../types/NavigationProps";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "EvidencePreview",
  "MyStack"
>;

export default function PreviewEvidence({ route, navigation }: Props) {
  const [evidencePreview, setEvidencePreview] = useState();
  const [evidence, setEvidence] = useState<any>();

  useEffect(() => {
    getFileEvidence(route.params.evidenceId);
  }, []);

  async function getFileEvidence(evidenceId: number) {
    const latestFile = await fetch(
      `https://portfolio.drieam.app/api/v1/evidence/${evidenceId}`,
      {
        method: "GET",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${configFiles.bearerToken}`,
          "X-CSRF-Token": configFiles.XCSRF,
        },
      }
    ).catch(() => {});

    if (!latestFile) return;

    const latestFileJson = await latestFile.json();

    setEvidence(latestFileJson);

    const preview = await fetch(
      `https://portfolio.drieam.app/api/v1/evidence-version-files/${latestFileJson.latest_version.files[0].id}/preview-url`,
      {
        method: "GET",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${configFiles.bearerToken}`,
          "X-CSRF-Token": configFiles.XCSRF,
        },
      }
    ).catch(() => {});

    if (!preview) return;

    const previewRes = await preview.json();

    setEvidencePreview(previewRes.download_url);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <CustomPreviewInput
        label="Name"
        value={getPrettyName(evidence?.name ?? "—")}
      />

      <CustomPreviewInput
        label="Upload date"
        value={evidence?.created_at.split("T")[0] ?? "—"}
      />

      {evidencePreview && (
        <Preview type={getType(evidence?.name ?? "—")} link={evidencePreview} />
      )}
    </View>
  );
}

interface CustomPreviewInputProps {
  label: string;
  value: string;
}

export function CustomPreviewInput(props: CustomPreviewInputProps) {
  return (
    <VStack borderBottomWidth={1} borderColor="#e5e7eb" py={15} px={15}>
      <Text mb={1}>{props.label}</Text>
      <Text fontSize={16}>{props.value}</Text>
    </VStack>
  );
}

interface PreviewProps {
  type: string;
  link: string;
}

export function Preview(props: PreviewProps) {
  const sound = new Audio.Sound();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (props.type === "voice" && playing) {
      sound.loadAsync({ uri: props.link }).then(() => {
        sound.playAsync();
      });
    }
  }, [playing]);

  if (props.type === "picture") {
    return (
      <HStack borderBottomWidth={1} borderColor="#e5e7eb" py={15} px={15}>
        <VStack flexGrow={1}>
          <Text mb={1}>Picture</Text>
          <Image
            style={{ maxHeight: 500 }}
            source={{
              uri: props.link,
            }}
            alt="Picture"
            resizeMode="contain"
            size="full"
          />
        </VStack>
      </HStack>
    );
  }

  if (props.type === "voice") {
    return (
      <HStack borderBottomWidth={1} borderColor="#e5e7eb" py={15} px={15}>
        <VStack flexGrow={1}>
          <Text mb={1}>Recording</Text>
          <Text color="#a1a1aa" fontSize={16}>
            00:35
          </Text>
        </VStack>
        <HStack>
          <IconButton
            icon={<MaterialIcons name="play-arrow" size={28} />}
            onPress={() => setPlaying(!playing)}
          />
        </HStack>
      </HStack>
    );
  }

  return <></>;
}
