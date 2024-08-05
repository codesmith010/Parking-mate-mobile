import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Agenda,
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import IAdvertiseClassModal from "../../components/IAdvertiseClassModal";
import AgendaItem from "../../components/AgendaItem";
import { fetchAdvertiseClasses } from "../../features/advertiseClass/advertiseClassActions";
import { useSelector, useDispatch } from "react-redux";

const MyExpandableCalendar = () => {
  const { user } = useSelector((state) => state.user);
  const { AdvertiseClassesData, isLoading } = useSelector(
    (state) => state.AdvertiseClass
  );

  // Fetching the advertiseClassData
  useEffect(() => {
    dispatch(fetchAdvertiseClasses(user._id));
  }, [dispatch]);

  console.log(
    "AdvertiseClassesData: >>>>>>>>>>>>>>>>>>>> ",
    AdvertiseClassesData
  );
  // const [modalVisible, setModalVisible] = useState(false);
  // const [selectedData, setSelectedData] = useState("");
  // const [items, setItems] = useState({});

  // // Replace this with your data fetching logic
  // const fetchCalendarData = () => {
  //   // Simulated data for demonstration
  //   const calendarData = {
  //     "2023-09-17": [
  //       { name: "Event 1", time: "10:00 AM" },
  //       { name: "Event 2", time: "10:00 AM" },
  //     ],

  //     "2023-09-18": [{ name: "Event 3" }, { name: "Event 4" }],
  //   };

  //   setItems(calendarData);
  // };

  // useEffect(() => {
  //   fetchCalendarData();
  // }, []);

  // // for close modal
  // const handleModalVisibility = () => {
  //   setModalVisible(false);
  // };

  // // onPress Modal
  // const handleModal = (data) => {
  //   console.log("selected: ", data);
  //   setSelectedData(data);
  //   setModalVisible(!modalVisible);
  // };

  console.log(isLoading);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

  function getFutureDates(numberOfDays) {
    const array = [];
    for (let index = 1; index <= numberOfDays; index++) {
      let d = Date.now();
      if (index > 8) {
        // set dates on the next month
        const newMonth = new Date(d).getMonth() + 1;
        d = new Date(d).setMonth(newMonth);
      }
      const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
      const dateString = date.toISOString().split("T")[0];
      array.push(dateString);
    }
    return array;
  }

  function getPastDate(numberOfDays) {
    return new Date(Date.now() - 864e5 * numberOfDays)
      .toISOString()
      .split("T")[0];
  }

  const fastDate = getPastDate(3);
  const futureDates = getFutureDates(12);
  const dates = [fastDate, today].concat(futureDates);
  // console.log("dates: ", dates);

  // const agendaItems = [
  //   {
  //     title: dates[0],
  //     data: [
  //       { hour: "12am", duration: "1h", title: "First Yoga" },
  //       {
  //         Address:
  //           "North American University (NAU), West Airport Boulevard, Stafford, TX, USA",
  //         City: "Stafford",
  //         ClassName: "MyYoga",
  //         CostPerSession: "80",
  //         Country: "United States",
  //         Duration: "8",
  //         EndDate: "9/30/2023",
  //         Group: true,
  //         LevelOfClass: "In Person Class",
  //         Offline: false,
  //         OneToOne: false,
  //         Online: true,
  //         SelectClassType: "Pilates",
  //         StartDate: "9/29/2023",
  //         StartTime: "1:15 PM",
  //         State: "Alaska",
  //         Styles: "Classical Pilates (Smart Body)",
  //         TotalStudents: "10",
  //         ZipCode: "90901",
  //         __v: 0,
  //         _id: "65089cc4dde834929153b629",
  //         userID: "64fdf1a9264fdb0131cdc5e9",
  //       },
  //     ],
  //   },
  // ];

  const agendaItems = [
    {
      title: dates[0],
      data: [
        {
          hour: "12am",
          duration: "1h",
          title: "First Yoga",
          ClassName: "MyYoga",
          CostPerSession: "80",
          Country: "United States",
          Duration: "8",
        },
      ],
    },
    {
      title: dates[1],
      data: [
        { hour: "5pm", duration: "1h", title: "Pilates ABC" },
        { hour: "4pm", duration: "1h", title: "Vinyasa Yoga" },
      ],
    },
    {
      title: dates[2],
      data: [
        { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
        { hour: "2pm", duration: "1h", title: "Deep Stretches" },
        { hour: "3pm", duration: "1h", title: "Private Yoga" },
      ],
    },
    {
      title: dates[3],
      data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
    },
    {
      title: dates[4],
      data: [{}],
    },
    {
      title: dates[5],
      data: [
        { hour: "9pm", duration: "1h", title: "Middle Yoga" },
        { hour: "10pm", duration: "1h", title: "Ashtanga" },
        { hour: "11pm", duration: "1h", title: "TRX" },
        { hour: "12pm", duration: "1h", title: "Running Group" },
      ],
    },
    {
      title: dates[6],
      data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
    },
    {
      title: dates[7],
      data: [{}],
    },
    {
      title: dates[8],
      data: [
        { hour: "9pm", duration: "1h", title: "Pilates Reformer" },
        { hour: "10pm", duration: "1h", title: "Ashtanga" },
        { hour: "11pm", duration: "1h", title: "TRX" },
        { hour: "12pm", duration: "1h", title: "Running Group" },
      ],
    },
    {
      title: dates[9],
      data: [
        { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
        { hour: "2pm", duration: "1h", title: "Deep Stretches" },
        { hour: "3pm", duration: "1h", title: "Private Yoga" },
      ],
    },
    {
      title: dates[10],
      data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
    },
    {
      title: dates[11],
      data: [
        { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
        { hour: "2pm", duration: "1h", title: "Deep Stretches" },
        { hour: "3pm", duration: "1h", title: "Private Yoga" },
      ],
    },
    {
      title: dates[12],
      data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
    },
    {
      title: dates[13],
      data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
    },
  ];

  const renderItem = useCallback(({ item }) => {
    console.log("item: ", item);
    return <AgendaItem item={item} />;
  }, []);

  return (
    <CalendarProvider showTodayButton date={agendaItems[1]?.title}>
      <ExpandableCalendar
        disableVirtualization
        disableAllTouchEventsForDisabledDays
        disableAllTouchEventsForInactiveDays
        // style={{ overflow: "hidden", flex: 1 }}
        // calendarStyle={styles.calendar}
        initialPosition={ExpandableCalendar.positions.CLOSED}
        horizontal={false}
        showClosingKnob={true}
        hideKnob={false}
        initialNumToRender={2}
        showSixWeeks
      />
      {/* <FlatList
        data={agendaItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.title} // Use a unique key for each item
      /> */}
      <AgendaList
        disableVirtualization
        sections={agendaItems}
        renderItem={renderItem}
        scrollToNextEvent
        sectionStyle={styles.section}
        initialNumToRender={2}
        // scrollEnabled={false}

        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
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
    agendaItems: "center",
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
  section: {
    backgroundColor: "white",
    color: "grey",
    textTransform: "capitalize",
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default MyExpandableCalendar;
