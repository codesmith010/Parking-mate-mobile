import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import { useDispatch, useSelector } from "react-redux";
import CustomStatusBar from "../components/CustomStatusBar";
import Toast from "../components/Toast";
import Colors from "../constants/Colors";
import { validateForgetPassword } from "../utils/validation";

const ForgetPassword = ({ navigation }) => {
  const { user, passwordChanged, isLoading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [forgetEmail, setForgetEmail] = useState("");

  const ToastRef = useRef(null);
  const showToast = () => {
    if (ToastRef.current !== null) {
      ToastRef.current.toast(); // Show success toast
    }
  };
  const ErrorToastRef = useRef(null);
  const errorShowToast = (errorMessage) => {
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast(errorMessage);
    }
  };

  useEffect(() => {
    if (error) {
      errorShowToast(error);
    } else if (
      passwordChanged === "success" &&
      changePass.newPassword !== "" &&
      changePass.confirmNewPassword !== ""
    ) {
      showToast();
      resetFields();
    }
  }, [passwordChanged, error]);

  const resetFields = () => {
    setChangePass({
      ...changePass, // Spread the existing values of email and token
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleForgetPassword = () => {
    const errorMsg = validateForgetPassword({ forgetEmail: forgetEmail });
    if (errorMsg) return errorShowToast(errorMsg);

    if (forgetEmail.trim() !== "") {
      navigation.navigate("ForgetPasswordOTP", { email: forgetEmail });
      // dispatch(updatePassword(changePass));
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
              placeholder="Email Address"
              onChangeText={(text) => setForgetEmail(text)}
              value={forgetEmail}
            />
          </View>

          <View style={{ width: "90%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleForgetPassword}
            >
              <Text style={styles.buttonText}>
                {isLoading ? (
                  <ActivityIndicator animating={isLoading} />
                ) : (
                  "Confirm"
                )}
              </Text>
            </TouchableOpacity>
            <Toast ref={ToastRef} message="Successful Sign In" />
            <Toast ref={ErrorToastRef} message={error} />
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

export default ForgetPassword;

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
