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

const ViewSubmittedStudents = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [students, setStudents] = useState([]);
  console.log("Assignment Title", route.params?.assignmentId);
  //   const studentId = route.params?.id;

  var url = `${getBaseUrl()}/Student/viewSubmittedStudents?assignmentId=${
    route.params?.assignmentId
  }&cognitoSid=${route.params?.cognitoSid}`;
  useEffect(() => {
    fetch(url, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data: ", data);
        setStudents(data);
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
                {students.map((student) => {
                  return (
                    <View>
                      <View>
                        <View style={styles.headerText}>
                          <Text style={styles.profileText}>
                            Submitted Students
                          </Text>
                        </View>
                      </View>
                      <View style={{ alignItems: "flex-start" }}>
                        <Button
                          variant="link"
                          onPress={() => {
                            navigation.navigate("ViewSubmittedAssignment", {
                              assignmentId: student.assignmentId,
                              studentId: student.cognitoSid,
                            });
                          }}
                        >
                          <Text style={styles.item}>{student.name}</Text>
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
                navigation.navigate("ViewTeacherAssignments", {
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
    // paddingLeft: Platform.OS === "web" ? 600 : 130,
    // backgroundColor: "#30CC94",
    marginLeft: 10,
    paddingTop: 30,
    height: 150,
  },
  profileText: {
    fontSize: 28,
    fontWeight: "500",
    // color: "#fff",
    marginBottom: 50,
    alignItems: "center",
    // marginRight: 50,
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

export default ViewSubmittedStudents;
