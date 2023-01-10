import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Modal,
  ScrollView,
  Text,
  Toast,
  useDisclose,
  View,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Pressable, ToastAndroid } from "react-native";
import { z } from "zod";
import { configFiles, createClient } from "../sdk";
import { EvidenceSchema } from "../sdk/evidence";
import { RootStackParamList } from "../types/NavigationProps";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Evidence({ navigation }: Props) {
  const client = createClient();

  const [evidences, setEvidences] = useState<z.infer<typeof EvidenceSchema>[]>(
    []
  );

  const [deleteItemId, setDeleteItemId] = useState<number>();

  const isFocused = useIsFocused();

  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    client.evidence.getAll().then((evidences) => {
      setEvidences(evidences);
    });
  }, [isFocused, deleteItemId]);

  const deleteEvidence = async (evidenceId: number) => {
    await fetch(`https://portfolio.drieam.app/api/v1/evidence/${evidenceId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${configFiles.bearerToken}`,
        "X-CSRF-Token": configFiles.XCSRF,
      },
    }).catch(() => {});

    const evidences = await client.evidence.getAll();

    setEvidences(evidences);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 15,
          backgroundColor: "#fff",
        }}
      >
        <Button
          leftIcon={
            <Icon color="#1890ff" as={MaterialIcons} name="add" size="md" />
          }
          onPress={onOpen}
          size="lg"
          width="full"
          borderColor="#1890ff"
          borderStyle="dashed"
          variant="outline"
          mb={5}
        >
          <Text color="#1890ff">Add evidence</Text>
        </Button>

        <ScrollView>
          {evidences.length === 0 && (
            <Box>
              <Text textAlign="center" italic>
                You don't have any evidence in your portfolio yet.
              </Text>
              <Text textAlign="center" italic>
                Add some!
              </Text>
            </Box>
          )}

          {evidences.map((evidence) => (
            <Pressable
              key={evidence.id}
              style={{
                flexGrow: 1,
                marginBottom: 15,
              }}
              onPress={() =>
                navigation.navigate("EvidencePreview", {
                  evidenceId: evidence.id,
                })
              }
            >
              <HStack>
                <FileTypeIcon name={evidence.type} />

                <VStack flexGrow={1}>
                  <Text color="#1890ff">{evidence.prettyName}</Text>
                  <Text color="#000000a6">
                    {evidence.created_at.split("T")[0]}
                  </Text>
                </VStack>

                <IconButton
                  onPress={() => setDeleteItemId(evidence.id)}
                  _icon={{
                    as: AntDesign,
                    size: "sm",
                    name: "delete",
                    color: "#fff",
                  }}
                  backgroundColor="#1890ff"
                  rounded={999}
                  width={10}
                  height={10}
                />
              </HStack>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ActionSheetItem
            title="Picture"
            description="Upload pictures directly from your camera"
            onPress={() => {
              onClose();

              navigation.navigate("ImageUploadEvidence");
            }}
            icon="picture"
          />
          <ActionSheetItem
            title="Video"
            description="Upload videos directly from your camera"
            onPress={() => {
              onClose();

              navigation.navigate("VideoUploadEvidence");
            }}
            icon="video"
          />
          <ActionSheetItem
            title="Voice"
            description="Upload voice recordings directly from your phone"
            onPress={() => {
              onClose();

              navigation.navigate("VoiceUploadEvidence");
            }}
            icon="voice"
          />
          <ActionSheetItem
            title="File"
            description="Upload files directly from your phone"
            onPress={() => {
              onClose();

              Toast.show({
                title: "Not available during demo",
              });
            }}
            icon="file"
          />
          <ActionSheetItem
            title="Text"
            description="Upload text directly from your phone"
            onPress={() => {
              onClose();

              Toast.show({
                title: "Not available during demo",
              });
            }}
            icon="text"
          />
        </Actionsheet.Content>
      </Actionsheet>

      <Modal
        isOpen={deleteItemId ? true : false}
        onClose={() => setDeleteItemId(undefined)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Delete evidence</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>
                Are you sure you wish to delete this evidence? This can not be
                undone.
              </Text>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setDeleteItemId(undefined);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme={"error"}
                onPress={() => {
                  deleteItemId && deleteEvidence(deleteItemId);
                  setDeleteItemId(undefined);
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

interface ActionSheetItemProps {
  title: string;
  description: string;
  onPress: () => void;
  icon: "picture" | "video" | "voice" | "file" | "text";
}

function ActionSheetItem(props: ActionSheetItemProps) {
  return (
    <Actionsheet.Item
      borderWidth={1}
      borderColor="#f0f0f0"
      marginBottom={2}
      onPress={() => props.onPress()}
    >
      <HStack space={2}>
        <FileTypeIcon name={props.icon} />

        <VStack>
          <Text fontWeight="bold">{props.title}</Text>
          <Text color="#000000a6">{props.description}</Text>
        </VStack>
      </HStack>
    </Actionsheet.Item>
  );
}

interface FileTypeIconProps {
  name: string | undefined;
}

function FileTypeIcon({ name }: FileTypeIconProps) {
  if (name === "picture") {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff2e8",
          borderRadius: 999,
          marginRight: 10,
          width: 40,
          height: 40,
        }}
      >
        <AntDesign name="camera" size={20} color="#fa541c" />
      </View>
    );
  }

  if (name === "video") {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f0ff",
          borderRadius: 999,
          marginRight: 10,
          width: 40,
          height: 40,
        }}
      >
        <Entypo name="video-camera" size={20} color="#722ed1" />
      </View>
    );
  }

  if (name === "voice") {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e6f4ff",
          borderRadius: 999,
          marginRight: 10,
          width: 40,
          height: 40,
        }}
      >
        <MaterialIcons name="keyboard-voice" size={20} color="#1677ff" />
      </View>
    );
  }

  if (name === "text") {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff0f6",
          borderRadius: 999,
          marginRight: 10,
          width: 40,
          height: 40,
        }}
      >
        <Entypo name="leaf" size={20} color="#eb2f96" />
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f6ffed",
        borderRadius: 999,
        marginRight: 10,
        width: 40,
        height: 40,
      }}
    >
      <AntDesign name="file1" size={20} color="#52c41a" />
    </View>
  );
}
