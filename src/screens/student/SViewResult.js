import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const SViewResult = () => {
  useEffect(() => {
    return () => {
      console.log("unmounting");
    };
  }, []);
  return (
    <View>
      <Text>SViewResult</Text>
    </View>
  );
};

export default SViewResult;

const styles = StyleSheet.create({});
