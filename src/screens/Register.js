import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";

// const handleButtonPress = () => {
//   fetch("URL GOES HERE", {
//     method: "POST",
//     body: JSON.stringify({ name: "Ashlee" }),
//   }).catch((err) => {
//     setErrText(err?.message ?? "Something went wrong");
//   });
// };
const Register = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [fname, setFName] = useState("");
  const [text, setText] = useState("");

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
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Registeration Screen
          </Text>
          {/* <Text>FName: {text}</Text> */}
          <InputField
            label={"First Name"}
            // onChangeText={(text) => setText(text)}
            // value={text}
          />
          <InputField label={"Last Name"} />
          <InputField label={"Email ID"} keyboardType="email-address" />

          <TextInput
            placeholder="Enter Name"
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <InputField
            label={"Password"}
            inputType="password"
            fieldButtonFunction={() => {}}
          />
          <CustomButton label={"Register"} onPress={() => alert(text)} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ marginRight: 2 }}>Back to</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Register;
