import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import Home from "./screen/Home";
import Editor from "./screen/Editor";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Snow: require("./assets/Fonts/SF_HambakSnow.otf"),
    Mapo: require("./assets/Fonts/MapoGoldenPier.otf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Editor" component={Editor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
