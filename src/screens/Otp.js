import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomStatusLayout from "../components/CustomStatusLayout";
import Toast from "../components/Toast";
import Colors from "../constants/Colors";
import { sendOtp, verifyOtp } from "../features/auth/authActions";
import { updateOtpStatus } from "../features/auth/authSlice";

const Otp = ({ route, navigation }) => {
  const { otpCode, otpStatus, otpSentStatus, isLoading, error } = useSelector(
    (state) => state.user
  );
  const [otpInput, setOtpInput] = useState(["", "", "", ""]);

  const { email } = route.params;

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const SuccessToastRef = useRef(null);
  const successShowToast = (message) => {
    if (SuccessToastRef.current !== null) {
      SuccessToastRef.current.toast(message);
    }
  };

  const ErrorToastRef = useRef(null);
  const errorShowToast = (errorMessage) => {
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast(errorMessage);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      errorShowToast(error);
      return;
    }
    if (otpStatus === "verified") {
      successShowToast("Verified, redirecting to Signin page");
      dispatch(updateOtpStatus());
      changeScreen();
      return;
    }

    if (otpSentStatus === "pending") {
      dispatch(sendOtp({ email: email }));
      return;
    }
  }, [otpStatus, error]);

  const handleOtpInputChange = (text, index) => {
    const newOtpInput = [...otpInput];
    newOtpInput[index] = text;
    setOtpInput(newOtpInput);

    // Move focus to the next input if not the last digit
    if (index < inputRefs.length - 1 && text.length === 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const changeScreen = () => {
    // redirectShowToast();
    setTimeout(() => {
      navigation.navigate("Signin");
    }, 2000);
  };

  const handleVerifyOtp = () => {
    if (otpStatus === null) {
      if (otpInput.every(Boolean)) {
        const myInputOTPCode = otpInput.join("");
        dispatch(
          verifyOtp({
            email: email,
            inputOtp: myInputOTPCode,
            otpCode: otpCode,
          })
        );
      } else {
        alert("Enter otp");
      }
    }
  };

  return (
    <CustomStatusLayout>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: 24,
          paddingLeft: "5%",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: Colors.primaryDark }}
            size={28}
          />
        </Pressable>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.subcontainer}>
          <View>
            <Image
              style={{ width: 180, height: 180 }}
              source={require("../../assets/OTPImg.png")}
            />
          </View>
          <View style={{ alignItems: "center", gap: 20 }}>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 28,
                  textAlign: "center",
                }}
              >
                OTP Verification
              </Text>
              <Text>Enter the OTP sent to your email</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5, paddingBottom: 25 }}>
              <TextInput
                ref={inputRefs[0]}
                style={styles.inputStyle}
                placeholder=""
                maxLength={1}
                value={otpInput[0]}
                keyboardType="number-pad"
                returnKeyType="done"
                onChangeText={(text) => handleOtpInputChange(text, 0)}
              />
              <TextInput
                ref={inputRefs[1]}
                style={styles.inputStyle}
                placeholder=""
                maxLength={1}
                value={otpInput[1]}
                keyboardType="number-pad"
                returnKeyType="done"
                onChangeText={(text) => handleOtpInputChange(text, 1)}
              />
              <TextInput
                ref={inputRefs[2]}
                style={styles.inputStyle}
                placeholder=""
                maxLength={1}
                value={otpInput[2]}
                keyboardType="number-pad"
                returnKeyType="done"
                onChangeText={(text) => handleOtpInputChange(text, 2)}
              />
              <TextInput
                ref={inputRefs[3]}
                style={styles.inputStyle}
                placeholder=""
                maxLength={1}
                value={otpInput[3]}
                keyboardType="number-pad"
                returnKeyType="done"
                onChangeText={(text) => handleOtpInputChange(text, 3)}
              />
            </View>
          </View>
          <View style={{ width: "90%", alignItems: "center" }}>
            {otpSentStatus === "pending" ? (
              <Pressable style={styles.otpSendingBtnStyle}>
                <Text style={styles.signupBtnText}>Sending OTP </Text>
                <ActivityIndicator animating={isLoading} />
              </Pressable>
            ) : (
              <TouchableOpacity
                style={styles.signupBtnStyle}
                onPress={handleVerifyOtp}
              >
                <Text style={styles.signupBtnText}>Verify</Text>
              </TouchableOpacity>
            )}
            <Toast
              ref={SuccessToastRef}
              message={"Verified, redirecting to Signin page"}
            />
            <Toast ref={ErrorToastRef} message={error} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomStatusLayout>
  );
};

export default Otp;

const styles = StyleSheet.create({
  subcontainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: 240,
    height: 280,
    // backgroundColor: "red",
  },
  inputStyle: {
    color: Colors.primaryDark,
    backgroundColor: Colors.primaryLight,
    textAlign: "center",
    padding: 8,
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
  },
  signupBtnStyle: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  otpSendingBtnStyle: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  signupBtnText: {
    color: Colors.black,
    fontWeight: "bold",
  },
  loginBtnStyle: {
    padding: 12,
    width: "90%",
    borderColor: Colors.primaryDark,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
  },
  loginBtnText: {
    color: Colors.primaryDark,
    fontWeight: "bold",
  },
});
