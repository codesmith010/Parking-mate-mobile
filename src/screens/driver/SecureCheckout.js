import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
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
import ImageView from "react-native-image-viewing";
import Shimmer from "../../components/Shimmer";
import Colors from "../../constants/Colors";
import { createBooking } from "../../features/driver/driverActions";
import { resetDriverData } from "../../features/driver/driverSlice";
import { dispatch, useSelector } from "../../store/store";

const SecureCheckout = ({ navigation }) => {
  const { DriverData, SelectedParkingSpace } = useSelector(
    (state) => state.Driver
  );
  const { user } = useSelector((state) => state.user);
  const [duration, setDuration] = useState("");
  const [isFetched, setFetched] = useState(false); // Image fetching
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    handleValidationAndSubmission();
  }, []);

  const handleValidationAndSubmission = () => {
    const { ArriveTime, LeaveTime } = DriverData;

    // Parsing ArriveTime and LeaveTime using moment
    const arriveTimeMoment = moment(ArriveTime, "MM/DD/YYYY, hh:mm:ss A");
    const leaveTimeMoment = moment(LeaveTime, "MM/DD/YYYY, hh:mm:ss A");

    // Calculate duration in milliseconds
    const durationMilliseconds = leaveTimeMoment.diff(arriveTimeMoment);

    // Convert duration from milliseconds to hours and minutes
    const durationHours = Math.floor(durationMilliseconds / (1000 * 60 * 60));
    const durationString = `${durationHours}`;
    // if duration is zero, redirect to Arrive Time

    if (
      durationString.trim() == "" ||
      durationHours == 0 ||
      durationHours < 0
    ) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "SHome" }],
        })
      );
      // return Alert.alert("Please select valid Arrive and Leave times");
    }
    setDuration(durationString);
  };

  const handleValidationAndSubmissions = () => {
    const payload = {
      parkingID: SelectedParkingSpace._id,
      userID: user._id,
      userFirstName: user?.firstName,
      userEmail: user?.email,
      userPhone: user?.phoneNumber,
      Amount: finalAmount,
      TransactionFee: transactionFee.toFixed(2),
      ArriveTime: DriverData.ArriveTime,
      LeaveTime: DriverData.LeaveTime,
    };
    const successCallback = (response) => {
      Alert.alert(response);
      setTimeout(() => {
        dispatch(resetDriverData());
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

    dispatch(createBooking(params));
  };

  const calculateParkingAmount = (parkingFeePerHour, durationHours) => {
    // Calculate parking fee
    const parkingFee = parkingFeePerHour * durationHours;

    // Calculate transaction fee (10%)
    const transactionFee = parkingFee * 0.1;

    // Calculate final amount including transaction fee
    const finalAmount = parkingFee + transactionFee;

    return { transactionFee, finalAmount };
  };

  // Call the function to calculate the final price
  const { transactionFee, finalAmount } = calculateParkingAmount(
    SelectedParkingSpace?.PricingPlan,
    duration
  );

  // handle Image viewer
  const handleImageViewer = () => {
    setIsVisible(!visible);
  };

  const convertToImagesArray = (data) => {
    if (!Array.isArray(data)) {
      return;
    }
    if (data.length === 0) {
      return;
    }

    // Iterate over each item in the array and create an object with the 'uri' property
    const images = data.map((uri) => ({
      uri: uri,
    }));

    return images;
  };

  const imagesArray = convertToImagesArray(SelectedParkingSpace?.ParkingPhotos);

  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.mainView2}>
          <View>
            <View
              style={{
                borderWidth: 0.3,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 8,
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              {SelectedParkingSpace?.ParkingPhotos?.map((data, index) => {
                return (
                  <Shimmer
                    key={index}
                    width={100}
                    height={100}
                    isFetched={isFetched}
                  >
                    <TouchableOpacity onPress={handleImageViewer}>
                      <Image
                        // key={index}
                        source={{
                          uri:
                            data.length > 0
                              ? data
                              : "../../../assets/parkingmateLogo.png",
                        }}
                        // defaultSource={require("../../../assets/parkingmateLogo.png")}
                        style={{ height: 100, width: 100 }}
                        onLoad={() => setFetched(true)}
                      />
                    </TouchableOpacity>
                  </Shimmer>
                );
              })}
            </View>
            <ImageView
              images={imagesArray}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </View>

          {Object.keys(SelectedParkingSpace).length > 0 && (
            <View style={styles.div1}>
              <Text style={styles.text}>
                {SelectedParkingSpace?.ParkingSpaceAddress}
              </Text>
              <Text style={styles.text3}>{SelectedParkingSpace?.Status}</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 25,
              width: "90%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
                color: "gray",
              }}
            >
              Parking from
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
                color: "grey",
              }}
            >
              Parking until
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 25,
            }}
          >
            <TextInput
              style={{ width: "35%" }}
              placeholder="Enter your name"
              value={DriverData.ArriveTime}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                color: Colors.grayDark,
              }}
              size={24}
            />
            <TextInput
              style={{ width: "35%" }}
              placeholder="Enter your name"
              value={DriverData.LeaveTime}
            />
          </View>

          {/* {DriverData.Duration ? ( */}
          <View style={{ backgroundColor: Colors.primaryNormal, padding: 4 }}>
            <Text
              style={{ fontSize: 25, fontWeight: 600, textAlign: "center" }}
            >
              {duration} hours
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
                color: "grey",
              }}
            >
              Total Duration
            </Text>
          </View>
          {/* ) : null} */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
                color: "grey",
              }}
            >
              Parking fee
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
              }}
            >
              ${SelectedParkingSpace?.PricingPlan}/hr
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
                color: "grey",
              }}
            >
              Duration
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
              }}
            >
              {duration} hrs
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
                color: "grey",
              }}
            >
              Transaction fee
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 300,
                textAlign: "center",
              }}
            >
              10%
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              paddingBottom: 110,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Final price
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              ${finalAmount}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleValidationAndSubmissions}
        >
          <Text style={styles.buttonText}>Reserve Parking Space</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    gap: 20,
  },
  mainView2: {
    marginHorizontal: 20,
    gap: 20,
    backgroundColor: "white",
    padding: 10,
  },

  div1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryColor,
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
  },
  textDiv: {
    flexDirection: "row",
  },

  text2: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 20,
  },

  text3: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
  },

  textInputStyle: {
    width: "100%",
    borderWidth: 0.3,
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
    // marginVertical: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SecureCheckout;
