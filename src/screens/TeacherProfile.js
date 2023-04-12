import react from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import InputField from "../components/InputField.js";
import CustomButton from "../components/CustomButton";
import { Image } from "expo-image";
import ProfileBak from "../assets/images/misc/profilebak.svg";
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const TeacherProfile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: insets.top,
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={ProfileBak}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center" }}
        />
        <Text
          style={{
            //   fontFamily: "Roboto-Medium.ttf",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Teachers Name
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
        <InputField
          label={"Verification Code"}
          keyboardType="verification-code"
        />
        <CustomButton label={"Verify"} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});

export default TeacherProfile;
