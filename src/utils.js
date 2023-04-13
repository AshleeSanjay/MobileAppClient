import Constants from "expo-constants";

export const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * *NOTE*: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */

  //const localhost = Constants.manifest?.debuggerHost?.split(":")[0];
  //if (!localhost) {
  //  throw new Error("put your URL here");
    // return "your API URL in production";
  //}

  return `http://localhost:8081`;
};
