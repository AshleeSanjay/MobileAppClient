import react, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton.js";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.png";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";
import { getBaseUrl } from "../utils.js";
import { Auth } from "aws-amplify";
import Login from "./Login.js";

const TeacherHome = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState([]);
  const profileEmail = route.params?.jsonData?.email;
  const params = route.params?.email;

  var url = "";
  var userRole = "";

  console.log("Profile Page: ", profileEmail + "ID: ", route.params?.teacherId);
  var id = "";
  if (
    route.params?.page == "TeacherCourse" ||
    route.params?.page == "AddAssignment"
  ) {
    id = route.params?.teacherId;
  } else {
    id = route.params?.cognitoID;
  }
  const logoutButtonPress = async function () {
    try {
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
      userRole = route.params?.userType;
    } else if (
      route.params?.jsonData?.userType != null ||
      route.params?.jsonData?.userType != undefined
    ) {
      userRole = route.params?.jsonData?.userType;
    }
    url = "";

    if (route.params?.page == "Login") {
      url = `${getBaseUrl()}/Teacher/profile?email=${route.params?.email}`;
    } else {
      console.log(
        "Teacher course list details: ",
        route.params?.teacherDetails?.email
      );
      url = `${getBaseUrl()}/Teacher/profile?email=${
        route.params?.teacherDetails?.email
      }`;
    }
    // url = `${getBaseUrl()}/Teacher/profile?email=${route.params?.email}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log("Data: ", data);
        navigation.navigate("TeacherProfile", { data: json });
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
        <View style={styles.logOutText}>
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
          <Image source={LoginSVG} style={styles.image} />
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
              navigation.navigate("TeacherCourseList", {
                id: route.params?.teacherId,
                teacherDetails: data,
              });
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Courses</Text>
          </Button>
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate("AddAssignment", {
                id: route.params?.teacherId,
                teacherDetails: route.params?.teacherDetails,
              });
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>
              Add Assignments
            </Text>
          </Button>
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate("ViewTeacherAssignments", {
                id: route.params?.teacherId,
                teacherDetails: data,
              });
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>
              View Assignments
            </Text>
          </Button>
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};
export default TeacherHome;

const styles = StyleSheet.create({
  logOutText: {
    paddingLeft: 300,
    paddingTop: 10,
  },
  image: {
    width: 400,
    height: 200,
  },
});
