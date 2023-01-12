import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import * as React from "react";
import { LogBox } from "react-native";
import Evidence from "./components/Evidence";
import FileUploadEvidence from "./components/FileUploadEvidence";
import ImageUploadEvidence from "./components/ImageUploadEvidence";
import MyPortfolio from "./components/MyPortfolio";
import PreviewEvidence from "./components/PreviewEvidence";
import VideoUploadEvidence from "./components/VideoUploadEvidence";
import VoiceUploadEvidence from "./components/VoiceUploadEvidence";
import { RootStackParamList } from "./types/NavigationProps";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerColors = {
  headerStyle: {
    backgroundColor: "#1890FF",
  },
  headerTintColor: "#fff",
};

function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="My evidence">
      <Drawer.Screen
        name="My Portfolio"
        component={MyPortfolio}
        options={{
          drawerLabel: "My portfolio",
          ...headerColors,
        }}
      />
      <Drawer.Screen
        name="My evidence"
        component={Evidence}
        options={{ drawerLabel: "My evidence", ...headerColors }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={MyDrawer}
          />
          <Stack.Screen
            name="FileUploadEvidence"
            options={{ ...headerColors, title: "Add file evidence" }}
            component={FileUploadEvidence}
          />
          <Stack.Screen
            name="ImageUploadEvidence"
            options={{ ...headerColors, title: "Add picture evidence" }}
            component={ImageUploadEvidence}
          />
          <Stack.Screen
            name="VideoUploadEvidence"
            options={{ ...headerColors, title: "Add video evidence" }}
            component={VideoUploadEvidence}
          />
          <Stack.Screen
            name="VoiceUploadEvidence"
            options={{ ...headerColors, title: "Add voice evidence" }}
            component={VoiceUploadEvidence}
          />
          <Stack.Screen
            name="EvidencePreview"
            options={{ ...headerColors, title: "Preview evidence" }}
            component={PreviewEvidence}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
