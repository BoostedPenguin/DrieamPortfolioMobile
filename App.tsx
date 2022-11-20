import * as React from 'react';
import { View, Text } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyPortfolio from './components/MyPortfolio';
import { NativeBaseProvider } from 'native-base';
import Evidence from './components/Evidence';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import AddEvidence from './components/AddEvidence';
import FileUploadEvidence from './components/FileUploadEvidence';
import ImageUploadEvidence from './components/ImageUploadEvidence';
import VideoUploadEvidence from './components/VideoUploadEvidence';
import VoiceUploadEvidence from './components/VoiceUploadEvidence';

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

const headerColors = {
  headerStyle: {
    backgroundColor: "#1890FF",
  },
  headerTintColor: "#fff"
}

function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="MyPortfolio">
      <Drawer.Screen
        name="My Portfolio"
        component={MyPortfolio}
        options={{
          drawerLabel: 'My portfolio', ...headerColors
        }}
      />
      <Drawer.Screen
        name="Evidence"
        component={Evidence}
        options={{ drawerLabel: 'Evidence', ...headerColors }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: 'Profile', ...headerColors }}
      />
    </Drawer.Navigator>
  );
}
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red'
  },
};
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>

        <Stack.Navigator >
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={MyDrawer}
          />
          <Stack.Screen name="AddEvidence" options={{ headerShown: false }} component={AddEvidence} />
          <Stack.Screen name="FileUploadEvidence" options={{ headerShown: false }} component={FileUploadEvidence} />
          <Stack.Screen name="ImageUploadEvidence" options={{ headerShown: false }} component={ImageUploadEvidence} />
          <Stack.Screen name="VideoUploadEvidence" options={{ headerShown: false }} component={VideoUploadEvidence} />
          <Stack.Screen name="VoiceUploadEvidence" options={{ headerShown: false }} component={VoiceUploadEvidence} />
        </Stack.Navigator>

      </NavigationContainer>
    </NativeBaseProvider>
  )
}