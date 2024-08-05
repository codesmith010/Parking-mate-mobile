import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import SAgendaItem from "../../components/SAgendaItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchClass } from "../../features/searchClass/searchClassActions";

const SCalendarResult = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { SearchClassesData, isFetching, error } = useSelector(
    (state) => state.SearchClass
  );
  const { ClassesQuery } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const dispatch = useDispatch();

  console.log("ERROR: ", error);

  // Fetching the advertiseClassData
  useEffect(() => {
    // dispatch(fetchAdvertiseClasses(user._id));
    dispatch(fetchSearchClass(ClassesQuery));
  }, [dispatch]);

  console.log("CLASSES QUERY: : ", ClassesQuery);

  // for close modal
  const handleModalVisibility = () => {
    setModalVisible(false);
  };

  // onPress Modal
  const handleModal = (data) => {
    console.log("selected: ", data);
    setSelectedData(data);
    setModalVisible(!modalVisible);
  };

  // Initialize an empty object for marked dates
  const markedDates = {};

  // Iterate through the API data and mark each date
  for (const date in SearchClassesData) {
    if (Object.hasOwnProperty.call(SearchClassesData, date)) {
      // Here, we mark the date as selected and add any other properties you need
      markedDates[date] = { selected: true, marked: true };
    }
  }

  // Now, markedDates will contain the marked dates as required
  console.log(markedDates);

  const firstUniqueName = Object.keys(SearchClassesData)[0];

  if (error?.message === "Classes not found.") {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{error?.message}</Text>
      </View>
    );
  }
  if (isFetching) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={isFetching} size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Agenda
        items={SearchClassesData}
        selected={firstUniqueName} // Set the initially selected date
        showOnlySelectedDayItems={true}
        markedDates={markedDates}
        pastScrollRange={1}
        futureScrollRange={1}
        renderItem={(item) => <SAgendaItem item={item} />}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {
          console.log("day changed", day);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SCalendarResult;
