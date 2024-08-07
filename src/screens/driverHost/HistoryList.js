import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import {
  deleteSpecificParkingRecord,
  getSpecificDriverHostParkingSpaces,
} from "../../features/drivingHost/drivingHostActions";
import { setDriverHostSelectedData } from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";
import Earning from "./Earning";

const HistoryList = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { DriverHostDataSpecific, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );
  const [update, setUpdate] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handleDriverHostHistoryList();

      return () => {};
    }, [update])
  );

  const handleDriverHostHistoryList = () => {
    const payload = {
      driverHostID: user._id,
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      errorCallback,
      payload,
    };

    dispatch(getSpecificDriverHostParkingSpaces(params));
  };

  const handleNextScreen = (data) => {
    dispatch(setDriverHostSelectedData(data));
    navigation.navigate("HostHistory");
  };

  const handleDeleteParkingRecord = (parkingSpaceID) => {
    const payload = {
      userID: user._id,
      ParkingSpaceID: parkingSpaceID,
    };
    const successCallback = (response) => {
      Alert.alert(response);
      setUpdate(!update);
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };

    dispatch(deleteSpecificParkingRecord(params));
  };

  const deleteAlert = (parkingSpaceID) => {
    Alert.alert(
      "Delete",
      "Do you want to delete this parking record?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            handleDeleteParkingRecord(parkingSpaceID);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  function convertDateStringToDate(dateString) {
    const date = new Date(dateString);
    return date;
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.mainView}>
        {/* <Earning /> */}
        {DriverHostDataSpecific.length === 0 && (
          <Text style={{ textAlign: "center" }}>No Data to show</Text>
        )}
        {DriverHostDataSpecific?.map((data, index) => {
          var formattedDate = new Date(data?.ParkingAvailabilityDate);
          return (
            <TouchableOpacity
              key={data?._id}
              style={styles.div2}
              onPress={() => handleNextScreen(data)}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 20,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.primaryLight,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: Colors.primaryColor,
                    }}
                  >
                    {"#" + data?.ParkingSpaceID}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "500" }}>
                  {data?.ParkingSpaceAddress.length >= 35
                    ? data?.ParkingSpaceAddress.slice(0, 35) + "..."
                    : data?.ParkingSpaceAddress}
                </Text>
                {/* <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text3}>Parking Availablity Date: </Text>
                  <Text style={styles.text2}>
                    {formattedDate?.toLocaleDateString()}
                  </Text>
                </View> */}

                <TouchableOpacity
                  onPress={() => deleteAlert(data?._id)}
                  style={{
                    borderRadius: 6,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faDeleteLeft}
                    style={{
                      color: Colors.grayDark,
                    }}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text3}>Status: </Text>
                  <Text style={styles.text3}>
                    {data?.Status.charAt(0).toUpperCase() +
                      data?.Status.slice(1).toLowerCase()}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: Colors.primaryColor,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    ${data?.PricingPlan}/hr
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 20,
    backgroundColor: "white",
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
  },

  text2: {
    fontSize: 12,
    fontWeight: "500",
  },

  text3: {
    fontSize: 14,
    fontWeight: "500",
  },

  div2: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    padding: 14,
    gap: 8,
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

export default HistoryList;
