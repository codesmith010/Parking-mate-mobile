import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../../components/CustomDrawer";
// import Icon from "../components/Icon";
// import Colors from "../constants/Colors";
// import { NavigationContainer } from "@react-navigation/native";
import Icon, { Icons } from "../../components/Icon";
import Colors from "../../constants/Colors";
import {
  faFileSignature,
  faHouse,
  faListUl,
  faLock,
  faMoneyCheck,
  faRightFromBracket,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TermsCondition from "../../screens/TermsCondition";
import Logout from "../../screens/Logout";
import SHome from "../../screens/student/SHome";
import SClassList from "../../screens/student/SClassList";
import SProfile from "../../screens/student/SProfile";
import SSearchClass from "../../screens/student/SSearchClass";
import SChangePassword from "../../screens/student/SChangePassword";
import SViewResult from "../../screens/student/SViewResult";
import {
  getFocusedRouteNameFromRoute,
  useRoute,
} from "@react-navigation/native";
import SCalendarResult from "../../screens/student/SCalendarResult";
import SClassHistory from "../../screens/student/SClassHistory";
import SPaymentHistory from "../../screens/student/SPaymentHistory";
// import { StripeProvider } from "@stripe/stripe-react-native";
import Stripe from "../../screens/student/Stripe";

export const StudentTabArr = [
  {
    route: "SHome",
    label: "Home",
    type: Icons.FontAwesomeIcon,
    icon: faHouse,
    component: SHome,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "Profile",
    label: "My Profile",
    type: Icons.FontAwesomeIcon,
    icon: faUser,
    component: SProfile,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "ChangePassword",
    label: "Change Password",
    type: Icons.FontAwesomeIcon,
    icon: faLock,
    component: SChangePassword,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "SearchClass",
    label: "Search Classes",
    type: Icons.FontAwesomeIcon,
    icon: faSearch,
    component: ClassStackScreen,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  // {
  //   route: "MyPayments",
  //   label: "My Payments",
  //   type: Icons.FontAwesomeIcon,
  //   icon: faMoneyCheck,
  //   component: SPaymentHistory,
  //   color: Colors.white,
  //   alphaClr: Colors.primaryLite,
  // },
  {
    route: "ClassBooked",
    label: "Classes Booked",
    type: Icons.FontAwesomeIcon,
    icon: faListUl,
    component: SClassHistory,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "TermsCondition",
    label: "Terms and Conditions",
    type: Icons.FontAwesomeIcon,
    icon: faFileSignature,
    component: TermsCondition,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "Logout",
    label: "Logout",
    type: Icons.FontAwesomeIcon,
    icon: faRightFromBracket,
    component: Logout,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
];

const ClassStack = createNativeStackNavigator();

function ClassStackScreen({}) {
  // const { screenName } = route.params;
  // console.log("screenName: ", screenName);

  return (
    <ClassStack.Navigator
      backBehavior="history"
      initialRouteName={"SSearchClass"}
      screenOptions={{
        headerShown: true,
      }}
    >
      <ClassStack.Screen
        name="SSearchClass"
        component={SSearchClass}
        options={{ headerShown: false }}
      />
      <ClassStack.Screen
        name="ViewResults"
        component={SCalendarResult}
        options={{ headerTitle: "View Results" }}
      />
    </ClassStack.Navigator>
  );
}

// const StripeScreen = () => {
//   return (
//     <StripeProvider publishableKey="">
//       <Stripe />
//     </StripeProvider>
//   );
// };

// function PaymentStackScreen({}) {
//   // const { screenName } = route.params;
//   // console.log("screenName: ", screenName);

//   return (
//     <ClassStack.Navigator
//       backBehavior="history"
//       initialRouteName={"PaymentHistory"}
//       screenOptions={{
//         headerShown: true,
//       }}
//     >
//       <ClassStack.Screen
//         name="PaymentHistory"
//         component={SPaymentHistory}
//         unmountOnBlur={true}
//         options={{
//           headerShown: false,
//           unmountOnBlur: true,
//           unmountInactiveRoutes: true,
//         }}
//       />
//       <ClassStack.Screen name="Stripe" component={StripeScreen} />
//     </ClassStack.Navigator>
//   );
// }

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log("ROUTEE: ,", routeName);

  return (
    <Drawer.Navigator
      initialRouteName="MainTabDrawer"
      // screenOptions={{
      //   headerShown: false,
      // }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {StudentTabArr.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              headerShown: item.route === "SHome" ? false : true,
              headerTitle: item.label,
              drawerLabel: item.label,
              drawerIcon: ({ color }) => (
                <Icon name={item.icon} type={item.type} color={color} />
              ),
            }}
            initialParams={{ screenName: item.route }}
          />
        );
      })}
      {/* <Drawer.Screen
        name="MyPayments"
        component={PaymentStackScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ color }) => (
            <TouchableOpacity onPress={() => resetPaymentStack(navigation)}>
              <Icon name={item.icon} type={item.type} color={color} />
            </TouchableOpacity>
          ),

        }}
        


       
        // initialParams={{ screenName: "SearchClass" }}
      />
      {/* <Drawer.Screen name="Logout" component={BottomTabNavigation} />  */}
    </Drawer.Navigator>
  );
}
