import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ImageOverlay = ({ source, children }) => {
  return (
    <ImageBackground source={source} style={styles.backgroundImage}>
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      >
        {children}
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
  },
});

export default ImageOverlay;
