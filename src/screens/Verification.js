import react from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
import { Image } from "expo-image";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Verification = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          paddingTop: insets.top,
        }}
      >
        <Image source={LoginSVG} width={400} height={200} />
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
          keyboardType="verification-code"
        />
        <CustomButton label={"Verify"} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default Verification;
