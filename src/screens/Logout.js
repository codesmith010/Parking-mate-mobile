import { useEffect } from "react";
import { Alert } from "react-native";

import { logoutUser } from "../features/auth/authSlice";
import { resetBalance } from "../features/balance/balanceSlice";
import { resetAllDriverData } from "../features/driver/driverSlice";
import { resetAllDrivingHostData } from "../features/drivingHost/drivingHostSlice";
import { resetEarning } from "../features/earning/earningSlice";
import clearToken from "../services/clearToken";
import { dispatch, useSelector } from "../store/store";

const Logout = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      dispatch(resetAllDriverData());
      dispatch(resetAllDrivingHostData());
      dispatch(resetBalance());
      dispatch(resetEarning());
      dispatch(logoutUser());
      navigation.replace("Welcome");

      clearToken();
    } catch (error) {
      // console.error("Logout error:", error);
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
