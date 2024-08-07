import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import CustomStatusBar from "./CustomStatusBar";

const CustomStatusLayout = ({ children }) => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.primaryDark} />
      {children}
    </SafeAreaProvider>
  );
};

export default CustomStatusLayout;
