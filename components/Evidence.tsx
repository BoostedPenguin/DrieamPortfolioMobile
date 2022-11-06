import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native';
import { IconButton, Image, Text, View, HStack, Button, Icon, Box, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

export default function Evidence() {
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

                    }}
                    leftIcon={<Icon color="#1890ff" as={MaterialIcons} name="add" size="sm" />}
                >Add evidence</Button>

                {/* Evidence */}
                <Box mt={5}>
                    <HStack justifyContent={"space-between"}>
                        <AntDesign style={{
                            marginRight: 10,
                            alignSelf: "center",
                        }} name="file1" size={24} color="#79d24d" />
                        <VStack mr={3}>
                            <Text color={"#1890ff"}>
                                Evidence Document
                            </Text>
                            <Text color={"#000000a6"}>
                                Upload date:
                            </Text>
                            <Text color={"#000000a6"}>
                                12/10/2022
                            </Text>
                        </VStack>
                        <VStack>
                            <Button
                                size="sm"
                                borderColor="#1890ff"
                                variant="outline"
                                onPress={() => {

                                }}
                                leftIcon={<Icon color="#1890ff" as={MaterialIcons} name="add" size="sm" />}
                            >
                                Collection
                            </Button>
                            <Box textAlign={"center"} borderWidth={1} borderColor={"#fff"}>
                                <HStack alignItems={"center"} p={1}>
                                    <Box width={2} borderRadius={50} height={2} backgroundColor={"orange.500"} />
                                    <Text>My Collection</Text>
                                </HStack>
                            </Box>
                        </VStack>
                        <IconButton
                            onPress={() => {

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
                </Box>

                                {/* Evidence */}
                                <Box mt={5}>
                    <HStack justifyContent={"space-between"}>
                        <AntDesign style={{
                            marginRight: 10,
                            alignSelf: "center",
                        }} name="file1" size={24} color="#79d24d" />
                        <VStack mr={3}>
                            <Text color={"#1890ff"}>
                                Evidence Document
                            </Text>
                            <Text color={"#000000a6"}>
                                Upload date:
                            </Text>
                            <Text color={"#000000a6"}>
                                12/10/2022
                            </Text>
                        </VStack>
                        <VStack>
                            <Button
                                size="sm"
                                borderColor="#1890ff"
                                variant="outline"
                                onPress={() => {

                                }}
                                leftIcon={<Icon color="#1890ff" as={MaterialIcons} name="add" size="sm" />}
                            >
                                Collection
                            </Button>
                            <Box textAlign={"center"} borderWidth={1} borderColor={"#fff"}>
                                <HStack alignItems={"center"} p={1}>
                                    <Box width={2} borderRadius={50} height={2} backgroundColor={"orange.500"} />
                                    <Text>My Collection</Text>
                                </HStack>
                            </Box>
                        </VStack>
                        <IconButton
                            onPress={() => {

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
                </Box>

                                {/* Evidence */}
                                <Box mt={5}>
                    <HStack justifyContent={"space-between"}>
                        <AntDesign style={{
                            marginRight: 10,
                            alignSelf: "center",
                        }} name="file1" size={24} color="#79d24d" />
                        <VStack mr={3}>
                            <Text color={"#1890ff"}>
                                Evidence Document
                            </Text>
                            <Text color={"#000000a6"}>
                                Upload date:
                            </Text>
                            <Text color={"#000000a6"}>
                                12/10/2022
                            </Text>
                        </VStack>
                        <VStack>
                            <Button
                                size="sm"
                                borderColor="#1890ff"
                                variant="outline"
                                onPress={() => {

                                }}
                                leftIcon={<Icon color="#1890ff" as={MaterialIcons} name="add" size="sm" />}
                            >
                                Collection
                            </Button>
                            <Box textAlign={"center"} borderWidth={1} borderColor={"#fff"}>
                                <HStack alignItems={"center"} p={1}>
                                    <Box width={2} borderRadius={50} height={2} backgroundColor={"orange.500"} />
                                    <Text>My Collection</Text>
                                </HStack>
                            </Box>
                        </VStack>
                        <IconButton
                            onPress={() => {

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
                </Box>
            </View>
        </>
    )
}