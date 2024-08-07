import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Checkbox from "expo-checkbox";
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
import Toast from "../components/Toast";
import Colors from "../constants/Colors";
import { signup } from "../features/auth/authActions";
import { updateSignupStatus } from "../features/auth/authSlice";
import { dispatch, useSelector } from "../store/store";
import { validateRegister } from "../utils/validation";

const UnderlinedText = ({ children, active, handleEveryStep, myVal }) => (
  <View>
    <Text
      style={{ color: Colors.primaryColor, fontWeight: "500" }}
      onPress={() => handleEveryStep(myVal)}
    >
      {children}
    </Text>
    {active ? (
      <View style={styles.activeUnderline} />
    ) : (
      <View style={styles.underline} />
    )}
  </View>
);

const Signup = ({ navigation }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isEmailInvalid, setEmailIsInvalid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({
    AccountStatus: "pending",
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
  });

  const { signupStatus, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (data.Email.length > 0) {
      const validateMyMail = setTimeout(() => {
        validateEmail(data.Email);
      }, 2000);

      return () => clearTimeout(validateMyMail);
    }
  }, [data.Email]);

  const handleAddressSelect = (addressData) => {
    const { address, city, country } = addressData;
    setData((prevData) => ({
      ...prevData,
      Address: address,
      City: city,
      Country: country,
    }));
  };

  const ToastRef = useRef(null);
  const showToast = (msg) => {
    if (ToastRef.current !== null) {
      ToastRef.current.toast(msg);
    }
  };

  // Error toast
  const ErrorToastRef = useRef(null);
  const errorToast = (errorMessage) => {
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast(errorMessage);
    }
  };

  // handle Every step
  const handleEveryStep = (stepNum) => {
    setStep(stepNum);
  };

  const handleAgreementToggle = () => {
    setIsAgreed(!isAgreed);
  };

  // handling date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setData({
      ...data,
      DateOfBirth: currentDate.toLocaleDateString(),
    });
  };

  // Validate Emails
  const validateEmail = (emailToTest) => {
    // Email regex pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailPattern.test(emailToTest)) {
      // alert("Invalid Email", "Please enter a valid email address.");
      setEmailIsInvalid(true);
      return;
    } else {
      setEmailIsInvalid(false);
      return;
    }

    // Email is valid, do something
    // ...
  };

  // handle signup
  const handleSignup = () => {
    const isNotEmpty = Object.values(data).every(
      (value) => value.trim() !== ""
    );
    const payload = {
      ...data,
    };

    const errorMsg = validateRegister(payload);
    if (errorMsg) return errorToast(errorMsg);

    const successCallback = (response) => {
      showToast(response);
      setTimeout(() => {
        dispatch(updateSignupStatus());
        navigation.navigate("Otp", { email: data.Email });
      }, 2000);
    };

    const errorCallback = (error) => {
      errorToast(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };
    // If all signup fields are not empty then we can only signup
    if (isNotEmpty && !isEmailInvalid) {
      if (isAgreed) {
        dispatch(signup(params));
      } else {
        alert(
          "Please agree to our terms and conditions to proceed with signing up"
        );
      }
    } else {
      alert("Fill all fields to signup");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: Colors.black, marginTop: 20 }}
            size={30}
          />
        </Pressable>
      </View>
      <View
        style={{
          width: "90%",
          alignItems: "flex-start",
          gap: 5,
        }}
      ></View>
      <View style={{ width: "90%", alignItems: "center", gap: 25 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: Colors.black }}>
          Register
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior="padding"
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-around",
          }}
          style={{
            backgroundColor: Colors.white,
            width: "100%",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              flex: 1,
              gap: 30,
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                width: "90%",
                alignItems: "center",
                gap: 22,
                marginTop: 30,
              }}
            >
              {/* Multi step */}
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 18,
                  }}
                >
                  <UnderlinedText
                    active={true}
                    handleEveryStep={handleEveryStep}
                    myVal={1}
                  >
                    Personal Info
                  </UnderlinedText>
                </View>
              </View>

              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 20,
                  fontWeight: "bold",
                  width: "90%",
                }}
              >
                Enter your details
              </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="First Name"
                placeholderTextColor={Colors.primaryColor}
                value={data.FirstName}
                onChangeText={(text) => setData({ ...data, FirstName: text })}
              />
              <TextInput
                style={styles.inputStyle}
                placeholder="Last Name"
                placeholderTextColor={Colors.primaryColor}
                value={data.LastName}
                onChangeText={(text) => setData({ ...data, LastName: text })}
              />

              <TextInput
                style={isEmailInvalid ? styles.invalidEmail : styles.inputStyle}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={Colors.primaryColor}
                value={data.Email}
                onChangeText={(text) =>
                  setData({ ...data, Email: text.trim() })
                }
              />
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor={Colors.primaryColor}
                secureTextEntry
                value={data.Password}
                onChangeText={(text) => setData({ ...data, Password: text })}
              />
              <TextInput
                style={styles.inputStyle}
                placeholder="Phone number"
                placeholderTextColor={Colors.primaryColor}
                value={data.PhoneNumber}
                keyboardType="number-pad"
                onChangeText={(text) => setData({ ...data, PhoneNumber: text })}
              />

              {/* ------ */}
            </View>

            <View style={{ width: "90%", alignItems: "center", marginTop: 5 }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleSignup}
              >
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
              <ActivityIndicator animating={isLoading} size="large" />
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  color={isAgreed ? "#042768" : "#83a0d6"}
                  style={{
                    borderWidth: isAgreed ? 3 : 1,
                    borderRadius: 6,
                    // transform: [{ scale: 1.1 }],
                  }}
                  value={isAgreed}
                  onValueChange={handleAgreementToggle}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 12,
                    textDecorationLine: "none",
                  }}
                >
                  By Sign up, you agree to our{" "}
                  <Text
                    style={{ color: Colors.primaryColor }}
                    onPress={() => navigation.navigate("Terms")}
                  >
                    Terms and Conditions.
                  </Text>
                </Text>
              </View>
            </View>

            <View style={{ marginVertical: 25 }}>
              <Toast ref={ToastRef} />
              <Toast ref={ErrorToastRef} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#b3b3b3",
                }}
              >
                Already have an account?{" "}
                <Text
                  style={{ color: Colors.primaryColor }}
                  onPress={() => navigation.navigate("Signin")}
                >
                  Sign in here
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 18,
    backgroundColor: Colors.primaryColor,
  },
  imgContainer: {
    width: 200,
    height: 200,
  },
  inputStyle: {
    backgroundColor: Colors.primaryLight,
    padding: 12,
    width: "90%",
    borderRadius: 12,
  },
  invalidEmail: {
    borderWidth: 2,
    borderColor: "#ff8080",

    backgroundColor: "#ffe6e6",
    padding: 12,
    width: "90%",
    borderRadius: 12,
  },
  underline: {
    marginTop: 5,
    borderColor: "#b5c6e6",
    borderWidth: 2,
    borderRadius: 20,
  },
  activeUnderline: {
    marginTop: 5,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.black,
  },
  dateStyle: {
    backgroundColor: Colors.primaryLight,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    gap: 10,
    position: "relative",
    justifyContent: "center",
  },
});
