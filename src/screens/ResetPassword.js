import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../components/CustomStatusBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateResetPassword } from "../features/auth/authActions";

const ResetPassword = ({ route, navigation }) => {
  const { email } = route.params;
  const dispatch = useDispatch();

  const [resetPassword, setResetPassword] = useState({
    email: email,
    password: "",
    confirmNewPassword: "",
  });

  console.log("resetPassword: ", resetPassword);

  const resetFields = () => {
    setResetPassword({
      ...resetPassword,
      password: "",
      confirmNewPassword: "",
    });
  };

  console.log("resetPassword: ", resetPassword);

  const handleResetPassword = async () => {
    if (
      resetPassword.password !== "" &&
      resetPassword.confirmNewPassword !== ""
    ) {
      // navigation.navigate("ForgetPasswordOTP", { email: resetPassword });
      if (resetPassword.password === resetPassword.confirmNewPassword) {
        const dispatchResetPassword = await dispatch(
          updateResetPassword(resetPassword)
        );
        if (dispatchResetPassword.payload.status === "Success") {
          Alert.alert(dispatchResetPassword.payload.message);
          resetFields();
          navigation.navigate("Signin");
          return;
        } else {
          Alert.alert(dispatchResetPassword.payload.error);
          return;
        }
      } else {
        Alert.alert("Passwords do not match");
        return;
      }
    } else {
      // errorShowToast(); // Show error toast when passwords don't match
    }
  };

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.primaryDark} />
      <View style={styles.container}>
        <View
          style={{
            width: "90%",
            height: 240,
            alignItems: "center",
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              position: "absolute",
              top: 50,
              right: 3,
            }}
            source={require("../../assets/512-fithubs.png")}
          />

          <Image
            style={styles.imgContainer}
            source={require("../../assets/blue-img.png")}
          />
        </View>

        <View
          style={{
            width: "95%",
            alignItems: "center",
            gap: 5,
            //   marginTop: 1,
          }}
        >
          {/* <TextInput style={styles.inputStyle} placeholder="Email Address" />
        <TextInput style={styles.inputStyle} placeholder="Password" /> */}
          {/* <Text style={{ fontSize: 24 }}>Forget Password </Text> */}
          <Text
            style={{
              color: "#0741ad",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Forget Password
          </Text>
          {/* <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#b3b3b3",
            marginTop: 8,
          }}
        >
          Find your trainer, instantly from the App
        </Text> */}
        </View>
        <View
          style={{
            // backgroundColor: "red",
            width: "90%",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="New Password"
            onChangeText={(text) =>
              setResetPassword({ ...resetPassword, password: text })
            }
            value={resetPassword.password}
          />
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Confirm Password"
            onChangeText={(text) =>
              setResetPassword({ ...resetPassword, confirmNewPassword: text })
            }
            value={resetPassword.confirmNewPassword}
          />
        </View>

        <View style={{ width: "90%", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleResetPassword}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#b3b3b3" }}>
            Back to{" "}
            <Text
              style={{ color: "#0741ad" }}
              onPress={() => navigation.navigate("Signin")}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: 200,
    height: 200,
  },
  inputStyle: {
    color: "#999999",
    backgroundColor: "#f0f0f0",
    padding: 12,
    width: "90%",
    borderRadius: 12,
  },
  buttonStyle: {
    backgroundColor: "#0741ad",
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
