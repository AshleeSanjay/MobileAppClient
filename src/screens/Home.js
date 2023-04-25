import react, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.png";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";
import { getBaseUrl } from "../utils";
import { Auth } from "aws-amplify";
import Login from "./Login.js";

const Home = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState([]);
  const profileEmail = route.params?.jsonData?.email;
  const params = route.params?.email;
  var url = "";
  var userRole = "";

  console.log("Profile Page: ", profileEmail);
  const logoutButtonPress = async function () {
    try {
      console.log("Log out");
      await Auth.signOut({ global: true });
      navigation.navigate("Login");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const lnkProfile = async function (name) {
    showProfile();
  };
  const showProfile = async function () {
    if (route.params?.userType != null || route.params?.userType != undefined) {
      console.log("User Role: ", route.params?.userType);
      userRole = route.params?.userType;
    } else if (
      route.params?.jsonData?.userType != null ||
      route.params?.jsonData?.userType != undefined
    ) {
      console.log("User Role: ", route.params?.jsonData?.userType);
      userRole = route.params?.jsonData?.userType;
    }
    url = "";
    if (userRole == "teacher") {
      if (params != null || params != undefined) {
        console.log("TeacherRole: ", params);
        url = `${getBaseUrl()}/Teacher/profile?email=${params}`;
      } else {
        url = `${getBaseUrl()}/Teacher/profile?email=${profileEmail}`;
      }
    } else if (userRole == "student") {
      if (params != null || params != undefined) {
        console.log("Student Role: ", params);
        url = `${getBaseUrl()}/Student/profile?email=${params}`;
      } else {
        url = `${getBaseUrl()}/Student/profile?email=${profileEmail}`;
      }
    }

    console.log("URL: ", url);

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        if (userRole == "teacher") {
          console.log("Teacher Profile");
          navigation.navigate("TeacherProfile", { data: json });
        } else if (userRole == "student") {
          console.log("Student Profile", userRole);
          navigation.navigate("StudentProfile", { data: json });
        }
      })
      .catch((err) => {
        console.log("Home.js err", err);
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
      <NativeBaseProvider>
        <View style={{ paddingLeft: 350, paddingTop: 10 }}>
          <TouchableOpacity onPress={logoutButtonPress}>
            <Text style={{ color: "#30CC94", fontWeight: "700" }}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: insets.top,
          }}
        >
          <Image source={LoginSVG} width={400} height={200} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              paddingTop: 50,
            }}
          >
            Home
          </Text>
        </View>
        <View style={{ flex: 1, gap: 10, alignItems: "flex-start" }}>
          <Button
            variant="link"
            onPress={async () => {
              await lnkProfile();
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Profile</Text>
          </Button>
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate("TeacherProfile");
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Courses</Text>
          </Button>
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate("TeacherProfile");
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Assignments</Text>
          </Button>
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};
export default Home;
