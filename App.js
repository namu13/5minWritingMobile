import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Realm from "realm";
import AppLoading from "expo-app-loading";
import Home from "./screen/Home";
import Editor from "./screen/Editor";
import { useState } from "react";
import { useEffect } from "react";
import { DBContext } from "./context";
import Viewer from "./screen/Viewer";

const Stack = createNativeStackNavigator();

export default function App() {
  const [databaseLoaded, setDatabaseLoaded] = useState(false);
  const [realm, setRealm] = useState(null);

  const DocumentSchema = {
    name: "Document",
    properties: {
      _id: "int",
      title: "string",
      mainText: "string",
      timeStamp: "string",
    },
    primaryKey: "_id",
  };

  const realmOpen = async () => {
    const connection = await Realm.open({
      path: "fiveMinWritingDB",
      schema: [DocumentSchema],
    });
    setRealm(connection);
    setDatabaseLoaded(true);
  };

  useEffect(() => {
    realmOpen();
  }, []);

  const [fontLoaded] = useFonts({
    Snow: require("./assets/Fonts/SF_HambakSnow.otf"),
    Mapo: require("./assets/Fonts/MapoGoldenPier.otf"),
  });

  if (!fontLoaded || !databaseLoaded) {
    return <AppLoading />;
  }

  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Editor" component={Editor} />
          <Stack.Screen name="Viewer" component={Viewer} />
        </Stack.Navigator>
      </NavigationContainer>
    </DBContext.Provider>
  );
}
