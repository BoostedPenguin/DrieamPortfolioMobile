import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native';
import { IconButton, Image, Text, View, HStack, Button, Icon, Box, VStack, Pressable, Input } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Entypo } from '@expo/vector-icons';
import { NavigationProps } from '../types/NavigationProps';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons';

export default function VoiceUploadEvidence({ navigation }: NavigationProps) {
    const [file, setFile] = useState<DocumentPicker.DocumentResult>()

    async function GetDocument() {
        const document = await DocumentPicker.getDocumentAsync()
        if (document.type == "cancel")
            return

        setFile(document)
    }

    // useEffect(() => {
    //     console.log(file)
    // }, [file])

    return (
        <>
            <View style={{ flex: 1, marginTop: 50, marginHorizontal: 25 }}>
                <HStack>
                    <IconButton
                        mr={4}
                        onPress={() => {
                            navigation.goBack()
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
                            color: "#000"
                        }}
                    />

                    <VStack>
                        <Text fontSize={"lg"}>Add voice upload evidence</Text>
                    </VStack>
                </HStack>

                <VStack mt={5}>
                    <Text>Name</Text>
                    <Input placeholder='Name your evidence...'></Input>

                    <Pressable onPress={GetDocument}>
                        {({ isHovered, isFocused, isPressed }) => {
                            return (
                                <Box my={4} alignItems={"center"} justifyContent={"center"} borderColor="red.500" borderWidth={1} height={70} p={3} bg={isPressed ? "#DADADA" : "#F2F2F2"} style={{
                                    elevation: 1
                                }}>
                                    <FontAwesome name="microphone" size={24} color="black" />
                                    <Text>Click here to capture audio</Text>
                                </Box>
                            )
                        }}
                    </Pressable>
                    {file && file.type == "success" &&
                        <Box borderWidth={1} p={2} borderColor="#797979">
                            <HStack>
                                <MaterialIcons name="attach-file" size={24} color="black" />
                                <Text>{file.name}</Text>
                            </HStack>
                        </Box>
                    }
                    <Button mt={2}>Add</Button>
                </VStack>
            </View>
        </>
    )
}