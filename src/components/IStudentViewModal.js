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
import { deleteCanCoverSpecific } from "../features/canCover/canCoverActions";
import { removeStudentBookingSpecific } from "../features/getStudentBookingHistory/getStudentBookingHistoryActions";

const IStudentViewModal = ({
  modalVisible,
  handleModalVisibility,
  data,
  classID,
  handleRefreshData,
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
  const handleRemoveStudent = async (studentID) => {
    console.log("classID, ", classID, " studentID  ", studentID);

    handleModalVisibility();
    const removeDispatch = await dispatch(
      removeStudentBookingSpecific({
        classID: classID,
        studentID: studentID,
      })
    );
    console.log("d>dispatchr ", removeDispatch);
    if (removeDispatch) {
      handleRefreshData();
      Alert.alert(removeDispatch.payload.message);
      return;
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
            {/* <Image
              source={require("../../assets/calendar.png")}
              style={{ width: 40, height: 40 }}
            /> */}
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 15,
              }}
            >
              Student Info
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.btnInstructor]}
              onPress={() =>
                handleContactInstructor(data.Country, data.PhoneNumber)
              }
            >
              <Text style={styles.textStyle}>Contact Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.btnInstructor,
                { backgroundColor: "red" },
              ]}
              onPress={() => handleRemoveStudent(data._id)}
            >
              <Text style={styles.textStyle}>Remove Student</Text>
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

export default IStudentViewModal;

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
