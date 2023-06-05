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

const ViewAssignmentList = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [assignments, setAssignments] = useState([]);
  const [submittedAssignment, setSubmittedAssignment] = useState([]);
  const [count, setCount] = useState(null);
  var url = `${getBaseUrl()}/Assignment/viewAssignment?courseId=${
    route.params?.courseId
  }`;
  console.log("URL: ", url);
  useEffect(() => {
    fetch(url, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("View Assignment Data: ", data);
        setAssignments(data);
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
            <View style={styles.headerText}>
              <Text style={styles.profileText}>Assignments</Text>
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
                {assignments.map((assignment) => {
                  return (
                    <View style={{ alignItems: "flex-start" }}>
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          style={{ backgroundColor: "transparent" }}
                          variant="link"
                          onPress={() => {
                            navigation.navigate("SubmitAssignment", {
                              assignmentId: assignment._id,
                              cognitoSid: route.params?.studentId,
                            });
                          }}
                        >
                          <Text style={styles.item}>
                            {assignment.assignmentTitle}
                          </Text>
                        </Button>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            <View></View>
          </View>
        </View>
        <View>
          <View style={{ padding: 20 }}>
            <CustomButton
              label={"Back"}
              onPress={async () =>
                navigation.navigate("StudentHome", {
                  //   studentId: studentId,
                  //   page: "ViewAssignmentList",
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
  },
  image: {
    borderRadius: 100,
    border: "4px solid #FFFFFF",
    width: Platform.OS === "web" ? 100 : 150,
    height: Platform.OS === "web" ? 500 : 150,
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

export default ViewAssignmentList;
