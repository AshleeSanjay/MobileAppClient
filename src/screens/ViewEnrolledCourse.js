import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Platform } from "react-native";
import CustomButton from "../components/CustomButton.js";
import { getBaseUrl } from "../utils";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";

const ViewEnrolledCourse = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [course, setCourse] = useState([]);
  //   const [courseId, setCourseId] = useState("");
  console.log("Course Id: ", route.params?.courseId);
  var studentId = "";
  if (route.params?.page == "ViewAssignmentList") {
    courseId = route.params?.studentId;
  } else {
    studentId = route.params?.id;
  }
  var url = `${getBaseUrl()}/Course/viewEnrolledCourse?courseId=${
    route.params?.courseId
  }`;

  useEffect(() => {
    fetch(url, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("View enrolled course data: ", data);
        setCourse(data);
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
                <View>
                  <View style={styles.headerText}>
                    <Text style={styles.profileText}>{course.courseName}</Text>
                  </View>
                  <View
                    style={{
                      alignItems: "flex-start",
                      flexDirection: "row",
                      paddingTop: 50,
                    }}
                  >
                    <Button style={{ backgroundColor: "transparent" }}>
                      <Text style={styles.item}>{course.courseContent}</Text>
                    </Button>

                    <Button
                      // variant="link"
                      style={{
                        borderColor: "#30CC94",
                        backgroundColor: "transparent",
                        marginLeft: 90,
                        borderWidth: 2,
                      }}
                      onPress={() => {
                        navigation.navigate("ViewAssignmentList", {
                          courseId: course._id,
                          studentId: route.params.studentId,
                          email: route.params?.email,
                          studentDetails: route.params?.studentDetails,
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 15,
                          // fontStyle: "italic",
                        }}
                      >
                        View Assignments
                      </Text>
                    </Button>
                  </View>
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
                navigation.navigate("EnrolledCourses", {
                  studentId: route.params?.studentId,
                  email: route.params?.email,
                  studentDetails: route.params?.studentDetails,
                  page: "ViewEnrolledCourse",
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
    paddingLeft: 100,
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
    paddingLeft: 15,
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

export default ViewEnrolledCourse;
