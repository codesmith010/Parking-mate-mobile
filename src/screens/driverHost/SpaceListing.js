import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/Colors";
import {
  setDriverHostAvailableDate,
  setDrivingHostData,
} from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";

const SpaceListing = ({ navigation }) => {
  const { DrivingHostData, DriverHostAvailableDate, isLoading, error } =
    useSelector((state) => state.DrivingHost);
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState({
    Mon: {
      ArriveTime: new Date(),
      LeaveTime: new Date(),
    },
    Tue: {
      ArriveTime: new Date(),
      LeaveTime: new Date(),
    },
    Wed: {
      ArriveTime: new Date(),
      LeaveTime: new Date(),
    },
    Thu: {
      ArriveTime: new Date(),
      LeaveTime: new Date(),
    },
    Fri: {
      ArriveTime: new Date(),
      LeaveTime: new Date(),
    },
    Sat: {
      ArriveTime: new Date(),
      LeaveTime: new Date(),
    },
    Sun: {
      ArriveTime: new Date(),
      LeaveTime: new Date(),
    },
  });

  // handling date change
  const handleDateChange = (selectedDate, dayOfWeek, timeType) => {
    // Update the state with the selected Date object
    setDate((prevDate) => ({
      ...prevDate,
      [dayOfWeek]: {
        ...prevDate[dayOfWeek],
        [timeType]: selectedDate,
      },
    }));
  };

  const handleValidationAndNavigation = () => {
    // Serialize the date state object
    const serializedDateState = {
      Mon: {
        ArriveTime: date.Mon.ArriveTime.toLocaleString(),
        LeaveTime: date.Mon.LeaveTime.toLocaleString(),
      },
      Tue: {
        ArriveTime: date.Tue.ArriveTime.toLocaleString(),
        LeaveTime: date.Tue.LeaveTime.toLocaleString(),
      },
      Wed: {
        ArriveTime: date.Wed.ArriveTime.toLocaleString(),
        LeaveTime: date.Wed.LeaveTime.toLocaleString(),
      },
      Thu: {
        ArriveTime: date.Thu.ArriveTime.toLocaleString(),
        LeaveTime: date.Thu.LeaveTime.toLocaleString(),
      },
      Fri: {
        ArriveTime: date.Fri.ArriveTime.toLocaleString(),
        LeaveTime: date.Fri.LeaveTime.toLocaleString(),
      },
      Sat: {
        ArriveTime: date.Sat.ArriveTime.toLocaleString(),
        LeaveTime: date.Sat.LeaveTime.toLocaleString(),
      },
      Sun: {
        ArriveTime: date.Sun.ArriveTime.toLocaleString(),
        LeaveTime: date.Sun.LeaveTime.toLocaleString(),
      },
    };
    dispatch(
      setDrivingHostData({
        fieldName: "DriverHostAvailableDate",
        value: serializedDateState,
      })
    );

    navigation.navigate("SpaceListingSecond");
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.div1}>
          <Text style={styles.text}>
            Thanks 'Driveway Host'{"\n"}Lets get you some bookings!
          </Text>
        </View>
        <Text style={styles.text2}>
          When is your Residential driveway available?
        </Text>

        <View style={{ flex: 1 }}>
          {/* Header row */}
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingBottom: 5,
              gap: 10,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Day</Text>
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Arrive Date</Text>
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Time</Text>
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Leave Date</Text>
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Time</Text>
            </View>
          </View>

          {/* Monday row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 31, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Mon</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Mon"]["ArriveTime"]}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Mon", "ArriveTime");
                  }
                }}
                style={{ width: 185 }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Mon"]["LeaveTime"]}
                style={{ width: 178 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Mon", "LeaveTime");
                  }
                }}
              />
            </View>
          </ScrollView>

          {/* Tuesday row */}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 31, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Tue</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Tue"]["ArriveTime"]}
                style={{ width: 185 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Tue", "ArriveTime");
                  }
                }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Tue"]["LeaveTime"]}
                style={{ width: 178 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Tue", "LeaveTime");
                  }
                }}
              />
            </View>
          </ScrollView>

          {/* Wednesday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 31, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Wed</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Wed"]["ArriveTime"]}
                style={{ width: 185 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Wed", "ArriveTime");
                  }
                }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Wed"]["LeaveTime"]}
                style={{ width: 178 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Wed", "LeaveTime");
                  }
                }}
              />
            </View>
          </ScrollView>

          {/* Thrusday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 31, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Thu</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Thu"]["ArriveTime"]}
                style={{ width: 185 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Thu", "ArriveTime");
                  }
                }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Thu"]["LeaveTime"]}
                style={{ width: 178 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Thu", "LeaveTime");
                  }
                }}
              />
            </View>
          </ScrollView>

          {/* Friday row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 31, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Fri</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Fri"]["ArriveTime"]}
                style={{ width: 185 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Fri", "ArriveTime");
                  }
                }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Fri"]["LeaveTime"]}
                style={{ width: 178 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Fri", "LeaveTime");
                  }
                }}
              />
            </View>
          </ScrollView>

          {/* Saturday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 31, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Sat</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Sat"]["ArriveTime"]}
                style={{ width: 185 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Sat", "ArriveTime");
                  }
                }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Sat"]["LeaveTime"]}
                style={{ width: 178 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Sat", "LeaveTime");
                  }
                }}
              />
            </View>
          </ScrollView>

          {/* Sunday row*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              paddingTop: 5,
            }}
          >
            <View style={{ width: 31, alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Sun</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Sun"]["ArriveTime"]}
                style={{ width: 185 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Sun", "ArriveTime");
                  }
                }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <RNDateTimePicker
                display="default"
                mode="datetime"
                minuteInterval={30}
                is24Hour={false}
                value={date["Sun"]["LeaveTime"]}
                style={{ width: 178 }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate, "Sun", "LeaveTime");
                  }
                }}
              />
            </View>
          </ScrollView>
        </View>

        <Text style={styles.text3}>
          This listing will be bookable to drivers 24 hours after its been
          approved. You can add more information or make changes at any time.
        </Text>

        <Text style={styles.text2}>Let's look at your listing</Text>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleValidationAndNavigation}
        >
          <Text style={styles.buttonText}>Finish</Text>
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
    gap: 20,
  },

  text: {
    fontSize: 28,
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

  text1: {
    fontSize: 20,
    fontWeight: "500",
  },

  div2: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginVertical: 10,
    textAlign: "center",
    paddingVertical: 25,
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
  dateStyle: {
    padding: 12,
    width: "100%",
    borderWidth: 0.3,
    borderRadius: 12,
    gap: 10,
    position: "relative",
    justifyContent: "center",
  },
  chooseDate: {
    gap: 4,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: Colors.primaryColor, // Change border color to primary color for selected option
  },

  timeDiv: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  timeStyle: {
    width: "35%",
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
  },
});

export default SpaceListing;
