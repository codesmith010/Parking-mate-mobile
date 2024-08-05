import { useEffect } from "react";
import clearToken from "../services/clearToken";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { Alert } from "react-native";

const Logout = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      navigation.replace("Splash");
      dispatch(logoutUser());
      clearToken();
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(
        "Logout Failed",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  useEffect(() => {
    handleLogout();

    // Use navigation.replace to prevent the user from going back to this screen
    // navigation.replace("Signin");
  }, [user]); // Empty dependency array to run the effect once after initial render

  // Render null or a loading indicator while the logout process is in progress
  return null;
};

export default Logout;
