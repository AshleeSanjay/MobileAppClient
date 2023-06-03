import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
} from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton.js";
import { Image } from "expo-image";
const ProfileBak = require("../assets/images/misc/profilebak.png");
import LoginSVG from "../assets/images/misc/studentImg.jpg";
import { getBaseUrl } from "../utils";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";

const courses = [
  {
    id: "1",
    name: "Course 1",
  },
  {
    id: "2",
    name: "Course 2",
  },
];
const EnrolledCourses = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  console.log("CourseList, ID: ", route.params?.id);
  const studentId = route.params?.id;
  // const studentIdAddCourse = route.params?.studentId;

  console.log("Enrolled Courses: ", route.params?.studentId);
  var url = `${getBaseUrl()}/Course/viewEnrolledCourseList?cognitoSid=${studentId}`;
  console.log("URL: ", url);
  useEffect(() => {
    fetch(url, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <View
          style={{
            paddingTop: insets.top,
            flex: 1,
          }}
        >
          <View></View>
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 50,
              }}
            >
              <View style={styles.container}>
                {courses.map((course) => {
                  return (
                    <View>
                      <View style={styles.headerText}>
                        <Text style={styles.profileText}>
                          {course.courseName}
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-start" }}>
                        <Button style={{ backgroundColor: "transparent" }}>
                          <Text style={styles.item}>
                            {course.courseContent}
                          </Text>
                        </Button>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ padding: 20 }}>
            <CustomButton
              label={"Back"}
              onPress={async () =>
                navigation.navigate("StudentHome", {
                  studentId: studentId,
                  page: "EnrollCourse",
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
    fontSize: 15,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 50,
//   },

//   profileText: {
//     fontSize: 28,
//     fontWeight: "500",
//     color: "#fff",
//     marginBottom: 50,
//     alignItems: "center",
//   },
// });

export default EnrolledCourses;
