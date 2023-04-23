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
import CustomButton from "../components/CustomButton.js";
import { Image } from "expo-image";
const ProfileBak = require("../assets/images/misc/profilebak.png");
import LoginSVG from "../assets/images/misc/studentImg.jpg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const StudentProfile = ({ navigation, route }) => {
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
        <View>
          {/* <View style={{ alignItems: "center", paddingTop: 20 }}></View> */}
          <View
            style={{
              paddingLeft: 130,
              backgroundColor: "#AD40AF",
              paddingTop: 60,
              height: 250,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "500",
                color: "#fff",
                marginBottom: 50,
                alignItems: "center",
                paddingLeft: 35,
              }}
            >
              Profile
            </Text>
            <Image
              source={LoginSVG}
              width={150}
              height={150}
              style={{
                borderRadius: 100,
                border: "4px solid #FFFFFF",
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1, paddingLeft: 20 }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                paddingTop: 40,
              }}
            >
              {route.params?.data?.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 50,
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
              paddingTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Mobile:</Text>
            <Text style={{ paddingLeft: 10, fontSize: 20 }}>
              {route.params?.data?.mobile}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 20,
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

export default StudentProfile;
