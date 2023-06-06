import React, { useState, useEffect } from "react";
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
import { getBaseUrl } from "../utils.js";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, NativeBaseProvider } from "native-base";

const SubmitAssignment = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [assignment, setAssignment] = useState([]);
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");

  var url = `${getBaseUrl()}/Assignment/viewStudentAssignment?assignmentId=${
    route.params?.assignmentId
  }`;
  console.log("URL: ", url);
  const submitAssignment = async () => {
    var submitUrl = `${getBaseUrl()}/Assignment/updateAssignment?assignmentId=${
      route.params?.assignmentId
    }`;
    if (answerOne != "" && answerTwo != "") {
      await fetch(submitUrl, {
        headers: { "content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
          cognitoSid: route.params?.cognitoSid,
          answerOne: answerOne,
          answerTwo: answerTwo,
        }),
      })
        .then((resp) => {
          Alert.alert("Alert", "Assignment Submitted Successfully", [
            {
              text: "OK",
              onPress: () => {
                console.log("button pressed");
                setAnswerOne("");
                setAnswerTwo("");
                navigation.navigate("ViewAssignmentList", {
                  courseId: route.params?.courseId,
                  email: route.params?.email,
                  studentDetails: route.params?.studentDetails,
                });
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
    } else {
      Alert.alert("Warning", "Answers cannot be blank", [
        {
          text: "OK",
          onPress: () => {
            console.log("button pressed");
          },
        },
      ]);
    }
  };
  useEffect(() => {
    fetch(url, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data: ", data);
        setAssignment(data);
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
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 50,
              }}
            >
              <View style={styles.container}>
                <View>
                  <View>
                    <View style={styles.headerText}>
                      <Text style={styles.profileText}>
                        {assignment.assignmentTitle}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "flex-start",
                      marginLeft: 20,
                      marginTop: 20,
                    }}
                  >
                    <Text style={styles.item}>{assignment.questionOne}</Text>
                    <InputField
                      label={"Answer"}
                      onChangeText={setAnswerOne}
                      value={answerOne}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "flex-start",
                      marginLeft: 20,
                      marginTop: 20,
                    }}
                  >
                    <Text style={styles.item}>{assignment.questionTwo}</Text>
                    <InputField
                      label={"Answer"}
                      onChangeText={setAnswerTwo}
                      value={answerTwo}
                    />
                  </View>
                  <View style={{ padding: 80 }}>
                    <CustomButton label={"Submit"} onPress={submitAssignment} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
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
              navigation.navigate("ViewAssignmentList", {
                courseId: route.params?.courseId,
                email: route.params?.email,
                studentDetails: route.params?.studentDetails,
              })
            }
          >
            <Text style={{ color: "#30CC94", fontWeight: "700" }}>
              ViewAssignmentList
            </Text>
          </TouchableOpacity>
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

export default SubmitAssignment;
