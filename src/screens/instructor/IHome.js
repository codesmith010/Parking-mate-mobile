import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  LogBox,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomStatusBar from "../../components/CustomStatusBar";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import BannerAd from "../../components/BannerAd";
import { setAnalyticsUser } from "../../utils/analytics";

const IHome = ({ navigation }) => {
  const { user, isLoading, error } = useSelector((state) => state.user);
  LogBox.ignoreLogs([
    "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property.",
  ]);

  setAnalyticsUser(user._id);

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="#15326B" />
      <View style={styles.container}>
        {/* Background Image */}
        <Image
          source={require("../../../assets/home-bg.png")}
          style={{
            position: "absolute", // Position the background image absolutely
            top: 0,
            width: "100%",
            // height: "100%",
            resizeMode: "cover", // Adjust the resizeMode as needed
          }}
        />
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 4,
            width: "90%",
            marginTop: 10,
            alignItems: "center",
            // backgroundColor: "#15326B",
          }}
        >
          <Pressable
            onPress={() =>
              // navigation.navigate("Class", { screen: "NeedCover" })
              navigation.toggleDrawer()
            }
            style={{ backgroundColor: "#15326B", padding: 4, borderRadius: 6 }}
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{
                color: "#fff",
              }}
              size={38}
            />
          </Pressable>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 26,
              fontWeight: "bold",
              color: Colors.primaryDark,
            }}
          >
            Menu
          </Text>
        </View>
        <View style={{ width: "90%", marginTop: 10 }}>
          <Image
            style={styles.imgContainer}
            source={require("../../../assets/512-fithubs.png")}
          />
          <Text style={{ paddingLeft: 10, fontSize: 36 }}>Welcome back</Text>
          <Text style={{ paddingLeft: 10, fontSize: 48, fontWeight: "bold" }}>
            {user.firstName}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#15326B",
            height: 37,
            width: "85%",
            borderRadius: 20,
            marginTop: 10,
            justifyContent: "center",
            shadowColor: "rgba(0, 0, 0, 0.78)",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 2,
          }}
        >
          <Text
            style={{
              paddingLeft: 20,
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Select Option
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
          style={{
            width: "100%",
            marginTop: 10,
            // backgroundColor: "red",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EAF1FF",
              paddingBottom: 5,
            }}
            onPress={() => navigation.navigate("Class", { screen: "CanCover" })}
          >
            <Image
              source={require("../../../assets/CanCover.jpeg")}
              style={{ width: 353, height: 145, borderRadius: 12 }}
            />
            <Text style={styles.textStyle}>I Can Cover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EAF1FF",
              paddingBottom: 5,
            }}
            onPress={() =>
              navigation.navigate("Class", { screen: "NeedCover" })
            }
          >
            <Image
              source={require("../../../assets/NeedCover.jpeg")}
              style={{ width: 353, height: 145, borderRadius: 12 }}
            />
            <Text style={styles.textStyle}>I Need Cover</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <BannerAd />
    </SafeAreaProvider>
  );
};

export default IHome;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 18,
    backgroundColor: "#fff",
  },
  textStyle: {
    // backgroundColor: "red",
    width: "85%",
    textAlign: "left",
    fontSize: 21,
    fontWeight: "600",
    letterSpacing: 1.1,
    color: Colors.black,
  },
  imgContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 80,
    height: 80,
  },
});
