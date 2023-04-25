import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.png";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
import Verification from "./Verification";
import { Auth } from "aws-amplify";
import { getBaseUrl } from "../utils";
import { Dropdown } from "react-native-element-dropdown";
import jwtDecode from "jwt-decode";

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = [
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ];
  const [userType, setUserType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  var url;

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

  const loginButtonPress = async () => {
    try {
      if (email == null || !password == null) {
        Alert.alert("Warning", "Please enter user credentials", [
          {
            text: "OK",
            onPress: () => {
              // navigation.navigate("Home", {
              //   userType: userType,
              //   email: email,
              //   // cognitoId: id,
              // });
              console.log("button pressed");
            },
          },
        ]);
      } else {
        setEmail("");
        setPassword("");
        setUserType("");
        console.log("Login");
        const userDetails = await Auth.signIn(email, password);
        // console.log("User Details: ", userDetails);
        const { signInUserSession } = userDetails;
        const { idToken } = signInUserSession;
        const { accessToken } = signInUserSession;
        const { refreshToken } = signInUserSession;
        // console.log(idToken);
        if (userType == "teacher") {
          url = `${getBaseUrl()}/Teacher/profile`;
        } else if (userType == "student") {
          url = `${getBaseUrl()}/Student/profile`;
        }
        console.log("URL:", url);
        // const idTokenDecoded = jwtDecode(idToken.jwtToken);
        console.log("Decoded token: ", jwtDecode(idToken.jwtToken));
        await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken.jwtToken}`,
          },
        })
          // .then((resp) => resp.json())
          .then((resp) => {
            navigation.navigate("Home", {
              userType: userType,
              email: email,
              // cognitoId: id,
            });
            // console.log("Response Body: ", resp);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log("error signing in", error);
    }
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
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View style={{ alignItems: "center" }}>
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
          </View>
          <InputField
            label={"Email ID"}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
          <InputField
            label={"Password"}
            inputType="password"
            // fieldButtonLabel={"Forgot?"}
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
            <CustomButton label={"Login"} onPress={loginButtonPress} />
          </View>
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
            <Text style={{ color: "#30CC94", fontWeight: "700" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
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
