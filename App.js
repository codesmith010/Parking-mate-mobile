import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  View,
} from "react-native";
import CodePush from "react-native-code-push";
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateLogin } from "./src/features/auth/authActions";
import { updateAuthentication } from "./src/features/auth/authSlice";
import Address from "./src/screens/Address";
import ForgetPassword from "./src/screens/ForgetPassword";
import ForgetPasswordOtp from "./src/screens/ForgetPasswordOtp";
import Otp from "./src/screens/Otp";
import ResetPassword from "./src/screens/ResetPassword";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import TermsCondition from "./src/screens/TermsCondition";
import Welcome from "./src/screens/Welcome";
import authToken from "./src/services/authToken";
import clearToken from "./src/services/clearToken";
import getToken from "./src/services/getToken";
import store from "./src/store/store";
import * as ExpoLinking from "expo-linking";
import VersionCheck from "react-native-version-check";
import DriverDrawerNavigation from "./src/navigation/driver/DriverDrawerNavigation";

const Stack = createNativeStackNavigator();

function AppWrapper() {
  const { authenticated, user, logoutUser, isLoading, error } = useSelector(
    (state) => state.user
  );
  // const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const prefix = ExpoLinking.createURL("/");
  const linking = {
    prefixes: [prefix],
  };

  const myToken = async () => {
    const mytoken = await getToken();
    return mytoken;
  };

  useEffect(() => {
    const fetchData = async () => {
      let myTokens = await myToken();
      // analyticsEvent("app_open");
      if (myTokens) {
        const checkAuth = await authToken(myTokens);

        if (checkAuth !== undefined) {
          // console.log("User is signed in");

          dispatch(updateAuthentication(true));
          dispatch(updateLogin());

          if (user) {
            setLoader(false);
          }
        } else {
          clearToken();
          dispatch(updateAuthentication(false));
          // console.log("User is not signed in");
          // DevSettings.reload();
          CodePush.restartApp();

          if (user) {
            setLoader(false);
          }
        }
      } else {
        setLoader(false);
      }
    };

    const checkAppVersion = async () => {
      try {
        const latestVersion =
          Platform.OS === "ios" &&
          (await fetch(
            `https://itunes.apple.com/in/lookup?bundleId=com.parkingmate.parkingmate`
          )
            .then((r) => r.json())
            .then((res) => {
              return res?.results[0]?.version;
            }));

        const currentVersion = VersionCheck.getCurrentVersion();

        if (latestVersion > currentVersion) {
          Alert.alert(
            "Update Required",
            "A new version of the app is available. Please update to continue using the app.",
            [
              {
                text: "Update Now",
                onPress: () => {
                  Linking.openURL(
                    Platform.OS === "ios" &&
                      VersionCheck.getAppStoreUrl({
                        appID: "com.parkingmate.parkingmate",
                      })
                  );
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          // App is up-to-date; proceed with the app
        }
      } catch (error) {
        // Handle error while checking app version
        // console.error("Error checking app version:", error);
      }
    };

    checkAppVersion();

    fetchData(); // Immediately invoke the async function
  }, [logoutUser]);

  if (!user && loader) {
    // clearToken();

    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={loader} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Welcome"}
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue", // Set the desired background color
          },
          headerTintColor: "white", // Set the desired text color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ animation: "fade" }}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="ForgetPasswordOTP"
          component={ForgetPasswordOtp}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Terms"
          component={TermsCondition}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="Home"
          component={DriverDrawerNavigation}
          options={{ animation: "fade", gestureEnabled: false }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ animation: "fade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
