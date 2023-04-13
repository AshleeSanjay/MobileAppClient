import react, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Auth } from 'aws-amplify';


const Verification = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState("");

  const confirmSignUp = async function (email){
    const result = await Auth.confirmSignUp(email, code);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          Verification Screen
        </Text>
        <InputField
          label={"Verification Code"}
          keyboardType="verification-code"
          onChangeText={setCode}
        />
        <CustomButton label={"Verify"} onPress={async () => {
          await confirmSignUp(route.params.email);
        }} />
      </View>
    </SafeAreaView>
  );
};

export default Verification;
