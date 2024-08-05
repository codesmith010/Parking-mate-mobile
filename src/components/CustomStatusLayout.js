import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "./CustomStatusBar";
import Colors from "../constants/Colors";

const CustomStatusLayout = ({ children }) => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.primaryDark} />
      {children}
    </SafeAreaProvider>
  );
};

export default CustomStatusLayout;
