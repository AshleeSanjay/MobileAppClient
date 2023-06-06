import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton.js";
import { Image } from "expo-image";
const ProfileBak = require("../assets/images/misc/profilebak.png");
import LoginSVG from "../assets/images/misc/studentImg.jpg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";
import { getBaseUrl } from "../utils.js";

const ViewCourse = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [courses, setCourses] = useState([]);
  console.log(
    "CourseId: ",
    route.params?.courseId + ", CourseName: ",
    route.params?.courseName + ", CourseContent: ",
    route.params?.courseContent + ", StudentID: ",
    route.params?.studentId
  );
  const enrollCourse = async () => {
    try {
      const studentId = route.params?.studentId;
      const courseId = route.params?.courseId;
      const url = `${getBaseUrl()}/Course/updateCourse?courseId=${courseId}`;
      await fetch(url, {
        headers: { "content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
          cognitoSid: studentId,
          email: route.params?.email,
          studentDetails: route.params?.studentDetails,
        }),
      })
        .then(() => {
          Alert.alert("Alert", "Enrolled Successfully", [
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
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <View
          style={{
            paddingTop: insets.top,
            flex: 1,
          }}
        >
          <View>
            <View style={styles.headerText}>
              <Text style={styles.profileText}>{route.params?.courseName}</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 50,
              }}
            >
              <View style={styles.container}>
                <View style={styles.item}>
                  <Text>{route.params?.courseContent}</Text>
                </View>
              </View>
              <View>
                <View style={{ alignItems: "center", marginRight: 20 }}>
                  <CustomButton label={"Enroll"} onPress={enrollCourse} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ padding: 20 }}>
            <CustomButton
              label={"Back"}
              onPress={async () =>
                navigation.navigate("StudentCourseList", {
                  studentId: route.params?.studentId,
                  email: route.params?.email,
                  studentDetails: route.params?.studentDetails,
                  page: "ViewCourse",
                })
              }
            />
          </View>
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  headerText: {
    paddingLeft: Platform.OS === "web" ? 600 : 130,
    backgroundColor: "#30CC94",
    paddingTop: 60,
    height: 150,
  },
  profileText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 50,
    alignItems: "center",
    // paddingLeft: Platform.OS === "web" ? 500 : 35,
  },
  image: {
    borderRadius: 100,
    border: "4px solid #FFFFFF",
    width: Platform.OS === "web" ? 100 : 150,
    height: Platform.OS === "web" ? 500 : 150,

    // display: Platform.OS === "web" ? "none" : "flex",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  item: {
    padding: 20,
    fontSize: 15,
  },
});

export default ViewCourse;
