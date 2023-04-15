import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Verification from "../screens/Verification";
import Home from "../screens/Home";
import TeacherProfile from "../screens/TeacherProfile";

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
      {/* {<Stack.Screen name="Login" component={Login} />}
      {<Stack.Screen name="Register" component={Register} />}
      {<Stack.Screen name="Verification" component={Verification} />} */}
      {<Stack.Screen name="Home" component={Home} />}
      {<Stack.Screen name="TeacherProfile" component={TeacherProfile} />}
    </Stack.Navigator>
  );
};

export default AuthStack;
