import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "../components/InputField";
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
          <InputField
            label={"First Name"}
            onChangeText={setText}
            value={text}
          />

          <CustomButton
            label={"Register"}
            onPress={() =>
              Alert.alert("Alert me", `text is ${text}`, [
                { text: "OK", onPress: () => {} },
              ])
            }
          />
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
