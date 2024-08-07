import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const ListingDashboard = ({ navigation }) => {
  const [booking, setBooking] = useState({
    all: true,
    standard: true,
    monthly: true,
  });

  const handleSelectButton = (selectedButton) => {
    setBooking({
      ...booking,
      all: selectedButton === "all",
      standard: selectedButton === "standard",
      monthly: selectedButton === "monthly",
    });
  };

  const handleNextScreen = () => {
    navigation.navigate("SpaceAvailabilitySecond"); // Navigate to the 'test01' screen
  };
  return (
    <ScrollView>
      <View style={styles.mainView}>
        <Text style={styles.text}>My Listings Dashboard</Text>

        <View style={styles.textDiv}>
          <Text style={styles.text1}>Spaces</Text>
          <Text style={styles.text2}>Add a space</Text>
        </View>

        <View style={styles.outerDiv}>
          <View style={styles.innerDiv}>
            <TouchableOpacity style={styles.touch}>
              <Image
                source={require("../../../assets/profile-blue.png")}
                style={styles.mainImageStyle}
              />
              <Text>Add Photos</Text>
            </TouchableOpacity>

            <Text style={{ textAlign: "center" }}>
              Listings with photos are most likely to make money.
            </Text>
          </View>

          <View style={styles.div2}>
            <Text>Parking on NE 1st Ave</Text>
            <Text>Pending Review</Text>
          </View>

          <View style={styles.div3}>
            <Text style={styles.text1}>Rating</Text>
            <Text>Not yet rated</Text>
          </View>

          <View style={styles.div3}>
            <Text style={styles.text1}>Availbility</Text>
            <View style={styles.innerLine}>
              <Text>Every day</Text>
              <Text>Edit</Text>
            </View>
          </View>

          <View style={styles.div3}>
            <Text style={styles.text1}>Availbility</Text>
            <View style={styles.innerLine}>
              <Text>Every day</Text>
              <Text>Edit</Text>
            </View>
          </View>

          <View style={styles.div3}>
            <Text style={styles.text1}>EV Charger</Text>
            <Text>Add</Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.touch2}>
              <Text style={{ textAlign: "center", color: Colors.primaryDark }}>
                Preview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 20,
                width: "45%",
                borderRadius: 5,
                borderWidth: 0.3,
                backgroundColor: Colors.primaryColor,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "700",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 30,
  },

  mainImage: {
    alignItems: "center",
  },

  mainImageStyle: {
    height: 220,
    width: 220,
    borderRadius: 40,
  },

  div1: {
    marginVertical: 60,
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
  },

  text1: {
    fontSize: 18,
    fontWeight: "600",
  },

  text2: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryColor,
  },

  textDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  div2: {
    backgroundColor: Colors.primaryColor,
    gap: 10,
    padding: 10,
    paddingVertical: 15,
  },

  div3: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  innerLine: {
    flexDirection: "row",
    gap: 10,
  },

  buttons: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },

  touch2: {
    padding: 20,
    width: "45%",
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: Colors.primaryColor,
  },

  outerDiv: {
    borderWidth: 0.3,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  innerDiv: {
    paddingVertical: 50,
    gap: 10,
  },

  touch: {
    marginHorizontal: "24%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.3,
    borderRadius: 10,
    height: 70,
  },

  mainImageStyle: {
    height: 20,
    width: 20,
    borderRadius: 40,
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

export default ListingDashboard;
