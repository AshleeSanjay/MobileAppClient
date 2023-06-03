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
  Platform,
} from "react-native";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.png";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { getBaseUrl } from "../utils";
import DropDownField from "../components/Dropdown";

const AddCourse = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [courseName, setCourseName] = useState("");
  const [courseContent, setCourseContent] = useState("");
  var url = "";
  const teacherId = route.params?.teacherId;
  console.log("AddCourse, TeacherID: ", route.params?.teacherId);
  const saveCourse = async () => {
    url = `${getBaseUrl()}/Course/addCourse`;
    await fetch(url, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        cognitoSid: "",
        cognitoId: route.params?.teacherId,
        courseName: courseName,
        courseContent: courseContent,
        userType: "",
        flag: "A",
      }),
    })
      .then((resp) => {
        Alert.alert("Alert", "Course Added Successfully", [
          {
            text: "OK",
            onPress: () => {
              console.log("button pressed");
              setCourseName("");
              setCourseContent("");
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
                Add Course
              </Text>
            </View>
            <InputField
              label={"Course Name"}
              onChangeText={setCourseName}
              value={courseName}
            />
            <InputField
              label={"Course Content"}
              onChangeText={setCourseContent}
              value={courseContent}
            />

            <View style={{ flex: 2, alignItems: "center", padding: 30 }}>
              <CustomButton label={"Submit"} onPress={saveCourse} />
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TeacherCourseList", {
                teacherId: route.params?.teacherId,
                page: "AddCourse",
              })
            }
          >
            <Text style={{ color: "#30CC94", fontWeight: "700" }}>
              Course List
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddCourse;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  image: {
    width: 300,
    height: 100,
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
