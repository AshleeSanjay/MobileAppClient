import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Verification from "../screens/Verification";
import TeacherHome from "../screens/TeacherHome";
import TeacherProfile from "../screens/TeacherProfile";
import StudentProfile from "../screens/StudentProfile";
import EditStudentProfile from "../screens/EditStudentProfile";
import EditTeacherProfile from "../screens/EditTeacherProfile";
import TeacherCourseList from "../screens/TeacherCourseList";
import AddCourse from "../screens/AddCourse";
import ViewCourse from "../screens/ViewCourse";
import StudentHome from "../screens/StudentHome";
import EnrolledCourses from "../screens/EnrolledCourses";
import StudentCourseList from "../screens/StudentCourseList";
import AddAssignment from "../screens/AddAssignment";
import ViewTeacherAssignments from "../screens/ViewTeacherAssignments";
import ViewSubmittedStudents from "../screens/ViewSubmittedStudents";
import ViewSubmittedAssignment from "../screens/ViewSubmittedAssignment";
import ViewAssignmentList from "../screens/ViewAssignmentList";
import SubmitAssignment from "../screens/SubmitAssignment";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {<Stack.Screen name="Login" component={Login} />}
      {<Stack.Screen name="Register" component={Register} />}
      {<Stack.Screen name="Verification" component={Verification} />}
      {<Stack.Screen name="TeacherHome" component={TeacherHome} />}
      {<Stack.Screen name="StudentHome" component={StudentHome} />}
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
      {<Stack.Screen name="TeacherCourseList" component={TeacherCourseList} />}
      {<Stack.Screen name="AddCourse" component={AddCourse} />}
      {<Stack.Screen name="ViewCourse" component={ViewCourse} />}
      {<Stack.Screen name="EnrolledCourses" component={EnrolledCourses} />}
      {<Stack.Screen name="StudentCourseList" component={StudentCourseList} />}
      {<Stack.Screen name="AddAssignment" component={AddAssignment} />}
      {
        <Stack.Screen
          name="ViewTeacherAssignments"
          component={ViewTeacherAssignments}
        />
      }
      {
        <Stack.Screen
          name="ViewSubmittedStudents"
          component={ViewSubmittedStudents}
        />
      }
      {
        <Stack.Screen
          name="ViewSubmittedAssignment"
          component={ViewSubmittedAssignment}
        />
      }
      {
        <Stack.Screen
          name="ViewAssignmentList"
          component={ViewAssignmentList}
        />
      }
      {<Stack.Screen name="SubmitAssignment" component={SubmitAssignment} />}
    </Stack.Navigator>
  );
};

export default AuthStack;
