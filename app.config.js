module.exports = () => ({
  name: "Education App",
  slug: "education-app",
  owner: "ashleesanjay",
  scheme: "expo",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ashleesanjay.education-app",
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.ashleesanjay.education-app",
  },
  extra: {
    // PUBLIC_API_URL: process.env.PUBLIC_API_URL ?? null,
    // eas: {
    //   projectId: "d4d476ca-f6fa-4c8c-b203-dc6f66eaf124",
    // },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});
