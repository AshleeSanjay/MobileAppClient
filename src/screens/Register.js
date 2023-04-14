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
} from "react-native";
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
import { Dropdown } from "react-native-element-dropdown";

const Register = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errText, setErrText] = useState(null);
  const data = [
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ];
  const [userType, setUserType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
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
        navigation.navigate("Verification", { email: email });
        return data.userSub;
      })
      .catch((err) => {
        Alert.alert("Alert me", `${err}`, [
          {
            text: "OK",
            onPress: () => {
              console.log("button pressed");
            },
          },
        ]);
      });
    console.log("Starting Enroll", `${getBaseUrl()}/Teacher/enroll`);
    // await fetch(`${getBaseUrl()}/Teacher/enroll`, {
    //   headers: { "content-type": "application/json" },
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: name,
    //     cognitoId: userSub,
    //     email: email,
    //     mobile: mobile,
    //     password: password,
    //     userType: userType,
    //   }),
    // })
    //   .then(() => {
    //     console.log("DB Connected");
    //   })
    //   .catch((err) => {
    //     setErrText(err?.message ?? "Something went wrong");
    //   });
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
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={userType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setUserType(item.value);
                setIsFocus(false);
              }}
            />
            <View style={{ flex: 2, alignItems: "center", padding: 30 }}>
              <CustomButton
                label={"Register"}
                onPress={handleButtonPress}
                // onPress={() =>
                //   Alert.alert("Alert me", `dropdown value is ${category}`, [
                //     { text: "OK", onPress: () => {} },
                //   ])
                // }
              />
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
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Login</Text>
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
  placeholderStyle: {
    fontSize: 14,
    color: "#5A5A5A",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#5A5A5A",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
