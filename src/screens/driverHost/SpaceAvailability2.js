import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { dispatch, useSelector } from "../../store/store";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";

const SpaceAvailability2 = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  const handleValidationAndNavigation = () => {
    const { BookingType, ParkingAvailability } = DrivingHostData;

    const validateField = (field) =>
      Object.values(field).filter((value) => value === true).length === 1;

    if (!validateField(BookingType) || !validateField(ParkingAvailability)) {
      alert(
        "Please select exactly one option for Booking Type & Parking Availability "
      );
      return;
    }

    navigation.navigate("SpaceLocation");
  };
  return (
    <ScrollView>
      <View style={styles.mainView}>
        <Text style={styles.text}>What availability do you offer?</Text>

        <Text style={styles.text4}>You can change this at any time.</Text>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("ParkingAvailability", "alwaysAvailable");
          }}
          style={[
            styles.div2,
            DrivingHostData?.ParkingAvailability?.alwaysAvailable
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.ParkingAvailability?.alwaysAvailable
                ? "flex"
                : "none",
            },
          ]}
        >
          <Text style={styles.text2}>Always available (Recommended)</Text>
          <Text style={styles.text3}>Monday - Sunday (24hours)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("ParkingAvailability", "workingWeek");
          }}
          style={[
            styles.div2,
            DrivingHostData?.ParkingAvailability?.workingWeek
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.ParkingAvailability?.workingWeek
                ? "flex"
                : "none",
            },
          ]}
        >
          <Text style={styles.text2}>Working week</Text>
          <Text style={styles.text3}>Monday - Friday (06:00 - 19:00)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("ParkingAvailability", "custom");
          }}
          style={[
            styles.div2,
            DrivingHostData?.ParkingAvailability?.custom
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.ParkingAvailability?.custom
                ? "flex"
                : "none",
            },
          ]}
        >
          <Text style={styles.text2}>Custom</Text>
          <Text style={styles.text3}>Personalised settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleValidationAndNavigation}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },

  div: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 14,
    borderRadius: 10,
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 20,
  },

  text2: {
    fontSize: 16,
    fontWeight: "500",
  },

  text3: {
    fontSize: 16,
    fontWeight: "100",
  },

  text4: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 20,
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

export default SpaceAvailability2;
