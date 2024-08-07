import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";

const SpaceTypeSecond = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  const handleDecreaseSpaces = () => {
    if (DrivingHostData?.ParkingSpaces > 1) {
      dispatch(
        setDrivingHostData({
          fieldName: "ParkingSpaces",
          value: DrivingHostData?.ParkingSpaces - 1,
        })
      );
    }
  };

  const handleIncreaseSpaces = () => {
    dispatch(
      setDrivingHostData({
        fieldName: "ParkingSpaces",
        value: DrivingHostData?.ParkingSpaces + 1,
      })
    );
  };

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  const handleValidationAndNavigation = () => {
    const { ParkingSituated, ParkingSpaceSize, ParkingSpaces } =
      DrivingHostData;

    const validateField = (field) =>
      Object.values(field).filter((value) => value === true).length === 1;

    if (!validateField(ParkingSituated) || !validateField(ParkingSpaceSize)) {
      alert(
        "Please select exactly one option for ParkingSituated and ParkingSpaceSize."
      );
      return;
    }

    if (ParkingSpaces <= 0) {
      alert("Residential Parking Spaces should have atleast 1 value");
      return;
    }

    navigation.navigate("ElectricVehicles");
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <View style={styles.div2}>
          <Text style={styles.text}>
            How many Residential parking spaces do you have?
          </Text>
        </View>

        <View style={styles.groupStyle}>
          <TouchableOpacity
            onPress={handleDecreaseSpaces}
            style={[styles.addSub, styles.number]}
          >
            <Text style={styles.text4}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.text4}>{DrivingHostData?.ParkingSpaces}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleIncreaseSpaces}
            style={[styles.addSub, styles.number]}
          >
            <Text style={styles.text4}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.div2}>
          <Text style={styles.text}>
            What size vehicle can your parking spaces allocate?
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("ParkingSpaceSize", "small");
          }}
          style={[
            styles.div3,
            DrivingHostData?.ParkingSpaceSize?.small
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.ParkingSpaceSize?.small
                ? "flex"
                : "none",
            },
          ]}
        >
          <Text>Small</Text>
          <Text style={styles.text3}>i.e compact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleFieldChange("ParkingSpaceSize", "medium");
          }}
          style={[
            styles.div3,
            DrivingHostData?.ParkingSpaceSize?.medium
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.ParkingSpaceSize?.medium
                ? "flex"
                : "none",
            },
          ]}
        >
          <Text>Medium</Text>
          <Text style={styles.text3}>i.e sedan 4 door etc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleFieldChange("ParkingSpaceSize", "large");
          }}
          style={[
            styles.div3,
            DrivingHostData?.ParkingSpaceSize?.large
              ? styles.selectedOption
              : null, // Apply selected option
            {
              display: DrivingHostData?.ParkingSpaceSize?.large
                ? "flex"
                : "none",
            },
          ]}
        >
          <Text>Large</Text>
          <Text style={styles.text3}>i.e SUV. RV or Boat</Text>
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
    marginHorizontal: 30,
  },

  div1: {
    marginHorizontal: 10,
  },

  text: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
  },

  text2: {
    fontSize: 17,
    fontWeight: "600",
  },

  div3: {
    borderWidth: 0.3,
    marginVertical: 10,
    padding: 16,
    borderRadius: 10,
    gap: 6,
  },

  text3: {
    fontSize: 16,
    fontWeight: "100",
  },

  groupStyle: {
    flexDirection: "row",
    // justifyContent: "space-betwe",
    marginVertical: 10,
    gap: 10,
  },

  text4: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },

  number: {
    borderWidth: 0.3,
    width: "15%",
    backgroundColor: "white",
    paddingVertical: 12,
  },
  addSub: {
    borderRadius: 50,
  },

  textInputStyle: {
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 15,
    marginVertical: 15,
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

export default SpaceTypeSecond;
