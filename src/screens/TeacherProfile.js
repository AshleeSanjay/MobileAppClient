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
const ProfileBak = require("../assets/images/misc/profilebak.png");
import LoginSVG from "../assets/images/misc/login.svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const TeacherProfile = ({ navigation, route }) => {
  const jsonData = route.params?.data;
  console.log("profile page", route.params?.data);

  console.log("email", route.params?.data?.email);

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: insets.top,
          flex: 1,
        }}
      >
        <View style={{ paddingLeft: 130 }}>
          <Image
            source={LoginSVG}
            width={150}
            height={150}
            style={{ borderRadius: 100 }}
          />
        </View>
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Profile
          </Text>
        </View>

        <View style={{ flex: 1, paddingLeft: 20 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Name:</Text>
            <Text style={{ paddingLeft: 10, fontSize: 20 }}>
              {route.params?.data?.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Email:</Text>
            <Text style={{ paddingLeft: 10, fontSize: 20 }}>
              {route.params?.data?.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Mobile:</Text>
            <Text style={{ paddingLeft: 10, fontSize: 20 }}>
              {route.params?.data?.mobile}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Designation:
            </Text>
            <Text style={{ paddingLeft: 10, fontSize: 20 }}>
              {route.params?.data?.userType}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={{ padding: 20 }}>
          <CustomButton
            label={"Back"}
            onPress={async () =>
              navigation.navigate("Home", { jsonData: jsonData })
            }
          />
        </View>
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
