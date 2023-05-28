import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
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
import jwtDecode from "jwt-decode";
import DropDownField from "../components/Dropdown";

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  var url;
  const handleChange = (event) => {
    if (Platform.OS === "web") {
      console.log(event.target.value);
      setUserType(event.target.value);
    } else {
      console.log(event.value);
      setUserType(event.value);
    }
  };

  const loginButtonPress = async () => {
    try {
      if (email == null || !password == null) {
        Alert.alert("Warning", "Please enter user credentials", [
          {
            text: "OK",
            onPress: () => {
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
        console.log("User Details: ", userDetails);
        const { signInUserSession } = userDetails;
        const { idToken } = signInUserSession;
        const { accessToken } = signInUserSession;
        const { refreshToken } = signInUserSession;
        console.log(Platform.OS);

        if (userType == "teacher") {
          url = `${getBaseUrl()}/Teacher/profile`;
        } else if (userType == "student") {
          url = `${getBaseUrl()}/Student/profile`;
        }

        console.log("URL:", url);
        console.log("Decoded token: ", jwtDecode(idToken.jwtToken));

        await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken.jwtToken}`,
          },
        })
          .then((resp) => {
            navigation.navigate("Home", {
              userType: userType,
              email: email,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log("error signing in", error);
      Alert.alert("Warning", "Invalid credentials", [
        {
          text: "OK",
          onPress: () => {
            console.log("button pressed");
          },
        },
      ]);
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
          <Image source={LoginSVG} style={styles.image} />
        </View>
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
            fieldButtonFunction={() => {}}
            onChangeText={setPassword}
            value={password}
          />
          <View>
            <DropDownField value={userType} onChange={handleChange} />
          </View>
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
  image: {
    width: 400,
    height: 200,
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
