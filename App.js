import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WalkthroughScreen from "./src/walkthroughscreen";
import Camera from "./src/Camera";
import PatientDetailForm from "./src/PatientDetailForm";
import Gallery from "./src/Gallery";
import Save from "./src/Save";
import ResultScreen from "./src/ResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={WalkthroughScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientDetail"
          component={PatientDetailForm}
          options={{ title: "Enter Patient Detail" }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Save"
          component={Save}
          options={{ headerShown: true, title: "Diagnosis" }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: true, title: "Diagnosis" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
