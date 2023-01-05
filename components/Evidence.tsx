import React, { useState, useEffect } from 'react'
import { Platform, Pressable, ToastAndroid } from 'react-native';
import { IconButton, Image, Text, View, HStack, Button, Icon, Box, VStack, ScrollView, Modal } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { configFiles, createClient } from '../sdk';
import { z } from 'zod';
import { EvidenceSchema } from '../sdk/evidence';
import { useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../types/NavigationProps';

type Props = NativeStackScreenProps<RootStackParamList>;
export default function Evidence({ navigation }: Props) {
    const client = createClient();

    const [evidences, setEvidences] = useState<z.infer<typeof EvidenceSchema>[]>([]);
    const [deleteItemId, setDeleteItemId] = useState<number>()
    const isFocused = useIsFocused()

    useEffect(() => {
        client.evidence.getAll().then((evidences) => {
            setEvidences(evidences);
        });
    }, [isFocused, deleteItemId])



    const deleteEvidence = async (evidenceId: number) => {
        const res = await fetch(`https://portfolio.drieam.app/api/v1/evidence/${evidenceId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${configFiles.bearerToken}`,
                'X-CSRF-Token': configFiles.XCSRF
            },
        }).catch(ex => console.log(ex))
        const evidences = await client.evidence.getAll()
        setEvidences(evidences);
    }


    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 50, marginHorizontal: 25 }}>
                <Text fontSize={"xl"}>My evidence</Text>
                <Button
                    size="lg"
                    width="full"
                    px={5}
                    borderColor="#1890ff"
                    borderStyle={"dashed"}
                    variant="outline"
                    onPress={() => {
                        navigation.navigate("AddEvidence")
                    }}
                    leftIcon={<Icon color="#1890ff" as={MaterialIcons} name="add" size="sm" />}
                >Add evidence</Button>
                <ScrollView w="100%">

                    {evidences.length == 0 &&
                        <Box>
                            <Text textAlign={"center"} mt={8} italic>
                                You don't have any evidence in your portfolio yet.
                            </Text>
                            <Text textAlign={"center"} italic>
                                Add some!
                            </Text>
                        </Box>
                    }

                    {evidences.map((evidence) => (<Box key={evidence.id} mt={5}>
                        <HStack justifyContent={"space-between"}>
                            <Pressable onPress={() => {
                                navigation.navigate("EvidencePreview", {
                                    evidenceId: evidence.id
                                })
                            }}>
                                <HStack justifyContent={"space-between"}>

                                    <AntDesign style={{
                                        marginRight: 10,
                                        alignSelf: "center",
                                    }} name="file1" size={24} color="#79d24d" />
                                    <VStack mr={3}>
                                        <Text color={"#1890ff"}>
                                            {evidence.name.length > 10 ? evidence.name.slice(0, 10) + "..." : evidence.name}
                                        </Text>
                                        <Text color={"#000000a6"}>
                                            Upload date:
                                        </Text>
                                        <Text color={"#000000a6"}>
                                            {evidence.created_at.split('T')[0]}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <VStack>
                                <Button
                                    size="sm"
                                    borderColor="#1890ff"
                                    variant="outline"
                                    onPress={() => {
                                        ToastAndroid.show('Not available during demo', ToastAndroid.SHORT);
                                    }}
                                    leftIcon={<Icon color="#1890ff" as={MaterialIcons} name="add" size="sm" />}
                                >
                                    Collection
                                </Button>
                                <Box textAlign={"center"} borderWidth={1} borderColor={"#fff"}>
                                    <HStack alignItems={"center"} p={1}>
                                        <Box width={2} borderRadius={50} height={2} backgroundColor={"orange.500"} />
                                        <Text>MyCollection</Text>
                                    </HStack>
                                </Box>
                            </VStack>
                            <IconButton
                                onPress={() => {
                                    setDeleteItemId(evidence.id)
                                    // deleteEvidence(evidence.id)
                                }}
                                style={{
                                    alignSelf: "center",
                                }}
                                size="sm"
                                ml={2}
                                borderColor="#000"
                                variant="outline"
                                _icon={{
                                    as: AntDesign,
                                    size: "sm",
                                    name: "delete",
                                    color: "#000"
                                }}
                            />
                        </HStack>
                    </Box>))}
                </ScrollView>
            </View>


            <Modal isOpen={deleteItemId ? true : false} onClose={() => setDeleteItemId(undefined)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Delete evidence</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Text>
                                Are you sure you wish to delete this evidence? This can not be undone.
                            </Text>
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setDeleteItemId(undefined);
                            }}>
                                Cancel
                            </Button>
                            <Button colorScheme={"error"} onPress={() => {
                                deleteItemId && deleteEvidence(deleteItemId)
                                setDeleteItemId(undefined);

                            }}>
                                Delete
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}