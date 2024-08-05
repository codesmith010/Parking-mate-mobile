// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import Signup from "./src/screens/Signup";
import Signin from "./src/screens/Signin";
import Welcome from "./src/screens/Welcome";

// export default function App() {
//   return (
//     <View>
//       {/* <Signup /> */}
//       {/* <Signin /> */}
//       <Welcome />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StatusBar, DevSettings } from "react-native";
import AuthContext from "./AuthContext";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/store/store";
// import IHome from "./src/screens/instructor/Home";
// import SHome from "./src/screens/student/Home";
import authToken from "./src/services/authToken";
import {
  logoutUser,
  updateAuthentication,
} from "./src/features/auth/authSlice";
import { updateLogin } from "./src/features/auth/authActions";
import getToken from "./src/services/getToken";
import Otp from "./src/screens/Otp";
import Splash from "./src/screens/Splash";
import Address from "./src/screens/Address";
// import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import clearToken from "./src/services/clearToken";
import IDrawerNavigation from "./src/navigation/instructor/IDrawerNavigation";
import SDrawerNavigation from "./src/navigation/student/SDrawerNavigation";
// import Stripe from "./src/screens/student/Stripe";
// import ApplePayScreen from "./src/screens/instructor/MyApplePay.js";
// import { StripeProvider } from "@stripe/stripe-react-native";
import CanCoverResult from "./src/screens/instructor/CanCoverResult";
import CodePush from "react-native-code-push";
import ViewStudents from "./src/screens/instructor/ViewStudents";
import ForgetPassword from "./src/screens/ForgetPassword";
import ForgetPasswordOtp from "./src/screens/ForgetPasswordOtp";
import ResetPassword from "./src/screens/ResetPassword";
import TermsCondition from "./src/screens/TermsCondition";
import { analyticsEvent } from "./src/utils/analytics";

const Stack = createNativeStackNavigator();

// const MyStripe = () => {
//   return (
//     <StripeProvider publishableKey="">
//       <Stripe />
//     </StripeProvider>
//   );
// };
// const MyApplePay = () => {
//   return (
//     <StripeProvider
//       merchantIdentifier="merchant.com.fit-hubs"
//       publishableKey="pk_test_51NuHfFLbl7KYkxefx1mESwYpyS9l2WxOgRmN1zWxWckGAILAMC103SiZKEYjjaEuKL6vAITjnQaoGZVQa6sAhg2o00fI6brL5h"
//     >
//       <ApplePayScreen />
//     </StripeProvider>
//   );
// };

function AppWrapper() {
  const { authenticated, user, logoutUser, isLoading, error } = useSelector(
    (state) => state.user
  );
  // const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const myToken = async () => {
    const mytoken = await getToken();
    console.log(">><<<>> 0000000000000: ", mytoken);
    return mytoken;
  };

  console.log("okay");
  console.log({ authenticated, user, isLoading, error });

  useEffect(() => {
    const fetchData = async () => {
      let myTokens = await myToken();
      analyticsEvent("app_open");
      if (myTokens) {
        const checkAuth = await authToken(myTokens);
        console.log("checkAUth: ", checkAuth);
        console.log("myTokens: ", myTokens);

        if (checkAuth !== undefined) {
          console.log("User is signed in");

          // setUser(user.uid);  // <-- You may want to remove this comment if it's not needed
          dispatch(updateAuthentication(true));
          dispatch(updateLogin(myTokens));
          console.log("user is: ", user);
          if (user) {
            setLoader(false);
          }
        } else {
          clearToken();
          dispatch(updateAuthentication(false));
          console.log("User is not signed in");
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

    fetchData(); // Immediately invoke the async function
  }, [logoutUser]);

  // function signin(newUser, callback) {
  //   setUser(newUser);
  //   callback();
  // }

  // function signout() {
  //   setUser(null);
  // }

  // let value = { user, signin, signout }
  console.log("user: APP.JS", user);
  console.log("loader: APP.JS", loader);
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
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={user?.length > 0 ? "BottomTab" : "Splash"}
        initialRouteName={user ? "Home" : "Splash"}
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
          name="Splash"
          component={Splash}
          options={{ animation: "fade" }}
        />
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
          component={
            user?.role === "instructor" ? IDrawerNavigation : SDrawerNavigation
          }
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ animation: "fade" }}
        />
        <Stack.Screen name="ViewStudents" component={ViewStudents} />
        <Stack.Screen name="SearchCoverResult" component={CanCoverResult} />
        {/* <Stack.Screen name="Stripe" component={MyStripe} /> */}
        {/* <Stack.Screen name="ApplePay" component={MyApplePay} /> */}

        {/* <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
          <Stack.Screen name="PatientDetails" component={PatientDetails} /> */}
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
