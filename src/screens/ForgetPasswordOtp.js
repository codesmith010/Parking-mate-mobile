import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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
import Colors from "../constants/Colors";
import {
  sendForgetPasswordOtp,
  verifyForgetPasswordOtp,
} from "../features/auth/authActions";
import { updateForgetOtpStatus } from "../features/auth/authSlice";

const ForgetPasswordOtp = ({ route, navigation }) => {
  const {
    forgetPasswordOtpCode,
    otpStatus,
    forgetPasswordOtpStatus,
    isLoading,
    error,
  } = useSelector((state) => state.user);
  const [otpResent, setOtpResent] = useState(false);
  const [otpInput, setOtpInput] = useState(["", "", "", ""]);

  const { email } = route.params;

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const dispatch = useDispatch();
  useEffect(() => {
    const sendingOTP = async () => {
      const dispatchForgetOTP = await dispatch(
        sendForgetPasswordOtp({ email: email })
      );

      if (dispatchForgetOTP) {
        Alert.alert(dispatchForgetOTP.payload.message);
        return;
      }
    };
    sendingOTP();
  }, [otpResent]);

  const handleOtpInputChange = (text, index) => {
    const newOtpInput = [...otpInput];
    newOtpInput[index] = text;
    setOtpInput(newOtpInput);

    // Move focus to the next input if not the last digit
    if (index < inputRefs.length - 1 && text.length === 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const errorAlert = (errorMsg) => {
    Alert.alert(
      errorMsg,
      "Do you want to resent OTP?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            changeScreen("Signin", 1000);
          },
        },
        {
          text: "Yes",
          onPress: () => {
            setOtpResent(!otpResent);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const changeScreen = (screen, time, data) => {
    // redirectShowToast();
    setTimeout(() => {
      navigation.navigate(screen, { email: data });
    }, time);
  };

  const handleVerifyOtp = async () => {
    if (otpStatus === null) {
      if (otpInput.every(Boolean)) {
        const myInputOTPCode = otpInput.join("");
        const dispatchVerifyForgetPasswordOTP = await dispatch(
          verifyForgetPasswordOtp({
            email: email,
            inputOtp: myInputOTPCode,
            otpCode: forgetPasswordOtpCode,
          })
        );
        if (dispatchVerifyForgetPasswordOTP.payload.message === "Success") {
          dispatch(updateForgetOtpStatus());
          Alert.alert(dispatchVerifyForgetPasswordOTP.payload.message);
          changeScreen("ResetPassword", 2000, email);
          return;
        } else {
          errorAlert(dispatchVerifyForgetPasswordOTP.payload.error);

          return;
        }
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
            <TouchableOpacity
              style={styles.signupBtnStyle}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.signupBtnText}>Verify</Text>
            </TouchableOpacity>

            {/* <Toast
            ref={SuccessToastRef}
            message={"Verified, redirecting to Signin page"}
          /> */}
            {/* <Toast ref={ErrorToastRef} message={error} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomStatusLayout>
  );
};

export default ForgetPasswordOtp;

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
    color: "#2054b5",
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
});
