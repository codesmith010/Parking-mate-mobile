import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import countryListPicker from "../../utils/helpers/countryList";
import { dispatch, useSelector } from "../../store/store";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";

const SpaceLocation = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );
  const [country, setCountry] = useState(""); // State for country
  const [address, setAddress] = useState(""); // State for address

  const handleAddressSelect = (addressData) => {
    const { address, lat, lng } = addressData;
    handleFieldChange("ParkingSpaceAddress", address);
    handleFieldChange("ParkingSpaceCoordinates", [lng, lat]);
  };

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  const handleValidationAndNavigation = () => {
    const { ParkingSpaceCountry, ParkingSpaceAddress } = DrivingHostData;

    const validateField = (field) => field.length > 0;

    if (
      !validateField(ParkingSpaceCountry) ||
      !validateField(ParkingSpaceAddress)
    ) {
      alert("Please select your Country & Address ");
      return;
    }

    navigation.navigate("AccessInstruction");
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
        <Text style={styles.text2}>
          Please select the country where your Driveway or allocating parking
          space is.
        </Text>
        <View style={styles.input}>
          <RNPickerSelect
            items={countryListPicker}
            placeholder={{
              label: "Select Country",
              value: "",
            }}
            value={DrivingHostData?.ParkingSpaceCountry}
            onValueChange={(value) =>
              handleFieldChange("ParkingSpaceCountry", value)
            }
          />
        </View>
        <Text style={styles.text2}>
          Where your Driveway or allocating parking space is.
        </Text>
        <TextInput
          style={styles.input}
          onPressIn={() =>
            navigation.navigate("Address", {
              onAddressSelect: handleAddressSelect,
            })
          }
          placeholder="100 NE 1st Ave Mulberry FL 33860"
          value={DrivingHostData?.ParkingSpaceAddress}
          onChangeText={(text) => {
            handleFieldChange("ParkingSpaceAddress", text);
          }}
        />
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
    gap: 14,
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
    fontSize: 27,
    fontWeight: "600",
  },

  text2: {
    fontSize: 20,
    fontWeight: "500",
  },

  text3: {
    fontSize: 17,
    fontWeight: "100",
  },
  input: {
    borderWidth: 0.3,
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    paddingVertical: 15,
  },

  div2: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    paddingVertical: 25,
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

export default SpaceLocation;
