import {
  faCog,
  faFileSignature,
  faHistory,
  faHouse,
  faMoneyBill,
  faMoneyBillTransfer,
  faParking,
  faRightFromBracket,
  faSearchLocation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  getFocusedRouteNameFromRoute,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import CustomDrawer from "../../components/CustomDrawer";
import CustomMenuBar from "../../components/CustomMenuBar";
import Icon, { Icons } from "../../components/Icon";
import Colors from "../../constants/Colors";
import Logout from "../../screens/Logout";
import TermsCondition from "../../screens/TermsCondition";
import ArriveTime from "../../screens/driver/ArriveTime";
import Balance from "../../screens/driver/Balance";
import History from "../../screens/driver/History";
import LeaveTime from "../../screens/driver/LeaveTime";
import NearByLocation from "../../screens/driver/NearByLocation";
import ParkingHistory from "../../screens/driver/ParkingHistory";
import SHome from "../../screens/driver/SHome";
import SecureCheckout from "../../screens/driver/SecureCheckout";
import TopupBalance from "../../screens/driver/TopupBalance";
import AccessInstruction from "../../screens/driverHost/AccessInstruction";
import ElectricVehicles from "../../screens/driverHost/ElectricVehicles";
import HistoryList from "../../screens/driverHost/HistoryList";
import HostHistory from "../../screens/driverHost/HostHistory";
import IProfile from "../../screens/driverHost/IProfile";
import ISetting from "../../screens/driverHost/ISetting";
import SpaceAvailability from "../../screens/driverHost/SpaceAvailability";
import SpaceListing from "../../screens/driverHost/SpaceListing";
import SpaceListingSecond from "../../screens/driverHost/SpaceListingSecond";
import SpaceListingThird from "../../screens/driverHost/SpaceListingThird";
import SpaceLocation from "../../screens/driverHost/SpaceLocation";
import SpacePricing from "../../screens/driverHost/SpacePricing";
import RentOutSpace from "../../screens/driverHost/SpaceType";
import SubscriptionStatus from "../../screens/driverHost/SubscriptionStatus";
import Earning from "../../screens/driverHost/Earning";

export const DriverTabArr = [
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
    component: IProfile,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "DriverSpaceSearch",
    label: "Search Driveway Hosts",
    type: Icons.FontAwesomeIcon,
    icon: faSearchLocation,
    component: DriverStackScreen,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "ParkingHistory",
    label: "Parking history",
    type: Icons.FontAwesomeIcon,
    icon: faHistory,
    component: DriverHistoryStackScreen,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "DriverBalance",
    label: "Balance",
    type: Icons.FontAwesomeIcon,
    icon: faMoneyBill,
    component: DriverBalanceStackScreen,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "Setting",
    label: "Setting",
    type: Icons.FontAwesomeIcon,
    icon: faCog,
    component: SettingStackScreen,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },

  {
    route: "HistoryList",
    label: "Host History",
    type: Icons.FontAwesomeIcon,
    icon: faHistory,
    component: DriverHostHistoryStackScreen,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "Earning",
    label: "Earning",
    type: Icons.FontAwesomeIcon,
    icon: faMoneyBillTransfer,
    component: Earning,
    color: Colors.white,
    alphaClr: Colors.primaryLite,
  },
  {
    route: "RentSpace",
    label: "Rent your space",
    type: Icons.FontAwesomeIcon,
    icon: faParking,
    component: DriverHostStackScreen,
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

// Driver stack ( nested )
const DriverParkingSpaceStack = createNativeStackNavigator();
function DriverStackScreen({}) {
  return (
    <DriverParkingSpaceStack.Navigator
      backBehavior="history"
      initialRouteName={"ArriveTime"}
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <DriverParkingSpaceStack.Screen
        name="ArriveTime"
        component={ArriveTime}
        options={{
          headerTitle: "Arrive Time",
          headerLeft: (props) => <CustomMenuBar color={Colors.primaryColor} />,
        }}
      />

      <DriverParkingSpaceStack.Screen
        name="LeaveTime"
        component={LeaveTime}
        options={{ headerTitle: "Leave Time" }}
      />

      <DriverParkingSpaceStack.Screen
        name="History"
        component={History}
        options={{ headerTitle: "History" }}
      />
      <DriverParkingSpaceStack.Screen
        name="ParkingHistory"
        component={ParkingHistory}
        options={{ headerTitle: "Parking History" }}
      />

      <DriverParkingSpaceStack.Screen
        name="NearByLocation"
        component={NearByLocation}
        options={{ headerTitle: "NearByLocation", headerShown: false }}
      />

      <DriverParkingSpaceStack.Screen
        name="SecureCheckout"
        component={SecureCheckout}
        options={{ headerTitle: "Secure Checkout" }}
      />
    </DriverParkingSpaceStack.Navigator>
  );
}

// Driver balance stack ( nested )
const DriverBalanceStack = createNativeStackNavigator();
function DriverBalanceStackScreen({}) {
  return (
    <DriverBalanceStack.Navigator
      backBehavior="history"
      initialRouteName={"Balance"}
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <DriverBalanceStack.Screen
        name="Balance"
        component={Balance}
        options={{
          headerTitle: "Balance",
          headerLeft: (props) => <CustomMenuBar color={Colors.primaryColor} />,
        }}
      />

      <DriverBalanceStack.Screen
        name="TopupBalance"
        component={TopupBalance}
        options={{ headerTitle: "Topup Balance" }}
      />
    </DriverBalanceStack.Navigator>
  );
}

const DriverHistorySpaceStack = createNativeStackNavigator();
function DriverHistoryStackScreen({}) {
  return (
    <DriverHistorySpaceStack.Navigator
      backBehavior="history"
      initialRouteName={"HistoryList"}
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <DriverHistorySpaceStack.Screen
        name="HistoryList"
        component={ParkingHistory}
        options={{
          headerTitle: "History List",
          headerLeft: (props) => <CustomMenuBar color={Colors.primaryColor} />,
        }}
      />
      <DriverHistorySpaceStack.Screen
        name="History"
        component={History}
        options={{ headerTitle: "History" }}
      />
    </DriverHistorySpaceStack.Navigator>
  );
}

// Driver host stack ( nested )
const DriverHostParkingSpaceStack = createNativeStackNavigator();
function DriverHostStackScreen({}) {
  return (
    <DriverHostParkingSpaceStack.Navigator
      backBehavior="history"
      initialRouteName={"SpaceType"}
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <DriverHostParkingSpaceStack.Screen
        name="SpaceType"
        component={RentOutSpace}
        options={{
          headerTitle: "Type",
          headerLeft: (props) => <CustomMenuBar color={Colors.primaryColor} />,
        }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="ElectricVehicles"
        component={ElectricVehicles}
        options={{ headerTitle: "Electric Vehicle" }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="SpaceAvailability"
        component={SpaceAvailability}
        options={{ headerTitle: "Space Availability" }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="SpaceLocation"
        component={SpaceLocation}
        options={{ headerTitle: "Rent out your space" }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="AccessInstruction"
        component={AccessInstruction}
        options={{ headerTitle: "Access Instruction" }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="SpacePricing"
        component={SpacePricing}
        options={{ headerTitle: "Residential parking pricing" }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="SpaceListing"
        component={SpaceListing}
        options={{ headerTitle: "Space Listing" }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="SpaceListingSecond"
        component={SpaceListingSecond}
        options={{ headerTitle: "Space Listing Second" }}
      />
      <DriverHostParkingSpaceStack.Screen
        name="SpaceListingThird"
        component={SpaceListingThird}
        options={{ headerTitle: "Space Listing Third" }}
      />
    </DriverHostParkingSpaceStack.Navigator>
  );
}

const DriverHostHistorySpaceStack = createNativeStackNavigator();
function DriverHostHistoryStackScreen({}) {
  return (
    <DriverHostHistorySpaceStack.Navigator
      backBehavior="history"
      initialRouteName={"DriverHistoryList"}
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <DriverHostHistorySpaceStack.Screen
        name="DriverHistoryList"
        component={HistoryList}
        options={{
          headerTitle: "Host History List",
          headerLeft: (props) => <CustomMenuBar color={Colors.primaryColor} />,
        }}
      />
      <DriverHostHistorySpaceStack.Screen
        name="HostHistory"
        component={HostHistory}
        options={{ headerTitle: "Host History" }}
      />
    </DriverHostHistorySpaceStack.Navigator>
  );
}

// setting stack nested
const SettingStack = createNativeStackNavigator();
function SettingStackScreen({}) {
  return (
    <SettingStack.Navigator
      backBehavior="history"
      initialRouteName={"ISettings"}
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
      }}
    >
      <SettingStack.Screen
        name="ISettings"
        component={ISetting}
        options={{
          headerTitle: "Setting",
          headerLeft: (props) => <CustomMenuBar color={Colors.primaryColor} />,
        }}
      />
      <SettingStack.Screen
        name="SubscriptionStatus"
        component={SubscriptionStatus}
        options={{ headerTitle: "Subscription" }}
      />
    </SettingStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
export default function DriverDrawerNavigation() {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);

  return (
    <Drawer.Navigator
      initialRouteName="MainTabDrawer"
      screenOptions={{
        drawerActiveTintColor: Colors.primaryColor,
        swipeEnabled: false,
        edgeWidth: 0,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {DriverTabArr.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.route}
            component={item.component}
            screenOptions={{ swipeEnabled: false }}
            options={{
              headerShown:
                item.route === "SHome" ||
                item.route === "ParkingHistory" ||
                item.route === "DriverSpaceSearch" ||
                item.route === "RentSpace" ||
                item.route === "HistoryList" ||
                item.route === "DriverBalance" ||
                item.route === "Setting"
                  ? false
                  : true,
              headerTitle: item.label,
              drawerItemStyle:
                item.route === "DriverSpaceSearch" ? { display: "none" } : null,
              drawerLabel: item.label,
              drawerIcon: ({ color }) => (
                <Icon name={item.icon} type={item.type} color={color} />
              ),
            }}
            initialParams={{ screenName: item.route }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
