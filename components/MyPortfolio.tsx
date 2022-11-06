import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native';
import { IconButton, Image, Text, View, HStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

export default function MyPortfolio() {
    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                <Text fontSize={"xl"}>My portfolio</Text>
                <Image
                    source={require("../assets/unknownAvatar.png")}
                    alt="alt"
                    resizeMode="contain"
                />
                <Text>Todorov, Aleksandar A.G.</Text>
                <HStack mt={3} alignItems={"center"}>
                    <Text fontSize={"lg"}>Shared with:</Text>
                    <IconButton
                        onPress={() => {

                        }}
                        size="sm"
                        ml={2}
                        variant="outline"
                        _icon={{
                            as: MaterialIcons,
                            size: "sm",
                            name: "add",
                        }}
                    />
                </HStack>
                <HStack >
                    <Image
                        source={require("../assets/unknownAvatar.png")}
                        alt="alt"
                        size={"50"}
                        resizeMode="contain"
                    />
                    <Image
                        source={require("../assets/unknownAvatar.png")}
                        alt="alt"
                        size={"50"}
                        resizeMode="contain"
                    />
                    <Image
                        source={require("../assets/unknownAvatar.png")}
                        alt="alt"
                        size={"50"}
                        resizeMode="contain"
                    />
                </HStack>

            </View>
        </>
    )
}