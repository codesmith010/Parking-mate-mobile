import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSpecificAdvertiseClass,
  fetchAdvertiseClasses,
} from "../features/advertiseClass/advertiseClassActions";
import { useNavigation } from "@react-navigation/native";
import { deleteNeedCoverSpecific } from "../features/needCover/needCoverActions";

const INeedClassModal = ({
  modalVisible,
  handleModalVisibility,
  data,
  handleRefreshNeedCover,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  function getPhoneCodeByCountryName(countryName) {
    // Define a mapping of country names to phone codes
    const countryPhoneCodes = {
      "United States": "+1",
      Canada: "+1",
      "United Kingdom": "+44",
      Australia: "+61",
      Germany: "+49",
      France: "+33",
      Italy: "+39",
      Spain: "+34",
      Japan: "+81",
      China: "+86",
      India: "+91",
      Brazil: "+55",
      Mexico: "+52",
      "South Korea": "+82",
      Russia: "+7",
      Turkey: "+90",
      Argentina: "+54",
      "South Africa": "+27",
      Egypt: "+20",
      Nigeria: "+234",
      Kenya: "+254",
      Ghana: "+233",
      "Saudi Arabia": "+966",
      "United Arab Emirates": "+971",
      Qatar: "+974",
      Singapore: "+65",
      Malaysia: "+60",
      Indonesia: "+62",
      Thailand: "+66",
      Vietnam: "+84",
      Philippines: "+63",
      Pakistan: "+92",
      Bangladesh: "+880",
      "Sri Lanka": "+94",
      "New Zealand": "+64",
      Canada: "+1",
      Mexico: "+52",
      Argentina: "+54",
      Chile: "+56",
      Colombia: "+57",
      Peru: "+51",
      Ecuador: "+593",
      Venezuela: "+58",
      Netherlands: "+31",
      Belgium: "+32",
      Switzerland: "+41",
      Austria: "+43",
      Sweden: "+46",
      Norway: "+47",
      Denmark: "+45",
      Finland: "+358",
      Greece: "+30",
    };

    // Convert the country name to title case for consistent matching
    const formattedCountryName = countryName
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());

    // Check if the country name exists in the mapping
    if (formattedCountryName in countryPhoneCodes) {
      return countryPhoneCodes[formattedCountryName];
    } else {
      return "Country not found";
    }
  }

  // Define a function to handle contacting the instructor
  const handleContactInstructor = async (countryName, contactNumber) => {
    const phoneCode = getPhoneCodeByCountryName(countryName);

    // Replace these values with the actual instructor's phone number or message link
    const phoneNumber = phoneCode + contactNumber;

    // Show an Alert with options to call or message the instructor
    Alert.alert(
      "Contact Instructor",
      "Choose how you want to contact the instructor:",
      [
        {
          text: "Call",
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
        {
          text: "Message",
          onPress: () => {
            Linking.openURL(`sms:${phoneNumber}`);
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  // Handle Delete
  const handleDeleteNeedCoverClass = async (classID) => {
    console.log("classID: ", classID);
    console.log("handleRefreshNeed: ", () => handleRefreshNeedCover);
    handleModalVisibility();
    const deleteDispatch = await dispatch(
      deleteNeedCoverSpecific({
        classID: classID,
      })
    );
    console.log("d>dispatchr ", deleteDispatch);
    if (deleteDispatch) {
      handleRefreshNeedCover();
      // const mydis = await dispatch(fetchAdvertiseClasses(user._id));
      // console.log("mydis: ", mydis);
    }
  };
  // Handle View Students Class
  // const handleViewStudents = async (studentData) => {
  //   console.log("canncoverdata: ", studentData);
  //   handleModalVisibility();
  //   navigation.navigate("ViewStudents", {
  //     studentData: studentData,
  //   });
  // };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          handleModalVisibility();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require("../../assets/calendar.png")}
              style={{ width: 40, height: 40 }}
            />

            <View style={styles.modalViewText}>
              <Text style={styles.modalText}>
                Instructor : {data.userID.FirstName} {data.userID.LastName}
              </Text>
              <Text style={styles.modalText}>Class : {data.ClassName}</Text>
              <Text style={styles.modalText}>
                Class Type : {data.SelectClassType}
              </Text>
              {data.Styles === "none" ? (
                ""
              ) : (
                <Text style={styles.modalText}>Styles : {data.Styles}</Text>
              )}
              <Text style={styles.modalText}>Date: {data.StartDate}</Text>
              <Text style={styles.modalText}>Time: {data.StartTime}</Text>
              <Text style={styles.modalText}>
                Duration: {data.Duration} hours
              </Text>
              <Text style={styles.modalText}>
                Charges: ${data.CostPerSession}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.btnInstructor]}
              onPress={() =>
                handleContactInstructor(data.Country, data.userID.PhoneNumber)
              }
            >
              <Text style={styles.textStyle}>Contact instructor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.btnInstructor,
                { backgroundColor: Colors.primaryDark },
              ]}
              // onPress={() => handleViewStudents(data.ClassID)}
            >
              <Text style={styles.textStyle}>View Students</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.btnInstructor,
                { backgroundColor: "red" },
              ]}
              onPress={() => handleDeleteNeedCoverClass(data._id)}
            >
              <Text style={styles.textStyle}>Delete Class</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.button, styles.hideModal]}
              onPress={handleModalVisibility}
            >
              <Text style={{ color: Colors.black, fontWeight: "bold" }}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default INeedClassModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    gap: 10,
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
  modalViewText: {
    alignItems: "flex-start",
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
  btnInstructor: {
    backgroundColor: "green",
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
  },
  hideModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
