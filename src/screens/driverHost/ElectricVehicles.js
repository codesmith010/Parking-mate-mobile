import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { dispatch, useSelector } from "../../store/store";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";

const ElectricVehicles = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  const handleValidationAndNavigation = () => {
    const { ElectricVehicleChargingFacility } = DrivingHostData;

    if (
      ElectricVehicleChargingFacility !== "yes" &&
      ElectricVehicleChargingFacility !== "no"
    ) {
      alert(
        "Please select either Yes or No for Electric Vehicle Charging Facility to proceed."
      );
      return;
    }

    navigation.navigate("SpaceAvailability");
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.div1}>
          <Text style={styles.text}>To encourage a sustainable future</Text>
        </View>
        <View style={styles.mainImage}>
          <Image
            source={require("../../../assets/RentOutSpace.png")}
            style={styles.mainImageStyle}
          />
        </View>
        <Text style={styles.text2}>
          Do you have an electric vehicle charger?
        </Text>

        <View style={styles.div3}>
          <TouchableOpacity
            onPress={() => {
              handleFieldChange("ElectricVehicleChargingFacility", "yes");
            }}
            style={[
              styles.div2,
              DrivingHostData?.ElectricVehicleChargingFacility === "yes"
                ? styles.selectedOption
                : null, // Apply selected option style if electricVehicle is "Yes"
            ]}
          >
            <Text style={styles.text4}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleFieldChange("ElectricVehicleChargingFacility", "no");
            }}
            style={[
              styles.div2,
              DrivingHostData?.ElectricVehicleChargingFacility === "no"
                ? styles.selectedOption
                : null, // Apply selected option style if electricVehicle is "Yes"
            ]}
          >
            <Text style={styles.text4}>No</Text>
          </TouchableOpacity>
        </View>

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
    marginVertical: 30,
    marginHorizontal: 20,
  },
  mainImage: {
    alignItems: "center",
  },
  mainImageStyle: {
    height: 220,
    width: 220,
    borderRadius: 40,
  },

  text: {
    fontSize: 32,
    fontWeight: "600",
  },

  text2: {
    fontSize: 22,
    fontWeight: "500",
    marginVertical: 20,
  },

  text4: {
    textAlign: "center",
    fontSize: 18,
  },

  selectedOption: {
    borderWidth: 2,
    borderColor: Colors.primaryColor, // Change border color to primary color for selected option
  },

  text3: {
    fontSize: 14,
    fontWeight: "300",
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

export default ElectricVehicles;
