import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";

const AccessInstruction = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  const handleValidationAndNavigation = () => {
    const { EntryPermitRequired } = DrivingHostData;

    if (EntryPermitRequired !== "yes" && EntryPermitRequired !== "no") {
      alert("Please select either Yes or No to proceed.");
      return;
    }

    navigation.navigate("SpacePricing");
  };
  return (
    <View style={styles.mainView}>
      {/* <SafeAreaView /> */}
      <View style={styles.div1}>
        <Text style={styles.text}>Helpful access instructions</Text>
      </View>
      <View style={styles.mainImage}>
        <Image
          source={require("../../../assets/RentOutSpace.png")}
          style={styles.mainImageStyle}
        />
      </View>
      <Text style={styles.text2}>
        Does your space have gated entry or requires a permit?
      </Text>

      <View style={styles.div3}>
        <TouchableOpacity
          style={[
            styles.div2,
            DrivingHostData?.EntryPermitRequired === "yes" &&
              styles.selectedOption,
          ]}
          onPress={() => {
            handleFieldChange("EntryPermitRequired", "yes");
          }}
        >
          <Text style={styles.text3}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.div2,
            DrivingHostData?.EntryPermitRequired === "no" &&
              styles.selectedOption,
          ]}
          onPress={() => {
            handleFieldChange("EntryPermitRequired", "no");
          }}
        >
          <Text style={styles.text3}>No</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleValidationAndNavigation}
      >
        <Text style={styles.buttonText}>Continue</Text>
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
    height: 220,
    width: 220,
    borderRadius: 40,
  },

  selectedOption: {
    borderWidth: 2,
    borderColor: Colors.primaryColor, // Change border color to primary color for selected option
  },

  text: {
    fontSize: 27,
    fontWeight: "600",
  },

  text2: {
    fontSize: 22,
    fontWeight: "500",
    marginVertical: 10,
  },

  text3: {
    textAlign: "center",
    fontSize: 20,
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

export default AccessInstruction;
