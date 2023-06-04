import react, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.png";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getBaseUrl } from "../utils";
import { Auth } from "aws-amplify";

const Verification = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState("");
  const [uniqueId, setuniqueId] = useState("");
  var url = "";

  const confirmSignUp = async function (
    name,
    email,
    mobile,
    userType,
    uniqueId
  ) {
    if (userType == "teacher") url = `${getBaseUrl()}/Teacher/enroll`;
    else url = `${getBaseUrl()}/Student/enroll`;
    console.log("Verification - Unique ID: ", uniqueId);
    verifyButtonPress(name, email, mobile, userType, uniqueId, url);
    const result = await Auth.confirmSignUp(email, code);
  };
  const verifyButtonPress = async function (
    name,
    email,
    mobile,
    userType,
    uniqueId,
    url
  ) {
    if (userType == "teacher") {
      await fetch(url, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: name,
          cognitoId: uniqueId,
          cognitoSid: "",
          email: email,
          mobile: mobile,
          userType: userType,
          assignmentId: "",
        }),
      })
        .then(() => {
          navigation.navigate("Login");
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
    } else if (userType == "student") {
      await fetch(url, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: name,
          cognitoId: "",
          cognitoSid: uniqueId,
          email: email,
          mobile: mobile,
          userType: userType,
          assignmentId: "",
        }),
      })
        .then(() => {
          navigation.navigate("Login");
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
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          paddingTop: insets.top,
        }}
      >
        <Image source={LoginSVG} style={styles.image} />
      </View>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
        <Text
          style={{
            //   fontFamily: "Roboto-Medium.ttf",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Verification Screen
        </Text>
        <InputField
          label={"Verification Code"}
          keyboardType="number-pad"
          onChangeText={setCode}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View>
            <CustomButton
              label={"Verify"}
              onPress={async () => {
                await confirmSignUp(
                  route.params.name,
                  route.params.email,
                  route.params.mobile,
                  route.params.userType,
                  route.params.cognitoId
                );
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
  },
});
