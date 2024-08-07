import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const CustomDrawer = (props) => {
  const { user, profilePicture, isLoading, error } = useSelector(
    (state) => state.user
  );

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
            paddingVertical: 6,
            paddingHorizontal: 10,
            gap: 20,
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
                "https://www.facebook.com/profile.php?id=61560005474976"
              )
            }
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/facebooklogo.png")}
            />
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() => handleLinks("https://www.instagram.com/parkingmate")}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/instagramlogo.png")}
            />
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() => handleLinks("https://www.tiktok.com/@parkingmate")}
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
