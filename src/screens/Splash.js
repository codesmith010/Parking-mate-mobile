import React from "react";
import { StyleSheet, View, Dimensions, LogBox } from "react-native";
import { Video } from "expo-av";
const { width, height } = Dimensions.get("window");

const Splash = ({ navigation }) => {
  LogBox.ignoreLogs([
    "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property.",
  ]);
  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      navigation.navigate("Welcome");
    }
  };

  return (
    <Video
      source={require("../../assets/fithubsvideo.mp4")}
      style={{ width, height }}
      shouldPlay
      useNativeControls={false}
      onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
    />
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: "#fff",
  },
});
