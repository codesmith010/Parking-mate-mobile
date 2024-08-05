import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import clearToken from "../../services/clearToken";
import Colors from "../../constants/Colors";
import Checkbox from "expo-checkbox";
import { useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import MultipleImageUpload from "../../components/MultipleImageUpload";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Icon, { Icons } from "../../components/Icon";
import SingleImageUpload from "../../components/SingleImageUpload";
import BannerAd from "../../components/BannerAd";

const IProfile = ({ navigation }) => {
  const { user, isLoading, error } = useSelector((state) => state.user);

  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleLogout = () => {
    clearToken();
    navigation.navigate("Welcome");
  };

  const handleChangePasswordNavigation = () => {
    navigation.navigate("ChangePassword");
  };

  function formatDateToCustomFormat(inputDate) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateParts = inputDate.split("T")[0].split("-");
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const day = dateParts[2];

    return `${day}-${month}-${year}`;
  }

  const formattedDate = formatDateToCustomFormat(user.dateOfBirth);

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

  const phoneCode = getPhoneCodeByCountryName(user.country);
  // console.log(phoneCode); // Output: "+1"

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* <View
          style={{
            // backgroundColor: "red",
            width: "100%",
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: -60,
          }}
        >
          <View style={{ position: "relative" }}>
            <Image
              style={{
                borderWidth: 3,
                borderColor: "#03DAC6",
                borderRadius: 60,
              }}
              source={require("../../../assets/profile.png")}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 5,
                right: -15,
              }}
            >
              <Icon
                size={24}
                name={faCamera}
                type={Icons.FontAwesomeIcon}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        </View> */}
        <SingleImageUpload />
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            marginTop: 60,
          }}
        >
          <Text
            style={[
              styles.profileInfo,
              { fontSize: 20, fontWeight: "600", marginVertical: 5 },
            ]}
          >
            {user.firstName + " " + user.lastName}
          </Text>
          <Text style={[styles.profileInfo, { fontSize: 12, opacity: 0.7 }]}>
            {user.email}
          </Text>
          <Text style={[styles.profileInfo, { fontSize: 14 }]}>
            Date of birth: {formattedDate}
          </Text>
          <Text style={[styles.profileInfo, { fontSize: 14 }]}>
            {phoneCode + " " + user.phoneNumber}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                color={user.gender === "male" ? "#042768" : "#83a0d6"}
                style={{
                  borderWidth: user.gender === "male" ? 3 : 1,
                  borderRadius: 12,
                }}
                value={user.gender === "male" ? true : false}
                // onValueChange={handleIsStudent}
              />
              <Text style={styles.profileInfo}>Male</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                color={user.gender === "female" ? "#042768" : "#83a0d6"}
                style={{
                  borderWidth: user.gender === "female" ? 3 : 1,
                  borderRadius: 12,
                }}
                value={user.gender === "female" ? true : false}
                // onValueChange={handleIsInstructor}
              />
              <Text style={styles.profileInfo}>Female</Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
            gap: 8,
          }}
        >
          <MultipleImageUpload />

          <TextInput
            style={styles.inputStyle}
            value={"Zip Code: " + user.zipCode}
            readOnly
          />
          <TextInput
            style={styles.inputStyle}
            value={"City: " + user.city}
            readOnly
          />
          <TextInput
            style={styles.inputStyle}
            value={"Country: " + user.country}
            readOnly
          />
          <TextInput
            style={styles.inputStyle}
            value={"Status: " + user.AccountStatus}
            readOnly
          />
          <View style={{ width: "90%", alignItems: "center", marginTop: 5 }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleChangePasswordNavigation}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <BannerAd />
    </View>
  );
};

export default IProfile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 30,
    backgroundColor: Colors.white,
  },
  profileContainer: {
    backgroundColor: Colors.primaryDark,
    width: "90%",
    height: "90%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    // borderRadius: 18,
    justifyContent: "space-between",
  },
  profileInfo: {
    color: Colors.white,
  },
  inputStyle: {
    color: Colors.white,
    backgroundColor: "#59616A",
    padding: 12,
    width: "90%",
    borderRadius: 12,
    borderWidth: 0.3,
    borderColor: Colors.white,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryAlpha,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
    borderColor: Colors.white,
    borderWidth: 0.4,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
