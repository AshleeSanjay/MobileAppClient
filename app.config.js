module.exports = () => ({
  name: "Education App",
  slug: "education-app",
  version: "1.0.0",
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
    bundleIdentifier: "com.ashleesanjay.educationapp",
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.ashleesanjay.educationapp",
  },
  extra: {
    // PUBLIC_API_URL: process.env.PUBLIC_API_URL ?? null,
    eas: {
      projectId: "f0e0b7e8-1a9d-4e7d-9ee9-e5d7f39abf47",
    },
  },
  // plugins: ["./expo-plugins/with-modify-gradle.js"],
  plugins: [],
});
