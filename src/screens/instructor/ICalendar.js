// import { Dimensions, StyleSheet, Text, View } from "react-native";
// import React from "react";

import React, { useEffect, useState } from "react";
import { Dimensions, View, Alert, LogBox } from "react-native";
import EventCalendar from "react-native-events-calendar";

const { width } = Dimensions.get("window");

const ICalendar = () => {
  const [events, setEvents] = useState("");

  LogBox.ignoreLogs(["Warning: componentWillReceiveProps has been renamed"]);

  useEffect(() => {
    setEvents([
      {
        start: "2023-09-01 00:30:00",
        end: "2023-09-01 02:30:00",
        title: "Mariana Joseph",
        summary: "3412 Piedmont Rd NE, GA 3032",
      },
    ]);
  }, []);

  const eventTapped = (event) => {
    Alert.alert("Event Tapped", JSON.stringify(event));
  };

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <EventCalendar
        eventTapped={eventTapped}
        events={events}
        width={width}
        initDate={"2023-09-01"}
        scrollToFirst
        upperCaseHeader
        uppercase
      />
    </View>
  );
};

export default ICalendar;
