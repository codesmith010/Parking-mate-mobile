import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";
import SpaceAvailability2 from "./SpaceAvailability2";

const SpaceAvailability = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <View style={styles.mainImage}>
          <Image
            source={require("../../../assets/RentOutSpace.png")}
            style={styles.mainImageStyle}
          />
        </View>
        {/* <SafeAreaView /> */}
        <Text style={styles.text}>What type of bookings would you prefer?</Text>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("BookingType", "all");
          }}
          style={[
            styles.div2,
            DrivingHostData?.BookingType?.all ? styles.selectedOption : null, // Apply selected option
            {
              display: DrivingHostData?.BookingType?.all ? "flex" : "none",
            },
          ]}
        >
          <Text style={styles.text2}>All bookings (maximum earnings)</Text>
          <Text style={styles.text3}>
            Accept both monthly and standard (hourly / daily) bookings.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("BookingType", "standard");
          }}
          style={[
            styles.div2,
            DrivingHostData?.BookingType?.standard
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.BookingType?.standard ? "flex" : "none",
            },
          ]}
        >
          <Text style={styles.text2}>Standard bookings - hourly / daily</Text>
          <Text style={styles.text3}>
            Drivers will be able to book your parking space for hours, days or
            weeks.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("BookingType", "monthly");
          }}
          style={[
            styles.div2,
            DrivingHostData?.BookingType?.monthly
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.BookingType?.monthly ? "flex" : "none",
            },
          ]}
        >
          <Text style={styles.text2}>Monthly bookings</Text>
          <Text style={styles.text3}>
            Accepting monthly rolling bookings means that a single driver will
            use this space. You will receive a regular monthly income.
          </Text>
        </TouchableOpacity>
      </View>
      <SpaceAvailability2 navigation={navigation} />
    </ScrollView>
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

  text2: {
    fontSize: 16,
    fontWeight: "500",
  },

  text3: {
    fontSize: 16,
    fontWeight: "100",
  },

  div2: {
    borderWidth: 0.3,
    marginVertical: 10,
    padding: 16,
    borderRadius: 10,
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
  selectedOption: {
    borderWidth: 2,
    borderColor: Colors.primaryColor, // Change border color to primary color for selected option
  },
});

export default SpaceAvailability;
