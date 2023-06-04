import React, { useState, useEffect } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import { NativeBaseProvider } from "native-base";

const AddAssignment = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState("");
  const [category, setCategory] = useState([]);
  var url = "",
    courseListUrl = "";
  const teacherId = route.params?.id;
  const handleChange = (event) => {
    setCourseId(event.value);
  };
  courseListUrl = `${getBaseUrl()}/Course/viewStudentCourseList`;
  useEffect(() => {
    console.log("URL: ", courseListUrl);
    fetch(courseListUrl, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data: ", data);
        var count = Object.keys(data).length;
        console.log("Count: ", count);
        let dropDrownData = [];
        for (var i = 0; i < count; i++) {
          dropDrownData.push({
            value: data[i]._id,
            label: data[i].courseName,
          });
        }
        console.log("Dropdown Data: ", dropDrownData);
        setCategory(dropDrownData);
      })
      .catch((error) => {
        console.log(error.resp);
      });
  }, []);

  const saveAssignment = async () => {
    url = `${getBaseUrl()}/Assignment/addAssignment`;

    await fetch(url, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        courseId: courseId,
        cognitoSid: "",
        cognitoId: teacherId,
        assignmentTitle: assignmentTitle,
        questionOne: questionOne,
        questionTwo: questionTwo,
        answerOne: "",
        answerTwo: "",
      }),
    })
      .then((resp) => {
        Alert.alert("Alert", "Assignment Added Successfully", [
          {
            text: "OK",
            onPress: () => {
              console.log("button pressed");
              setAssignmentTitle("");
              setQuestionOne("");
              setQuestionTwo("");
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
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <NativeBaseProvider>
          <View
            style={{
              paddingTop: insets.top,
              flex: 1,
            }}
          >
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
                  Add Assignment
                </Text>
              </View>
              <InputField
                label={"Assignment Title"}
                onChangeText={setAssignmentTitle}
                value={assignmentTitle}
              />
              <View>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={category}
                  value={courseId}
                  labelField="label"
                  valueField="value"
                  onChange={handleChange}
                />
              </View>
              <View style={{ paddingTop: 30 }}>
                <InputField
                  label={"Question 1"}
                  onChangeText={setQuestionOne}
                  value={questionOne}
                />
                <InputField
                  label={"Question 2"}
                  onChangeText={setQuestionTwo}
                  value={questionTwo}
                />
              </View>
              <View style={{ flex: 2, alignItems: "center", padding: 30 }}>
                <CustomButton label={"Submit"} onPress={saveAssignment} />
              </View>
            </View>
          </View>
        </NativeBaseProvider>
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
            navigation.navigate("TeacherHome", {
              teacherId: teacherId,
              page: "AddAssignment",
            })
          }
        >
          <Text style={{ color: "#30CC94", fontWeight: "700" }}>
            TeacherHome
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AddAssignment;

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
    height: 60,
    fontSize: 16,
  },
});
