import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { getSpecificDriverParkingSpaces } from "../../features/driver/driverActions";
import { setDriverSelectedData } from "../../features/driver/driverSlice";
import { useSelector } from "../../store/store";

const ParkingHistory = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { DriverDataSpecific, isLoading } = useSelector(
    (state) => state.Driver
  );

  const [update, setUpdate] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handleDriverHistoryList();
      return () => {};
    }, [update])
  );

  const handleDriverHistoryList = () => {
    const payload = {
      userID: user._id,
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      errorCallback,
      payload,
    };

    dispatch(getSpecificDriverParkingSpaces(params));
  };

  const handleNextScreen = (data) => {
    dispatch(setDriverSelectedData(data));
    navigation.navigate("History");
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

  const renderItem = (
    item,
    data,
    parkingSpaceID,
    parkingSpaceAddress,
    pricingPlan
  ) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={styles.div2}
        onPress={() => handleNextScreen(data)}
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View style={styles.parkingIDContainer}>
              <Text style={styles.parkingID}>{"#" + parkingSpaceID}</Text>
            </View>
            <Text style={styles.parkingAddress}>
              {parkingSpaceAddress.length >= 35
                ? parkingSpaceAddress.slice(0, 35) + "..."
                : parkingSpaceAddress}
            </Text>
          </View>
          <View style={styles.itemDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Arrive Time:</Text>
              <Text style={styles.detailValue}>
                {moment(item.ArriveTime).format("MMMM Do YYYY, h:mm:ss a")}
              </Text>
            </View>
          </View>
          <View style={styles.itemDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Leave Time: </Text>
              <Text style={styles.detailValue}>
                {moment(item.LeaveTime).format("MMMM Do YYYY, h:mm:ss a")}
              </Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${pricingPlan}/hr</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {DriverDataSpecific.length === 0 && (
        <Text style={{ textAlign: "center" }}>No Data to show</Text>
      )}
      {DriverDataSpecific.map((data) => {
        return (
          <FlatList
            key={data._id}
            data={data.Booking}
            renderItem={({ item }) =>
              renderItem(
                item,
                data,
                data.ParkingSpaceID,
                data.ParkingSpaceAddress,
                data.PricingPlan
              )
            }
            keyExtractor={(item) => item._id}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  div2: {
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    padding: 14,
    marginVertical: 10,
    width: "93%",
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  parkingIDContainer: {
    backgroundColor: Colors.primaryLight,
    padding: 8,
    borderRadius: 10,
  },
  parkingID: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryColor,
  },
  parkingAddress: {
    fontSize: 12,
    fontWeight: "500",
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5,
  },
  deleteButton: {
    borderRadius: 6,
  },
  deleteIcon: {
    color: Colors.grayDark,
  },
  priceContainer: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primaryColor,
    padding: 8,
    borderRadius: 10,
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default ParkingHistory;
