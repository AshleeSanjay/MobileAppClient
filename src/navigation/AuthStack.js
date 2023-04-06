import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="Demo"
        component={() => (
          <View style={{ paddingTop: 40, paddingHorizontal: 15 }}>
            <Text>Demo</Text>
          </View>
        )}
      /> */}
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
