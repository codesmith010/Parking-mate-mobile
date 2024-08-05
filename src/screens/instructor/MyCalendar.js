import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Agenda } from "react-native-calendars";
import NewModal from "../../components/IAdvertiseClassModal";
import AgendaItem from "../../components/AgendaItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvertiseClasses } from "../../features/advertiseClass/advertiseClassActions";
import Colors from "../../constants/Colors";

const MyCalendar = () => {
  const { user } = useSelector((state) => state.user);
  const { AdvertiseClassesData, isFetching } = useSelector(
    (state) => state.AdvertiseClass
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [items, setItems] = useState({});
  const [update, setUpdate] = useState(false); // for update data from modal
  const [refreshing, setRefreshing] = useState(false); // for pull to refresh

  const dispatch = useDispatch();

  console.log("Update: ", update);

  // Fetching the advertiseClassData
  useEffect(() => {
    dispatch(fetchAdvertiseClasses(user._id));
  }, [dispatch, update]);

  console.log("MYITEMMMMMMSSSSSSS: ", items);
  console.log("AdvertiseClassesData: ", AdvertiseClassesData);

  // const agendaItems = [
  //   {
  //     title: dates[0],
  //     data: [{ hour: "12am", duration: "1h", title: "First Yoga" }],
  //   },
  // {
  //   title: dates[1],
  //   data: [
  //     { hour: "4pm", duration: "1h", title: "Pilates ABC" },
  //     { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
  //   ],
  // },
  // {
  //   title: dates[2],
  //   data: [
  //     { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
  //     { hour: "2pm", duration: "1h", title: "Deep Stretches" },
  //     { hour: "3pm", duration: "1h", title: "Private Yoga" },
  //   ],
  // },
  // {
  //   title: dates[3],
  //   data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
  // },
  // {
  //   title: dates[4],
  //   data: [{}],
  // },
  // {
  //   title: dates[5],
  //   data: [
  //     { hour: "9pm", duration: "1h", title: "Middle Yoga" },
  //     { hour: "10pm", duration: "1h", title: "Ashtanga" },
  //     { hour: "11pm", duration: "1h", title: "TRX" },
  //     { hour: "12pm", duration: "1h", title: "Running Group" },
  //   ],
  // },
  // {
  //   title: dates[6],
  //   data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
  // },
  // {
  //   title: dates[7],
  //   data: [{}],
  // },
  // {
  //   title: dates[8],
  //   data: [
  //     { hour: "9pm", duration: "1h", title: "Pilates Reformer" },
  //     { hour: "10pm", duration: "1h", title: "Ashtanga" },
  //     { hour: "11pm", duration: "1h", title: "TRX" },
  //     { hour: "12pm", duration: "1h", title: "Running Group" },
  //   ],
  // },
  // {
  //   title: dates[9],
  //   data: [
  //     { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
  //     { hour: "2pm", duration: "1h", title: "Deep Stretches" },
  //     { hour: "3pm", duration: "1h", title: "Private Yoga" },
  //   ],
  // },
  // {
  //   title: dates[10],
  //   data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
  // },
  // {
  //   title: dates[11],
  //   data: [
  //     { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
  //     { hour: "2pm", duration: "1h", title: "Deep Stretches" },
  //     { hour: "3pm", duration: "1h", title: "Private Yoga" },
  //   ],
  // },
  // {
  //   title: dates[12],
  //   data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
  // },
  // {
  //   title: dates[13],
  //   data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
  // },
  // ];
  // Replace this with your data fetching logic
  const updateCalendarData = () => {
    if (Object.keys(AdvertiseClassesData).length > 0) {
      return setItems(AdvertiseClassesData);
    }
    return;
  };

  // Pull to refresh
  const onRefresh = () => {
    // This function will be called when the user pulls down to refresh
    setRefreshing(true);

    // Add your refresh logic here
    dispatch(fetchAdvertiseClasses(user._id)).then(() => {
      setRefreshing(false);
    });
  };
  // -----------

  useEffect(() => {
    updateCalendarData();
  }, [AdvertiseClassesData]);

  // handle data update
  const handleUpdate = () => {
    setUpdate(!update);
  };

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

  const testData = {
    "2023-09-18": [{ name: "Event 3" }, { name: "Event 4" }],
    "2023-09-19": [{ name: "Event 6" }],
  };

  // Initialize an empty object for marked dates
  const markedDates = {};

  // Iterate through the API data and mark each date
  for (const date in AdvertiseClassesData) {
    if (Object.hasOwnProperty.call(AdvertiseClassesData, date)) {
      // Here, we mark the date as selected and add any other properties you need
      markedDates[date] = { selected: true, marked: true };
    }
  }

  // Now, markedDates will contain the marked dates as required
  console.log(markedDates);

  const firstUniqueName = Object.keys(AdvertiseClassesData)[0];

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primaryColor}
          />
        }
        // style={{ marginTop: 10 , padding: 5 }}
        // items={items}
        // items={testData}
        items={AdvertiseClassesData}
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

          <AgendaItem item={item} handleUpdate={handleUpdate} />
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

export default MyCalendar;
