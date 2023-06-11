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

import { getBaseUrl } from "../utils";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";

const EnrolledCourses = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  console.log("CourseList, ID: ", route.params?.id);
  var studentId = "";
  if (route.params?.page == "ViewAssignmentList") {
    studentId = route.params?.studentId;
  } else {
    studentId = route.params?.id;
  }
  var url = `${getBaseUrl()}/Course/viewEnrolledCourseList?cognitoSid=${
    route.params?.studentId
  }`;

  useEffect(() => {
    fetch(url, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
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
                <View style={styles.headerText}>
                  <Text style={styles.profileText}>Enrolled Courses</Text>
                </View>
                {courses.map((course) => {
                  return (
                    <View>
                      <View style={{ alignItems: "flex-start" }}>
                        <Button
                          style={{ backgroundColor: "transparent" }}
                          variant="link"
                          onPress={() => {
                            navigation.navigate("ViewEnrolledCourse", {
                              courseId: course._id,
                              studentId: route.params?.studentId,
                              email: route.params?.email,
                              studentDetails: route.params?.studentDetails,
                            });
                          }}
                        >
                          <Text style={styles.item}>{course.courseName}</Text>
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
                  studentId: route.params?.studentId,
                  email: route.params?.email,
                  studentDetails: route.params?.studentDetails,
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
    paddingTop: 15,
    height: 70,
  },
  profileText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#fff",
    // marginBottom: 50,
    alignItems: "center",
    paddingLeft: 5,
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
