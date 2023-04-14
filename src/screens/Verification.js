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
import { getBaseUrl } from "../utils";

import { Auth } from "aws-amplify";

const Verification = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [password, setPassword] = useState("");
  // const [userType, setUserType] = useState(null);
  const [cognitoId, setcognitoId] = useState("");

  const confirmSignUp = async function (
    name,
    email,
    mobile,
    userType,
    cognitoId
  ) {
    console.log("Cognito Id: ", cognitoId);
    verifyButtonPress(name, email, mobile, userType, cognitoId);
    const result = await Auth.confirmSignUp(email, code);
  };
  const verifyButtonPress = async function (
    name,
    email,
    mobile,
    userType,
    cognitoId
  ) {
    console.log("Verify Button", name, email, mobile, userType, cognitoId);
    await fetch(`${getBaseUrl()}/Teacher/enroll`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: name,
        cognitoId: cognitoId,
        email: email,
        mobile: mobile,
        // password: password,
        userType: userType,
      }),
    })
      .then(() => {
        Alert.alert("Verification", "Successfully Verified!!!", [
          {
            text: "OK",
            onPress: () => {
              console.log("button pressed");
            },
          },
        ]);
      })
      .catch((err) => {
        Alert.alert("Warning", `${err}`, [
          {
            text: "OK",
            onPress: () => {
              console.log("button pressed");
            },
          },
        ]);
      });
  };
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
          keyboardType="number-pad"
          onChangeText={setCode}
        />
        <CustomButton
          label={"Verify"}
          onPress={async () => {
            console.log("Verify: cognito id- ", route.params.cognitoId);
            await confirmSignUp(
              route.params.name,
              route.params.email,
              route.params.mobile,
              route.params.userType,
              route.params.cognitoId
            );
          }}
        />
        <CustomButton
          label={"Back"}
          onPress={async () => navigation.navigate("Register")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Verification;
