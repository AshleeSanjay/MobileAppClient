import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";

// const handleButtonPress = () => {
//   fetch("URL GOES HERE", {
//     method: "POST",
//     body: JSON.stringify({ name: "Ashlee" }),
//   }).catch((err) => {
//     setErrText(err?.message ?? "Something went wrong");
//   });
// };
// const handleButtonPress = () => {
//   fetch(`${getBaseUrl()}/Teacher/enroll?email=${email}&name=${fname}`, {
//     headers: { "content-type": "application/json" },
//   }).catch((err) => {
//     setErrText(err?.message ?? "Something went wrong");
//   });
// };
const Register = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [fname, setFName] = useState("");
  const [text, setText] = useState("");
  const data = [
    { label: "Teacher", value: "1" },
    { label: "Student", value: "2" },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
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
          <Image source={LoginSVG} width={400} height={200} />
        </View>
        {/* <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}> */}
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
              Registration Screen
            </Text>
          </View>

          <InputField
            label={"First Name"}
            onChangeText={setText}
            value={text}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <CustomButton
              label={"Register"}
              onPress={() =>
                Alert.alert("Alert me", `dropdown value is ${value}`, [
                  { text: "OK", onPress: () => {} },
                ])
              }
            />
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
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
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
