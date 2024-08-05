import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { InstructorTabArr } from "./BottomTabNavigation";
import CustomDrawer from "../../components/CustomDrawer";
// import Icon from "../components/Icon";
// import Colors from "../constants/Colors";
// import { NavigationContainer } from "@react-navigation/native";
import Icon, { Icons } from "../../components/Icon";
import Colors from "../../constants/Colors";
import {
  faCalendarDays,
  faCalendarPlus,
  faCog,
  faFileSignature,
  faHouse,
  faListUl,
  faLock,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import IHome from "../../screens/instructor/IHome";
import IProfile from "../../screens/instructor/IProfile";
import INeedCover from "../../screens/instructor/INeedCover";
import IClassList from "../../screens/instructor/IClassList";
import ISearchClass from "../../screens/instructor/ISearchClass";
import ICanCover from "../../screens/instructor/ICanCover";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TermsCondition from "../../screens/TermsCondition";
import IChangePassword from "../../screens/instructor/IChangePassword";
import IAdvertiseClass from "../../screens/instructor/IAdvertiseClass";
import ICalendar from "../../screens/instructor/ICalendar";
import Logout from "../../screens/Logout";
import SHome from "../../screens/student/SHome";
import SClassList from "../../screens/student/SClassList";
import SProfile from "../../screens/student/SProfile";
import SSearchClass from "../../screens/student/SSearchClass";
import SChangePassword from "../../screens/student/SChangePassword";
import MyExpandableCalendar from "../../screens/instructor/MyExpandableCalendar";
import MyCalendar from "../../screens/instructor/MyCalendar";
import ApplePayScreen from "../../screens/instructor/MyApplePay";
import ISetting from "../../screens/instructor/ISetting";
import MultipleImageUpload from "../../components/MultipleImageUpload";
import { useNavigation } from "@react-navigation/native";

export const InstructorTabArr = [
  {
    route: "IHome",
    label: "Home",
    type: Icons.FontAwesomeIcon,
    icon: faHouse,
    component: IHome,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "Profile",
    label: "My Profile",
    type: Icons.FontAwesomeIcon,
    icon: faUser,
    component: IProfile,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "ChangePassword",
    label: "Change Password",
    type: Icons.FontAwesomeIcon,
    icon: faLock,
    component: IChangePassword,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "AdvertiseClass",
    label: "Advertise A New Class",
    type: Icons.FontAwesomeIcon,
    icon: faCalendarPlus,
    component: IAdvertiseClass,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "Class",
    label: "List Of Your Classes",
    type: Icons.FontAwesomeIcon,
    icon: faListUl,
    component: ClassStackScreen,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "Calendar",
    label: "Calendar of bookings",
    type: Icons.FontAwesomeIcon,
    icon: faCalendarDays,
    component: MyCalendar,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "ISettings",
    label: "Setting",
    type: Icons.FontAwesomeIcon,
    icon: faCog,
    component: ISetting,
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

function ClassStackScreen({ route }) {
  const { screenName } = route.params;
  console.log("screenName: ", screenName);

  return (
    <ClassStack.Navigator
      initialRouteName={screenName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ClassStack.Screen name="ClassList" component={IClassList} />
      <ClassStack.Screen name="NeedCover" component={INeedCover} />
      <ClassStack.Screen name="CanCover" component={ICanCover} />
      <ClassStack.Screen name="SearchClass" component={ISearchClass} />
    </ClassStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function IDrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="MainTabDrawer"
      // screenOptions={{
      //   headerShown: false,
      // }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {InstructorTabArr.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              headerShown: item.route === "IHome" ? false : true,
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
        name="SearchClass"
        component={BottomTabNavigation}
        initialParams={{ screenName: "SearchClass" }}
      />
      <Drawer.Screen name="Logout" component={BottomTabNavigation} /> */}
    </Drawer.Navigator>
  );
}
