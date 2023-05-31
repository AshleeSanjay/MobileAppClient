import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Verification from "../screens/Verification";
import Home from "../screens/Home";
import TeacherProfile from "../screens/TeacherProfile";
import StudentProfile from "../screens/StudentProfile";
import EditStudentProfile from "../screens/EditStudentProfile";
import EditTeacherProfile from "../screens/EditTeacherProfile";
import CourseList from "../screens/CourseList";
import AddCourse from "../screens/AddCourse";
import ViewCourse from "../screens/ViewCourse";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {<Stack.Screen name="Login" component={Login} />}
      {<Stack.Screen name="Register" component={Register} />}
      {<Stack.Screen name="Verification" component={Verification} />}
      {<Stack.Screen name="Home" component={Home} />}
      {<Stack.Screen name="TeacherProfile" component={TeacherProfile} />}
      {<Stack.Screen name="StudentProfile" component={StudentProfile} />}
      {
        <Stack.Screen
          name="EditStudentProfile"
          component={EditStudentProfile}
        />
      }
      {
        <Stack.Screen
          name="EditTeacherProfile"
          component={EditTeacherProfile}
        />
      }
      {<Stack.Screen name="CourseList" component={CourseList} />}
      {<Stack.Screen name="AddCourse" component={AddCourse} />}
      {<Stack.Screen name="ViewCourse" component={ViewCourse} />}
    </Stack.Navigator>
  );
};

export default AuthStack;
