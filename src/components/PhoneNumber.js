import { useFocusEffect } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Colors from "../constants/Colors";
import {
  sentSmsOTP,
  updateLogin,
  verifySmsOTP,
} from "../features/auth/authActions";
import { ERRORS } from "../labels/error";
import { dispatch, useSelector } from "../store/store";

const PhoneNumber = ({ navigation }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [code, setCode] = useState(null);
  const [status, setStatus] = useState(null);
  const phoneInput = useRef(null);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      dispatch(updateLogin());
      return () => {
        // setStatus(null);
        dispatch(updateLogin());
      };
    }, [status])
  );

  // Handle Sent OTP
  const handleSentOTP = () => {
    const isNotEmpty =
      formattedValue.trim() !== "" && formattedValue.length >= 12;
    const payload = {
      userID: user._id,
      to: formattedValue,
    };
    const successCallback = (response) => {
      switch (response.status) {
        case "pending":
          setStatus("pending");
          Alert.alert(ERRORS.otpSent);
          break;
        case 429:
          Alert.alert(ERRORS.tooManyRequest);
          break;
        default:
          Alert.alert(ERRORS.somethingWent);
          break;
      }
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };
    if (isNotEmpty) {
      dispatch(sentSmsOTP(params));
    } else {
      Alert.alert(ERRORS.enterPhoneNumber);
    }
  };
  // Handle Verify OTP
  const handleVerifyOTP = () => {
    const isNotEmpty = code.trim() !== "" && code.length === 6;

    const payload = {
      userID: user._id,
      to: formattedValue,
      code: code,
    };
    const successCallback = (response) => {
      switch (response.status) {
        case "approved":
          setStatus("approved");
          Alert.alert(ERRORS.otpVerifySuccess);
          break;
        default:
          Alert.alert(ERRORS.otpVerifyError);
          break;
      }
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };
    if (isNotEmpty) {
      dispatch(verifySmsOTP(params));
    } else {
      Alert.alert(ERRORS.otpError);
    }
  };
  if (user?.PhoneStatus === "verified") {
    return (
      <View style={styles.container}>
        <Text>Phone Number Already Verified</Text>
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          {status === null && (
            <>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="US"
                layout="first"
                onChangeText={(text) => {
                  setValue(text);
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                countryPickerProps={{ withAlphaFilter: true }}
                withShadow
                autoFocus
              />

              <TouchableOpacity
                style={styles.button}
                onPress={isLoading ? null : handleSentOTP}
              >
                {isLoading ? (
                  <ActivityIndicator animating={isLoading} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </TouchableOpacity>
            </>
          )}
          {status === "pending" && (
            <>
              <OTPInputView
                style={{ width: "80%", height: 100 }}
                pinCount={6}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={(code) => {
                  setCode(code);
                }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={isLoading ? null : handleVerifyOTP}
              >
                {isLoading ? (
                  <ActivityIndicator animating={isLoading} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Verify OTP</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    marginTop: 20,
    height: 40,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 6,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
  },

  welcome: {
    padding: 20,
  },

  status: {
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    color: "gray",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: Colors.primaryColor,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
  },

  underlineStyleHighLighted: {
    borderColor: Colors.primaryColor,
  },
});

export default PhoneNumber;
