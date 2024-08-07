import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import CustomStatusBar from "../../components/CustomStatusBar";
import Icon from "../../components/Icon";
import Toast from "../../components/Toast";
import Colors from "../../constants/Colors";
import { updatePassword } from "../../features/auth/authActions";

const SChangePassword = () => {
  const { user, passwordChanged, isLoading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [changePass, setChangePass] = useState({
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    token: user.userToken,
  });

  const ToastRef = useRef(null);
  const showToast = () => {
    if (ToastRef.current !== null) {
      ToastRef.current.toast(); // Show success toast
    }
  };
  const ErrorToastRef = useRef(null);
  const errorShowToast = () => {
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast(); // Show error toast
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

  const updateNewPassword = () => {
    if (changePass.newPassword === changePass.confirmNewPassword) {
      dispatch(updatePassword(changePass));
    } else {
      errorShowToast(); // Show error toast when passwords don't match
    }
  };

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.primaryDark} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.changePasswordContainer}>
            <View style={{ gap: 2 }}>
              <View>
                <Text style={styles.textStyle}>Change </Text>
                <Text style={styles.textStyle}>Password </Text>
              </View>
            </View>
            <View style={{ gap: 10 }}>
              <View style={styles.inputContainerStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Current Password"
                  secureTextEntry
                  value={changePass.currentPassword}
                  onChangeText={(text) =>
                    setChangePass({ ...changePass, currentPassword: text })
                  }
                />
                <Icon
                  name={faEye}
                  type={FontAwesomeIcon}
                  color={Colors.primaryColor}
                />
              </View>
              <View style={styles.inputContainerStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="New Password"
                  value={changePass.newPassword}
                  onChangeText={(text) =>
                    setChangePass({ ...changePass, newPassword: text })
                  }
                />
                <Icon
                  name={faEye}
                  type={FontAwesomeIcon}
                  color={Colors.primaryColor}
                />
              </View>
              <View style={styles.inputContainerStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Retype Password"
                  value={changePass.confirmNewPassword}
                  onChangeText={(text) =>
                    setChangePass({
                      ...changePass,
                      confirmNewPassword: text,
                    })
                  }
                />
                <Icon
                  name={faEye}
                  type={FontAwesomeIcon}
                  color={Colors.primaryColor}
                />
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={updateNewPassword}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? (
                    <ActivityIndicator animating={isLoading} size="small" />
                  ) : (
                    "Change Password"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Toast ref={ToastRef} message="Password Changed" />
          <Toast ref={ErrorToastRef} message="Passwords don't match" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default SChangePassword;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  changePasswordContainer: {
    height: "80%",
    width: "85%",
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryDark,
    textAlign: "left",
  },
  inputContainerStyle: {
    backgroundColor: Colors.primaryAlpha,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 0.3,
    borderColor: Colors.white,
  },
  inputStyle: {
    color: Colors.black,
    padding: 12,
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: Colors.primaryDark,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
  },
});
