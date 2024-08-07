import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Animated, Platform, StyleSheet, Text, UIManager } from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Toast = (props, ref) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toast = (msg) => {
    setMessage(msg);
    if (!showToast) {
      setShowToast(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setShowToast(false);
          setMessage(""); // Clear the message after hiding the toast
        });
      }, 2000);
    }
  };

  useImperativeHandle(ref, () => ({
    toast: toast,
  }));

  if (showToast) {
    return (
      <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 30,
    overflow: "hidden",
    flexDirection: "row",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  toastContainer: {
    backgroundColor: "#292929",
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  toastText: {
    color: "white",
    fontSize: 14,
  },
});

export default forwardRef(Toast);
