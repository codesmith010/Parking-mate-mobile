import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Agenda } from "react-native-calendars";
import SAgendaItem from "../../components/SAgendaItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentBookings } from "../../features/getStudentBookingHistory/getStudentBookingHistoryActions";

const SClassHistory = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { BookingHistory, isFetching } = useSelector(
    (state) => state.GetStudentBookingHistory
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const dispatch = useDispatch();

  // Fetching the advertiseClassData
  useEffect(() => {
    // dispatch(fetchAdvertiseClasses(user._id));
    dispatch(fetchStudentBookings(user._id));
  }, [dispatch]);

  console.log("STUDENT BOOKING QUERY: : ", BookingHistory);

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
  for (const date in BookingHistory) {
    if (Object.hasOwnProperty.call(BookingHistory, date)) {
      // Here, we mark the date as selected and add any other properties you need
      markedDates[date] = { selected: true, marked: true };
    }
  }

  // Now, markedDates will contain the marked dates as required
  console.log(markedDates);

  const firstUniqueName = Object.keys(BookingHistory)[0];

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
        // style={{ marginTop: 10 , padding: 5 }}
        // items={items}
        // items={testData}
        items={BookingHistory}
        selected={firstUniqueName} // Set the initially selected date
        showOnlySelectedDayItems={true}
        // markedDates={{
        //   "2023-09-23": { selected: true, marked: true },
        //   "2023-09-24": { marked: true },
        //   "2023-09-27": { disabled: true },
        // }}
        markedDates={markedDates}
        pastScrollRange={1}
        futureScrollRange={1}
        renderItem={(item) => (
          // <TouchableOpacity
          //   style={styles.item}
          //   onPress={() => handleModal(item)}
          // >
          //   <Text>{item.name}</Text>
          //   <Text>{item.time}</Text>
          // {modalVisible && (
          //   <NewModal
          //     modalVisible={modalVisible}
          //     handleModalVisibility={handleModalVisibility}
          //     data={selectedData}
          //   />
          // )}
          // </TouchableOpacity>

          <SAgendaItem item={item} />
        )}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {
          console.log("day changed", day);
        }}
      />
      {/* <Agenda
          items={items}
          selected={"2023-09-14"} // Set the initially selected date
          renderItem={(item) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
            </View>
          )}
        /> */}
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

export default SClassHistory;
