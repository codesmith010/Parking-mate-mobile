import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { Agenda } from "react-native-calendars";
import IAgendaItemCanCover from "../../components/IAgendaItemCanCover";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchNeedCover } from "../../features/needCover/needCoverActions";

const CanCoverResult = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.user);
  // const { SearchClassesData, isFetching, error } = useSelector(
  //   (state) => state.SearchClass
  // );

  const { NeedCoverData, isLoading, error } = useSelector(
    (state) => state.NeedCovers
  );
  console.log("NeedCoverData: >><><<::: ", NeedCoverData);
  const { ClassesQuery } = route.params;
  console.log("ClassesQuery: ", ClassesQuery);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const dispatch = useDispatch();

  console.log("ERROR: ", error);

  // Fetching the advertiseClassData
  useEffect(() => {
    // dispatch(fetchAdvertiseClasses(user._id));
    dispatch(fetchNeedCover(ClassesQuery));
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
  for (const date in NeedCoverData) {
    if (Object.hasOwnProperty.call(NeedCoverData, date)) {
      // Here, we mark the date as selected and add any other properties you need
      markedDates[date] = { selected: true, marked: true };
    }
  }

  // Now, markedDates will contain the marked dates as required
  console.log(markedDates);

  const firstUniqueName = Object.keys(NeedCoverData)[0];

  if (error?.message === "Need Cover classes not found") {
    return (
      <SafeAreaProvider>
        <CustomStatusBar backgroundColor="#15326B" />
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
              // backgroundColor: "#fff",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              width: Dimensions.get("window").width,
            }}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ color: "#0741ad" }}
                size={28}
              />
            </Pressable>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 15 }}>
              LIST OF CLASSES WHICH I CAN COVER
            </Text>
            <Text></Text>
          </View>
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
        </View>
      </SafeAreaProvider>
    );
  }
  if (isLoading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={isLoading} size="large" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="#15326B" />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
            // backgroundColor: "#fff",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            width: Dimensions.get("window").width,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ color: "#0741ad" }}
              size={28}
            />
          </Pressable>
          <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 15 }}>
            LIST OF CLASSES WHICH I CAN COVER
          </Text>
          <Text></Text>
        </View>

        <Agenda
          // style={{ marginTop: 10 , padding: 5 }}
          // items={items}
          // items={testData}
          items={NeedCoverData}
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

            <IAgendaItemCanCover item={item} />
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
    </SafeAreaProvider>
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

export default CanCoverResult;
