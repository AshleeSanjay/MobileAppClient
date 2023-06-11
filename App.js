import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Amplify, Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",

    // REQUIRED - Amazon Cognito Region
    region: "ca-central-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    //identityPoolRegion: "XX-XXXX-X",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ca-central-1_TcO2k8LH0",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "5800bec2c5f46bevgl3rau4ijt",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: "code", // 'code' | 'link'

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: ".yourdomain.com",
    //   // OPTIONAL - Cookie path
    //   path: "/",
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //   sameSite: "strict" | "lax",
    //   // OPTIONAL - Cookie secure flag
    //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //   secure: true,
    // },

    // OPTIONAL - customized storage object
    //storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: "USER_PASSWORD_AUTH",

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    //clientMetadata: { myCustomKey: "myCustomValue" },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "your_cognito_domain",
      scope: [
        "phone",
        "email",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin",
      ],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      // redirectSignIn: "https://mobileappbackend-production.up.railway.app",
      // redirectSignOut: "https://mobileappbackend-production.up.railway.app",
      responseType: "token", // code or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
});

// You can get the current config object
export const currentConfig = Auth.configure();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
