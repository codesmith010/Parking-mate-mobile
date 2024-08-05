import {
  Image,
  ImageBackground,
  Linking,
  Text,
  View,
  Pressable,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import {
  faFacebook,
  faPersonRifle,
  faPray,
} from "@fortawesome/free-solid-svg-icons";
import Icon, { Icons } from "./Icon";
import { useSelector } from "react-redux";

const CustomDrawer = (props) => {
  const { user, profilePicture, isLoading, error } = useSelector(
    (state) => state.user
  );

  console.log("USER::: ", user);

  // handle Instagram Link
  const handleLinks = (url) => {
    const webURL = url;
    Linking.openURL(webURL);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.primaryColor }}
      >
        <ImageBackground
          source={require("../../assets/backgrounddrawer2.jpg")}
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Image
            source={{ uri: profilePicture }}
            style={{ height: 80, width: 80, borderRadius: 40 }}
            defaultSource={require("../../assets/profile.png")}
          />
          <View style={{ gap: 4 }}>
            <Text
              style={{ color: Colors.white, fontWeight: 700, fontSize: 14 }}
            >
              {user.firstName + " " + user.lastName}
            </Text>
            <Text style={{ color: Colors.white, fontSize: 10 }}>
              {user.email}
            </Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          gap: 8,
          padding: 20,
          paddingVertical: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: Colors.primaryDark,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          Follow us on:
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
            justifyContent: "center",
            // flexWrap: "wrap",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() =>
              handleLinks(
                "https://www.facebook.com/profile.php?id=61551999556493"
              )
            }
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/facebooklogo.png")}
            />
            {/* <Text style={{ color: "black", fontWeight: 700 }}>Tiktok</Text> */}
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() =>
              handleLinks("https://www.instagram.com/fithubs.app/")
            }
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/instagramlogo.png")}
            />
            {/* <Text style={{ color: "#f209ae", fontWeight: 700 }}>Instagram</Text> */}
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() => handleLinks("https://www.tiktok.com/@fithubs.app")}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/tiktok.png")}
            />
            {/* <Text style={{ color: "black", fontWeight: 700 }}>Tiktok</Text> */}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
