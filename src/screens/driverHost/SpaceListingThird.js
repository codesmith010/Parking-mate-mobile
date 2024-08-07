import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Colors from "../../constants/Colors";
import MultipleImageUpload from "../../components/MultipleImageUpload";
import {
  resetDrivingHostData,
  setDrivingHostData,
} from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";
import { createParkingSpace } from "../../features/drivingHost/drivingHostActions";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

const SpaceListingThird = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );
  const [isDetails, setIsDetails] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      handleFieldChange("DriverHostID", user._id);

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const handleIsDetails = () => {
    setIsDetails(!isDetails);
  };

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  const handleValidationAndSubmission = () => {
    const { ParkingPhotos, ParkingDetails } = DrivingHostData;

    if (ParkingPhotos.length === 0) {
      Alert.alert("Please add at least one photo of your parking space.");
      return;
    }
    if (ParkingPhotos.length > 4) {
      Alert.alert("Maximum of 4 photos allowed for your parking space.");
      return;
    }
    if (ParkingDetails.length === 0) {
      Alert.alert("Please add a description about your space to proceed");
      return;
    }
    if (ParkingDetails.length > 150) {
      Alert.alert("Description must be maximum 150 words.");
      return;
    }

    const payload = {
      ...DrivingHostData,
    };
    const successCallback = (response) => {
      Alert.alert(response);
      setTimeout(() => {
        dispatch(resetDrivingHostData());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "SHome" }],
          })
        );
      }, 2000);
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };

    if (!isLoading) {
      dispatch(createParkingSpace(params));
    } else {
      Alert.alert("Please try submitting again in a few minutes.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.div1}>
          <Text style={styles.text2}>How to make your listing stand out</Text>
          <Text style={styles.text3}>
            Now your listing has been submitted why not really sell your space
            by adding a description and photos?
          </Text>
          <Text style={styles.text3}>
            The more usefull information you add to your listing, the more
            confident a driver will feel when booking.
          </Text>
        </View>

        <MultipleImageUpload>
          <View style={styles.div3}>
            <Text style={styles.text4}>Add photos</Text>
            <Text style={styles.text3}>
              Photos encourage trust and make your space stand out.
            </Text>
          </View>
        </MultipleImageUpload>
        <TouchableOpacity style={styles.div3} onPress={handleIsDetails}>
          <Text style={styles.text4}>Add a description and features</Text>
          <Text style={styles.text3}>
            Make your space more appealing to drivers.
          </Text>
        </TouchableOpacity>
        {isDetails && (
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Write description here ( Max 150 words )"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              maxLength={150}
              value={DrivingHostData?.ParkingDetails}
              onChangeText={(text) => {
                handleFieldChange("ParkingDetails", text);
              }}
            />
          </View>
        )}

        <View style={styles.div2}>
          <Text style={styles.text2}>The important bit, getting paid!</Text>
          <Text style={styles.text3}>
            Payouts are done via bank transfer to your designated account. Let
            us know where you'd like us to send your money.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleValidationAndSubmission}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    gap: 20,
  },

  div1: {
    gap: 20,
  },

  text: {
    fontSize: 32,
    fontWeight: "600",
  },

  text2: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 20,
  },

  text3: {
    fontSize: 16,
    fontWeight: "300",
  },

  text4: {
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "400",
  },

  div2: {
    marginVertical: 30,
  },

  div3: {
    borderWidth: 0.3,
    marginVertical: 10,
    padding: 20,
    borderRadius: 5,
  },

  textAreaContainer: {
    borderColor: Colors.black,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 12,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
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

export default SpaceListingThird;
