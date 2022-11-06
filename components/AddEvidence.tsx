import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native';
import { IconButton, Image, Text, View, HStack, Button, Icon, Box, VStack, Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Entypo } from '@expo/vector-icons';
import { NavigationProps } from '../types/NavigationProps';



export default function AddEvidence({ navigation }: NavigationProps) {
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

                        <Text fontSize={"lg"}>Add evidence</Text>
                        <Text mb={5}>
                            Select what type of evidence you want to add:
                        </Text>
                    </VStack>
                </HStack>


                {/* Canvas assignment */}
                <Pressable onPress={() => {
                }}>
                    {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <Box my={4} p={3} bg={isPressed ? "#DADADA" : "#F2F2F2"} style={{
                                elevation: 1
                            }}>
                                <HStack>
                                    <AntDesign style={{
                                        marginRight: 10,
                                        alignSelf: "center",
                                    }} name="form" size={24} color="#1890ff" />
                                    <VStack>
                                        <Text fontWeight={"bold"}>Canvas assignment</Text>
                                        <Text>Upload your assignment submission, including feedback, directly from a Canvas course</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        )
                    }}
                </Pressable>


                {/* File assignment */}
                <Pressable onPress={() => {
                    navigation.navigate("FileUploadEvidence")
                }}>
                    {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <Box my={4} p={3} bg={isPressed ? "#DADADA" : "#F2F2F2"} style={{
                                elevation: 1,
                            }}>
                                <HStack>
                                    <AntDesign style={{
                                        marginRight: 10,
                                        alignSelf: "center",
                                    }} name="file1" size={24} color="#79d24d" />
                                    <VStack>
                                        <Text fontWeight={"bold"}>File upload</Text>
                                        <Text>Upload files directly from your phone</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        )
                    }}
                </Pressable>


                {/* Add link assignment */}
                <Pressable onPress={() => {
                }}>
                    {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <Box my={4} p={3} bg={isPressed ? "#DADADA" : "#F2F2F2"} style={{
                                elevation: 1
                            }}>
                                <HStack>
                                    <AntDesign style={{
                                        marginRight: 10,
                                        alignSelf: "center",
                                    }} name="link" size={24} color="#faad14" />
                                    <VStack>
                                        <Text fontWeight={"bold"}>Add link</Text>
                                        <Text>Create a piece of evidence in your portfolio that refers to an external link</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        )
                    }}
                </Pressable>


                {/* Free text assignment */}
                <Pressable onPress={() => {
                }}>
                    {({ isHovered, isFocused, isPressed }) => {
                        return (
                            <Box my={4} p={3} bg={isPressed ? "#DADADA" : "#F2F2F2"} style={{
                                elevation: 1
                            }}>
                                <HStack>
                                    <Entypo style={{
                                        marginRight: 10,
                                        alignSelf: "center",
                                    }} name="leaf" size={24} color="#eb2f60" />
                                    <VStack>
                                        <Text fontWeight={"bold"}>Free text</Text>
                                        <Text>Create a piece of evidence with the rich text editor</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        )
                    }}
                </Pressable>
            </View>
        </>
    )
}