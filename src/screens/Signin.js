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
import CustomStatusLayout from "../components/CustomStatusLayout";
import Toast from "../components/Toast";
import Colors from "../constants/Colors";
import { login } from "../features/auth/authActions";
import saveToken from "../services/storeToken";
import { dispatch, useSelector } from "../store/store";
import { validateLogin } from "../utils/validation";

const Signin = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
    Driver: true,
    DriverHost: false,
  });

  const { user, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLoginData({
          Email: "",
          Password: "",
          Driver: true,
          DriverHost: false,
        }); //Empty the login fields
        saveToken("userToken", user.userToken);
      }, 2000);
      return;
    }
  }, [user]);

  const ToastRef = useRef(null);
  const showToast = (msg) => {
    if (ToastRef.current !== null) {
      ToastRef.current.toast(msg);
    }
  };
  const ErrorToastRef = useRef(null);
  const errorShowToast = (errorMessage) => {
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast(errorMessage);
    }
  };

  let debounceTimeout;

  // Handle signin
  const handleSignin = () => {
    if (loginData.Email.length !== 0 && loginData.Password.length !== 0) {
      // Clear any existing timeout
      clearTimeout(debounceTimeout);

      // Set a new timeout with a delay of 500 milliseconds
      debounceTimeout = setTimeout(() => {
        const payload = {
          ...loginData,
        };

        const errorMsg = validateLogin(payload);
        if (errorMsg) return errorShowToast(errorMsg);

        const successCallback = (response) => {
          showToast(response);
          return setTimeout(() => {
            navigation.navigate("Home");
          }, 500);
        };

        const errorCallback = (error) => {
          errorShowToast(error);
        };
        const params = {
          successCallback,
          errorCallback,
          payload,
        };
        dispatch(login(params));
      }, 400);
    } else {
      alert("Fill all fields to begin signin process");
    }
  };

  return (
    <CustomStatusLayout>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <View
              style={{
                // marginTop: 20,
                width: "90%",
                height: 240,
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
                // backgroundColor: "red",
              }}
            >
              {/* <Image
            style={{
              width: 70,
              height: 70,
              position: "absolute",
              top: 50,
              right: 3,
            }}
            source={require("../../assets/parkingmateWelcome.png")}
          /> */}

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
              <Text style={{ fontSize: 24 }}>Sign in to the </Text>
              <Text
                style={{
                  color: Colors.primaryColor,
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                Parking Mate
              </Text>
              {/* <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: Colors.grayLighter,
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
                onChangeText={(text) =>
                  setLoginData({ ...loginData, Email: text.trim() })
                }
                value={loginData.Email}
                textContentType="username"
              />
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry
                autoCompleteType="off"
                onChangeText={(text) =>
                  setLoginData({ ...loginData, Password: text })
                }
                value={loginData.Password}
                textContentType="password"
              />
            </View>

            <Pressable
              style={{
                marginVertical: 10,
                width: "85%",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: Colors.grayLighter,
                }}
              >
                Forget Password ?
              </Text>
            </Pressable>
            <View style={{ width: "90%", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleSignin}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? (
                    <ActivityIndicator animating={isLoading} />
                  ) : (
                    "Login"
                  )}
                </Text>
              </TouchableOpacity>
              <Toast ref={ToastRef} />
              <Toast ref={ErrorToastRef} />
            </View>
            <View style={{ marginVertical: 25 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: Colors.grayLighter,
                }}
              >
                Don't have an account?{" "}
                <Text
                  style={{ color: Colors.primaryColor }}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Register Here
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomStatusLayout>
  );
};

export default Signin;

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
    color: Colors.gray,
    backgroundColor: Colors.grayLight,
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
    color: Colors.black,
  },
});
