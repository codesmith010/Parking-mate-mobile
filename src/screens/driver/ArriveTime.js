import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
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

const ArriveTime = ({ navigation }) => {
  const { DriverData, isLoading, error } = useSelector((state) => state.Driver);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const { user } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      if (
        DriverData.CurrentLocation.length === 0 ||
        DriverData.CurrentLocation.trim() === ""
      ) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "SHome" }],
          })
        );
        Alert.alert("Please select your location.");
      }
      return () => {};
    }, [])
  );

  const handleNextScreen = () => {
    navigation.navigate("LeaveTime", { arriveTime: selectedTime });
  };

  const handleValidationAndSubmission = () => {
    const { ArriveTime } = DriverData;

    if (ArriveTime.length === 0) {
      Alert.alert("Please add Arrive Time.");

      return;
    }
    handleNextScreen();
  };

  const handleFieldChange = (fieldName, value) => {
    // Dispatch the setDrivingHostData action with fieldName and value as payload
    dispatch(setDriverData({ fieldName, value }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);

    dispatch(
      setDriverData({
        fieldName: "ArriveTime",
        value: currentDate.toLocaleString(),
      })
    );
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
                When do you want to arrive?
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

export default ArriveTime;

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
