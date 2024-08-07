import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

const Notify = ({ navigation }) => {
  const [hasGatedEntry, setHasGatedEntry] = useState(null); // State for gated entry

  const handleNextScreen = () => {
    navigation.navigate("SpacePricing"); // Navigate to the 'test01' screen
  };

  return (
    <View style={styles.mainView}>
      {/* <SafeAreaView /> */}

      <View style={styles.mainImage}>
        <Image
          source={require("../../../assets/RentOutSpace.png")}
          style={styles.mainImageStyle}
        />
      </View>

      <View>
        <Text style={styles.text}>Get as much time as you need.</Text>
        <Text style={styles.text2}>
          Enjoy a stress free day out with easy reminders and quick parking
          extensions.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: Colors.primaryColor,
          paddingVertical: 12,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            color: Colors.primaryDark,
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Maybe later
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleNextScreen}>
        <Text style={styles.buttonText}>Notify me about my bookings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 20,
  },
  mainImage: {
    alignItems: "center",
  },

  mainImageStyle: {
    height: 300,
    width: 300,
    borderRadius: 40,
  },

  text: {
    fontSize: 38,
    fontWeight: "400",
    marginVertical: 10,
  },

  text2: {
    fontSize: 19,
    fontWeight: "500",
    marginVertical: 10,
  },

  div2: {
    borderWidth: 0.3,
    marginVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    paddingVertical: 15,
    width: "47%",
  },

  div3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Notify;
