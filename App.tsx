import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Box, Text } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './helpers'

const Stack = createNativeStackNavigator()

function ExampleComponent() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>
        Mobile portfolio bootstrapped
      </Text>
    </Box>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator >
          <Stack.Screen name="GameLobby" options={{ headerShown: false }} component={ExampleComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
