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

const ViewSubmittedAssignment = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [assignment, setAssignment] = useState([]);
  //   const studentId = route.params?.id;
  console.log("Assignment Id: ", route.params?.assignmentId);
  console.log("Cognito SID: ", route.params?.studentId);
  var url = `${getBaseUrl()}/Assignment/viewSubmittedAssignment?assignmentId=${
    route.params?.assignmentId
  }&cognitoSid=${route.params?.studentId}`;
  useEffect(() => {
    fetch(url, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Submitted Assignment Data: ", data);
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
                    <Text style={styles.item}>{assignment.answerOne}</Text>
                    <Text style={styles.item}>{assignment.questionTwo}</Text>
                    <Text style={styles.item}>{assignment.answerTwo}</Text>
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
                navigation.navigate("ViewSubmittedStudents", {
                  //   studentId: studentId,
                  //   page: "StudentCourse",
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

export default ViewSubmittedAssignment;
