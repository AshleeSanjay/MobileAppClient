import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            paddingTop: insets.top,
          }}
        >
          <Image source={LoginSVG} width={400} height={200} />
        </View>
        <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
          <Text
            style={{
              //   fontFamily: "Roboto-Medium.ttf",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login Screen
          </Text>
          <InputField label={"Email ID"} keyboardType="email-address" />
          <InputField
            label={"Password"}
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
          />
          <CustomButton label={"Login"} onPress={() => {}} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ marginRight: 2 }}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
