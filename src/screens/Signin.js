import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authActions";
import Toast from "../components/Toast";
import Checkbox from "expo-checkbox";
import saveToken from "../services/storeToken";
import getToken from "../services/getToken";
import CustomStatusLayout from "../components/CustomStatusLayout";
import Colors from "../constants/Colors";

const Signin = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
    Student: true,
    Instructor: false,
  });
  const dispatch = useDispatch();

  const { user, isLoading, error } = useSelector((state) => state.user);
  console.log({ user, isLoading, error });
  console.log("login: ", loginData);

  useEffect(() => {
    if (error) {
      errorShowToast();
      return;
    }
    if (user) {
      showToast();
      setTimeout(() => {
        setLoginData({
          Email: "",
          Password: "",
          Student: true,
          Instructor: false,
        }); //Empty the login fields
        saveToken("userToken", user.userToken);
        navigation.navigate("Home");
      }, 2000);
      return;
    }
  }, [user, error]);

  const ToastRef = useRef(null);
  const showToast = () => {
    if (ToastRef.current !== null) {
      ToastRef.current.toast();
    }
  };
  const ErrorToastRef = useRef(null);
  const errorShowToast = () => {
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast();
    }
  };

  console.log("USE SELECTOR: ", user);

  const handleIsStudent = () => {
    // setIsStudent(true);
    // setIsInstructor(false);
    setLoginData({ ...loginData, Student: true, Instructor: false });
  };

  const handleIsInstructor = () => {
    setLoginData({ ...loginData, Instructor: true, Student: false });
  };

  // // Handle signin
  // const handleSignin = () => {
  //   if (loginData.Email.length !== 0 && loginData.Password.length !== 0) {
  //     dispatch(login(loginData));
  //   } else {
  //     alert("Fill all fields to begin signin process");
  //   }
  // };
  // Define a variable to hold the timeout ID
  let debounceTimeout;

  // Handle signin
  const handleSignin = () => {
    if (loginData.Email.length !== 0 && loginData.Password.length !== 0) {
      // Clear any existing timeout
      clearTimeout(debounceTimeout);

      // Set a new timeout with a delay of 500 milliseconds
      debounceTimeout = setTimeout(() => {
        console.log("LOGIN INSIDE");
        dispatch(login(loginData));
      }, 400);
    } else {
      alert("Fill all fields to begin signin process");
    }
  };

  return (
    <CustomStatusLayout>
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
            onChangeText={(text) => setLoginData({ ...loginData, Email: text })}
            value={loginData.Email}
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
          />
        </View>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "normal" }}>Are you?</Text>

          <View
            style={{
              flexDirection: "row",
              gap: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                color={
                  loginData.Student ? Colors.primaryColor : Colors.primaryNormal
                }
                style={{
                  borderWidth: loginData.Student ? 3 : 1,
                  borderRadius: 12,
                }}
                value={loginData.Student}
                onValueChange={handleIsStudent}
              />
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: "none",
                }}
              >
                Student
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                color={
                  loginData.Instructor
                    ? Colors.primaryColor
                    : Colors.primaryNormal
                }
                style={{
                  borderWidth: loginData.Instructor ? 3 : 1,
                  borderRadius: 12,
                }}
                value={loginData.Instructor}
                onValueChange={handleIsInstructor}
              />
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: "none",
                }}
              >
                Instructor
              </Text>
            </View>
          </View>
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
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSignin}>
            <Text style={styles.buttonText}>
              {isLoading ? (
                <ActivityIndicator animating={isLoading} />
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>
          <Toast ref={ToastRef} message="Successful Sign In" />
          <Toast ref={ErrorToastRef} message={error} />
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
