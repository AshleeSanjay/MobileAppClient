import react, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <View
          style={{
            alignItems: "center",
            paddingTop: insets.top,
          }}
        >
          <Image source={LoginSVG} width={400} height={200} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Home
          </Text>
        </View>
        <View style={{ flex: 1, gap: 10, alignItems: "flex-start" }}>
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate("TeacherProfile");
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Profile</Text>
          </Button>
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate("TeacherProfile");
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Courses</Text>
          </Button>
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate("TeacherProfile");
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Assignments</Text>
          </Button>
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};
export default Home;
