import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";

const SpacePricing = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  const handlePrice = (text) => {
    // Remove any non-digit characters except for the decimal point
    const sanitizedText = text.replace(/[^0-9.]/g, "");

    // Check if the input is empty or a valid number with up to 2 decimal places
    if (sanitizedText === "" || /^\d*\.?\d{0,2}$/.test(sanitizedText)) {
      // If empty or valid, update the state with the value
      dispatch(
        setDrivingHostData({
          fieldName: "PricingPlan",
          value: sanitizedText === "" ? "" : sanitizedText,
        })
      );
    }
  };

  const handleNextScreen = () => {
    if (
      DrivingHostData.PricingPlan === "" ||
      DrivingHostData.PricingPlan.length === 0 ||
      DrivingHostData.PricingPlan === 0
    ) {
      Alert.alert("Please add your pricing to proceed");
      return;
    }
    navigation.navigate("SpaceListing");
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.div1}>
          <Text style={styles.text}>Residential parking pricing</Text>
        </View>
        <View style={styles.mainImage}>
          <Image
            source={require("../../../assets/RentOutSpace.png")}
            style={styles.mainImageStyle}
          />
        </View>
        <Text style={styles.text4}>What pricing would you like to set?</Text>

        <TextInput
          style={styles.div2}
          onChangeText={handlePrice}
          placeholder="Please add your price per hour"
          value={String(DrivingHostData.PricingPlan)} // Convert to string to handle null or undefined values
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleNextScreen}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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

  text: {
    fontSize: 27,
    fontWeight: "600",
  },

  text2: {
    fontSize: 18,
    fontWeight: "500",
  },

  text3: {
    fontSize: 17,
    fontWeight: "100",
  },

  text4: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
  },

  div2: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 12,
    borderRadius: 6,
  },

  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 20,
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

export default SpacePricing;
