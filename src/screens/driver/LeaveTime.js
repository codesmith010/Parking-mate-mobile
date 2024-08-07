import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { setDriverData } from "../../features/driver/driverSlice";
import { dispatch, useSelector } from "../../store/store";

const LeaveTime = ({ navigation, route }) => {
  const { DriverData, isLoading, error } = useSelector((state) => state.Driver);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const { user } = useSelector((state) => state.user);

  const ToastRef = useRef(null);
  const showToast = () => {
    if (ToastRef.current !== null) {
      ToastRef.current.toast();
    }
  };

  // Error toast
  const ErrorToastRef = useRef(null);
  const errorToast = () => {
    if (ErrorToastRef.current !== null) {
      ErrorToastRef.current.toast();
    }
  };

  const handleNextScreen = () => {
    navigation.navigate("NearByLocation", {
      arriveTime: route.params.arriveTime,
      leaveTime: selectedTime,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);

    dispatch(
      setDriverData({
        fieldName: "LeaveTime",
        value: currentDate.toLocaleString(),
      })
    );
  };

  const handleValidationAndSubmission = () => {
    const { LeaveTime, ArriveTime } = DriverData;

    if (LeaveTime.length === 0) {
      Alert.alert("Please add Leave Time.");
      return;
    }

    // Parsing LeaveTime using moment
    const leaveTimeMoment = moment(LeaveTime, "MM/DD/YYYY, hh:mm:ss A");
    const leaveTime = leaveTimeMoment.isValid()
      ? leaveTimeMoment.valueOf()
      : NaN;

    // Parsing ArriveTime using moment
    const arriveTimeMoment = moment(ArriveTime, "MM/DD/YYYY, hh:mm:ss A");
    const arriveTime = arriveTimeMoment.isValid()
      ? arriveTimeMoment.valueOf()
      : NaN;

    if (isNaN(leaveTime) || isNaN(arriveTime)) {
      Alert.alert("Invalid time format. Please select a valid time format.");
      return;
    }

    if (leaveTime < arriveTime) {
      Alert.alert(
        "Please select a leave time that is greater than the arrive time."
      );
      return;
    }

    handleNextScreen();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.topContent}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 21,
                fontWeight: "500",
                paddingHorizontal: 20,
              }}
            >
              Parking duration
            </Text>
            <Text style={styles.topText}>{DriverData.CurrentLocation}</Text>
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimePicker}>
              <Text style={styles.dateTimeText}>
                When do you want to leave?
              </Text>
              <RNDateTimePicker
                style={styles.picker}
                textColor={Colors.primaryDark}
                mode="datetime"
                display="spinner"
                value={date}
                minimumDate={new Date()} // Set minimum date to the current date
                is24Hour={false}
                minuteInterval={30}
                onChange={handleDateChange}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  padding: 12,
                  width: "45%",
                  borderRadius: 12,
                  alignItems: "center",
                }}
                onPress={() => navigation.goBack()}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    fontWeight: "600",
                    color: Colors.primaryDark,
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleValidationAndSubmission}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LeaveTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
  },

  topContent: {
    width: "90%",
    marginTop: "25%",
    paddingVertical: 40,
    gap: 2,
  },

  topText: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },

  dateTimeContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    justifyContent: "space-around",
  },

  dateTimePicker: {
    width: "90%",
    alignItems: "center",
  },

  dateTimeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 30,
  },

  picker: {
    height: 210,
  },

  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    marginBottom: 30,
  },

  button: {
    padding: 12,
    width: "45%",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },

  buttonText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
});
