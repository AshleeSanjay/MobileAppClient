import react from "react";
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
import CustomButton from "../components/CustomButton";
import { Image } from "expo-image";
const ProfileBak = require("../assets/images/misc/profilebak.png");
import LoginSVG from "../assets/images/misc/teacherImage.png";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const TeacherProfile = ({ navigation, route }) => {
  const jsonData = route.params?.data;
  console.log("Teacher profile: ", route.params?.data);
  var teacherId = "";
  if (route.params?.page == "EditTeacherProfile") {
    teacherId = route.params?.teacherId;
    email = route.params?.email;
  } else {
    teacherId = route.params?.data?.cognitoId;
    email = route.params?.data?.email;
  }
  const editTeacherProfile = async function () {
    try {
      console.log("Edit Teacher Profile");
      navigation.navigate("EditTeacherProfile", {
        teacherId: route.params?.data?.cognitoId,
        email: route.params?.data?.email,
        data: route.params?.data,
      });
    } catch (error) {
      console.log("Error in editing teacher profile", error);
    }
  };

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.logOutText}>
        <TouchableOpacity onPress={editTeacherProfile}>
          <Text style={{ color: "#30CC94", fontWeight: "700" }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: insets.top,
          flex: 1,
        }}
      >
        <View>
          <View style={styles.headerText}>
            <Text style={styles.profileText}>Profile</Text>

            <Image source={LoginSVG} style={styles.image} />
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
                paddingTop: 50,
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
              navigation.navigate("TeacherHome", {
                jsonData: jsonData,
                teacherId: route.params?.data?.cognitoId,
                email: route.params?.data?.email,
                teacherDetails: route.params?.data,
              })
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
  logOutText: {
    paddingLeft: 350,
    paddingTop: 10,
  },
  headerText: {
    paddingLeft: Platform.OS === "web" ? 600 : 130,
    backgroundColor: "#30CC94",
    paddingTop: 15,
    height: 70,
  },
  profileText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#fff",
    // marginBottom: 50,
    alignItems: "center",
    paddingLeft: 15,
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
});

export default TeacherProfile;
