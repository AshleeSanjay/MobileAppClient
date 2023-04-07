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
import { getBaseUrl } from "../utils";

const Register = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errText, setErrText] = useState(null);
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: "1", value: "Teacher" },
    { key: "2", value: "Student" },
  ];

  // const handleButtonPress = () => {
  //   fetch(`${getBaseUrl()}/Teacher/enroll?email=${email}&name=${fname}`, {
  //     headers: { "content-type": "application/json" },
  //   }).catch((err) => {
  //     setErrText(err?.message ?? "Something went wrong");
  //   });
  // };
  const handleButtonPress = () => {
    fetch(`${getBaseUrl()}/Teacher/enroll`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
      }),
    }).catch((err) => {
      setErrText(err?.message ?? "Something went wrong");
    });
  };

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
            Registration Screen
          </Text>

          <InputField label={"Full Name"} onChangeText={setName} value={name} />
          <InputField
            label={"Email ID"}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
          <InputField
            label={"Mobile"}
            keyboardType="Mobile"
            onChangeText={setMobile}
            value={email}
          />
          {/* <Dropdown label="Select Item" data={data} onSelect={setSelected} /> */}
          <InputField
            label={"Password"}
            inputType="password"
            fieldButtonFunction={() => {}}
            onChangeText={setPassword}
            value={password}
          />
          <CustomButton
            label={"Register"}
            onPress={handleButtonPress}
            // Alert.alert("Alert me", `text is ${password}`, [
            //   { text: "OK", onPress: () => {} },
            // ])
            // }
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
