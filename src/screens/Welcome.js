import React from "react";
import {
  Image,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";

const Welcome = ({ navigation }) => {
  LogBox.ignoreLogs([
    "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property.",
  ]);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "50%",
          height: 240,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.imgContainer}
          source={require("../../assets/parkingmateWelcome.png")}
        />
      </View>
      <View
        style={{
          width: "95%",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 24 }}>Welcome to</Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Parking Mate</Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#b3b3b3",
            marginTop: 8,
          }}
        >
          Find your parking space, instantly from the App
        </Text>
      </View>
      <View style={{ width: "90%", alignItems: "center", gap: 22 }}>
        <TouchableOpacity
          style={styles.loginBtnStyle}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupBtnStyle}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupBtnText}>Signup</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#b3b3b3" }}>
          Don't Have an Account? Register Here
        </Text>
      </View> */}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: 200,
    height: 200,
  },
  inputStyle: {
    color: "#999999",
    backgroundColor: "#d9d9d9",
    padding: 12,
    width: "90%",
    borderRadius: 12,
  },
  signupBtnStyle: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  signupBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginBtnStyle: {
    // backgroundColor: "#fff",
    padding: 12,
    width: "90%",
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
  },
  loginBtnText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
});
