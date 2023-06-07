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
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { getBaseUrl } from "../utils";

const EditTeacherProfile = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const saveDetails = async function () {
    var editUrl = `${getBaseUrl()}/Teacher/updateTeacherDetail?teacherId=${
      route.params?.teacherId
    }`;

    await fetch(editUrl, {
      headers: { "content-type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        mobile: mobile,
      }),
    })
      .then((resp) => {
        Alert.alert("Alert", "Details edited Successfully", [
          {
            text: "OK",
            onPress: () => {
              console.log("button pressed");
              navigation.navigate("TeacherProfile", {
                email: route.params?.email,
                teacherId: route.params?.teacherId,
                data: route.params?.data,
                page: "EditTeacherProfile",
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
                Edit Teacher Profile
              </Text>
            </View>
            <InputField
              label={"Full Name"}
              onChangeText={setName}
              value={name}
            />

            <InputField
              label={"Mobile"}
              keyboardType="phone-pad"
              onChangeText={setMobile}
              value={mobile}
            />

            <View style={{ flex: 2, alignItems: "center", padding: 30 }}>
              <CustomButton label={"Submit"} onPress={saveDetails} />
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
              navigation.navigate("TeacherProfile", {
                mail: route.params?.email,
                teacherId: route.params?.teacherId,
                data: route.params?.data,
                page: "EditTeacherProfile",
              })
            }
          >
            <Text style={{ color: "#30CC94", fontWeight: "700" }}>
              StudentProfile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EditTeacherProfile;

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
