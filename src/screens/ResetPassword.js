import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import CustomStatusBar from "../components/CustomStatusBar";
import Colors from "../constants/Colors";
import { updateResetPassword } from "../features/auth/authActions";

const ResetPassword = ({ route, navigation }) => {
  const { email } = route.params;
  const dispatch = useDispatch();

  const [resetPassword, setResetPassword] = useState({
    email: email,
    password: "",
    confirmNewPassword: "",
  });

  const resetFields = () => {
    setResetPassword({
      ...resetPassword,
      password: "",
      confirmNewPassword: "",
    });
  };

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
          setTimeout(() => {
            resetFields();
            Alert.alert(dispatchResetPassword.payload.message);
          }, 600);
          return setTimeout(() => {
            navigation.navigate("Signin");
          }, 500);
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
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
              style={styles.imgContainer}
              source={require("../../assets/parkingmateWelcome.png")}
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
                color: Colors.primaryColor,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Forget Password
            </Text>
          </View>
          <View
            style={{
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
              textContentType="newPassword"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.inputStyle}
              autoCapitalize="none"
              placeholder="Confirm Password"
              onChangeText={(text) =>
                setResetPassword({ ...resetPassword, confirmNewPassword: text })
              }
              value={resetPassword.confirmNewPassword}
              secureTextEntry={true}
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
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#b3b3b3" }}
            >
              Back to{" "}
              <Text
                style={{ color: Colors.primaryColor }}
                onPress={() => navigation.navigate("Signin")}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
