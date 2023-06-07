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
import { getBaseUrl } from "../utils.js";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";

const TeacherCourseList = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  console.log("CourseList, ID: ", route.params?.id);
  var teacherId = "";
  if (route.params?.page == "AddCourse") {
    teacherId = route.params?.teacherId;
  } else {
    teacherId = route.params?.id;
  }
  const teacherIdAddCourse = route.params?.teacherId;

  console.log("From Add course page: ", route.params?.id);
  console.log("TeacherCourseList: ", route.params?.data);
  var url = `${getBaseUrl()}/Course/viewTeacherCourseList?cognitoId=${
    route.params?.id
  }`;
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
          <View>
            <View style={styles.headerText}>
              <Text style={styles.profileText}>Course List</Text>
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
                {(courses || []).map((course) => {
                  return (
                    <View style={{ alignItems: "flex-start" }} key={course._id}>
                      <Button style={{ backgroundColor: "transparent" }}>
                        <Text style={styles.item}>{course.courseName}</Text>
                      </Button>
                    </View>
                  );
                })}
              </View>
            </View>
            <View>
              <View style={{ alignItems: "center" }}>
                <CustomButton
                  label={"Add Course"}
                  onPress={() => {
                    navigation.navigate("AddCourse", {
                      teacherId: teacherId,
                      teacherDetails: route.params?.teacherDetails,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ padding: 20 }}>
            <CustomButton
              label={"Back"}
              onPress={async () =>
                navigation.navigate("TeacherHome", {
                  teacherId: teacherId,
                  email: route.params?.teacherDetails?.email,
                  teacherDetails: route.params?.teacherDetails,
                  page: "TeacherCourse",
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

export default TeacherCourseList;
