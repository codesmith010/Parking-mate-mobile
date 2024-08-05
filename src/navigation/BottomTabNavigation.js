import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Address from "../screens/Address";
import Profile from "../screens/Profile";
import NeedCover from "../screens/NeedCover";
import CanCover from "../screens/CanCover";
// import AddPatient from "./screens/AddPatient";
// import Profile from "./screens/Profile";
import * as Animatable from "react-native-animatable";
import Icon, { Icons } from "../components/Icon";
import Colors from "../constants/Colors";
import {
  faCalendarDays,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "../screens/ChangePassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassList from "../screens/ClassList";
import DrawerNavigation from "./DrawerNavigation";
import { useRoute } from "@react-navigation/native";
import SearchClass from "../screens/SearchClass";

export const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.FontAwesomeIcon,
    icon: faHouse,
    component: Home,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "Address",
    label: "Address",
    type: Icons.FontAwesomeIcon,
    icon: faHouse,
    component: Address,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "Profile",
    label: "Profile",
    type: Icons.FontAwesomeIcon,
    icon: faUser,
    component: Profile,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "Class",
    label: "Class",
    type: Icons.FontAwesomeIcon,
    icon: faCalendarDays,
    component: Profile,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  // {
  //   route: "ChangePassword",
  //   label: "Change Password",
  //   type: Icons.FontAwesomeIcon,
  //   icon: faHouse,
  //   component: ChangePassword,
  //   color: Colors.white,
  //   alphaClr: Colors.primaryLite,
  // },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: item.color, borderRadius: 16 },
          ]}
        />
        <View style={styles.btn}>
          {/* <Icon
            type={item.type}
            name={item.icon}
            color={focused ? "#fff" : "blue"}
          /> */}
          <Icon
            name={item.icon}
            type={item.type}
            color={focused ? Colors.primaryDark : Colors.white}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: Colors.primaryDark,
                  paddingHorizontal: 8,
                }}
              >
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// const ClassStack = createNativeStackNavigator();

// function ClassStackScreen({ route }) {
//   const { screenName } = route.params;
//   return (
//     <ClassStack.Navigator
//       initialRouteName={screenName}
//       screenOptions={{r
//         headerShown: false,
//       }}
//     >
//       <ClassStack.Screen name="ClassList" component={ClassList} />
//       <ClassStack.Screen name="NeedCover" component={NeedCover} />
//       <ClassStack.Screen name="CanCover" component={CanCover} />
//       <ClassStack.Screen name="SearchClass" component={SearchClass} />
//     </ClassStack.Navigator>
//   );
// }

// const BottomTabNavigation = ({ route }) => {
//   const { screenName } = route.params;

//   return (
//     <Tab.Navigator
//       initialRouteName={screenName}
//       screenOptions={{
//         headerShown: false,

//         tabBarStyle: [
//           {
//             backgroundColor: Colors.primaryDark,
//           },
//         ],
//       }}
//     >
//       {TabArr.map((item, index) => {
//         return (
//           <Tab.Screen
//             key={index}
//             name={item.route}
//             component={item.component}
//             options={{
//               tabBarShowLabel: false,
//               tabBarButton: (props) => <TabButton {...props} item={item} />,
//             }}
//             initialParams={{ screenName: screenName }}
//           />
//         );
//       })}
//       {/* <Tab.Screen name="Class" component={ClassStackScreen} /> */}
//       {/* <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused, color, size }) => (
//             <Image
//               source={
//                 focused
//                   ? require("../../assets/home-blue.png")
//                   : require("../../assets/home.png")
//               }
//               style={{
//                 width: size,
//                 height: size,
//                 borderRadius: size,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="AddPatient"
//         component={Address}
//         options={{
//           tabBarLabel: "Add Patient",
//           tabBarLabelStyle: {
//             position: "relative",
//             bottom: 8,
//           },
//           tabBarIcon: ({ focused, color, size }) => (
//             <Image
//               source={
//                 focused
//                   ? require("../../assets/add-blue.png")
//                   : require("../../assets/add.png")
//               }
//               style={{
//                 position: "relative",
//                 bottom: 20,
//                 width: size * 2,
//                 height: size * 2,
//                 borderRadius: size,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ focused, color, size }) => (
//             <Image
//               source={
//                 focused
//                   ? require("../../assets/profile-blue.png")
//                   : require("../../assets/profile.png")
//               }
//               style={{
//                 width: size,
//                 height: size,
//                 borderRadius: size,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="NeedCover"
//         component={NeedCover}
//         options={{
//           tabBarLabel: "Need Cover",
//           tabBarIcon: ({ focused, color, size }) => (
//             <Image
//               source={
//                 focused
//                   ? require("../../assets/profile-blue.png")
//                   : require("../../assets/profile.png")
//               }
//               style={{
//                 width: size,
//                 height: size,
//                 borderRadius: size,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="CanCover"
//         component={CanCover}
//         options={{
//           tabBarLabel: "Can Cover",
//           tabBarIcon: ({ focused, color, size }) => (
//             <Image
//               source={
//                 focused
//                   ? require("../../assets/profile-blue.png")
//                   : require("../../assets/profile.png")
//               }
//               style={{
//                 width: size,
//                 height: size,
//                 borderRadius: size,
//               }}
//             />
//           ),
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
  },
});
