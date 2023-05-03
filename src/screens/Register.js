import React, { useState } from "react";
import { Auth, SignUpParams } from "aws-amplify";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.png";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { getBaseUrl } from "../utils";
import DropDownField from "../components/Dropdown";

const Register = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errText, setErrText] = useState(null);
  const [userType, setUserType] = useState("");

  const handleChange = (event) => {
    if (Platform.OS === "web") {
      console.log(event.target.value);
      setUserType(event.target.value);
    } else {
      console.log(event.value);
      setUserType(event.value);
    }
  };
  const handleButtonPress = async () => {
    const userSub = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email, // optional
        "custom:role": userType, // optional - E.164 number convention
        // other custom attributes
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    })
      .then((data) => {
        var id = data.userSub;
        console.log("userSub:", id);
        navigation.navigate("Verification", {
          name: name,
          email: email,
          mobile: mobile,
          userType: userType,
          cognitoId: id,
        });
        setEmail("");
        setName("");
        setMobile("");
        setPassword("");
        return data.userSub;
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            paddingTop: insets.top,
          }}
        >
          <Image source={LoginSVG} width={400} height={200} />
        </View>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <View style={{ alignItems: "center" }}>
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
            </View>
            <InputField
              label={"Full Name"}
              onChangeText={setName}
              value={name}
            />
            <InputField
              label={"Email ID"}
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <InputField
              label={"Mobile"}
              keyboardType="phone-pad"
              onChangeText={setMobile}
              value={mobile}
            />
            <InputField
              label={"Password"}
              inputType="password"
              fieldButtonFunction={() => {}}
              onChangeText={setPassword}
              value={password}
            />
            <View>
              <DropDownField value={userType} onChange={handleChange} />
            </View>
            <View style={{ flex: 2, alignItems: "center", padding: 30 }}>
              <CustomButton label={"Register"} onPress={handleButtonPress} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ marginRight: 2 }}>Back to</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#30CC94", fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
