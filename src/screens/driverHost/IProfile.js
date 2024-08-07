import Checkbox from "expo-checkbox";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import SingleImageUpload from "../../components/SingleImageUpload";
import Colors from "../../constants/Colors";
import clearToken from "../../services/clearToken";

const IProfile = ({ navigation }) => {
  const { user, isLoading, error } = useSelector((state) => state.user);

  const handleLogout = () => {
    clearToken();
    navigation.navigate("Welcome");
  };

  const handleChangePasswordNavigation = () => {
    navigation.navigate("ChangePassword");
  };

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

  const phoneCode = getPhoneCodeByCountryName("United States");

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
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
            {phoneCode + " " + user.phoneNumber}
          </Text>
        </View>

        <View style={styles.profileInputContainer}>
          <TextInput
            style={styles.inputStyle}
            value={"Status: " + user.AccountStatus}
            readOnly
          />
        </View>
      </View>
    </View>
  );
};

export default IProfile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",

    gap: 30,
    marginTop: 100,
    backgroundColor: Colors.white,
  },
  profileContainer: {
    backgroundColor: Colors.primaryColor,
    width: "90%",
    height: "30%",
    borderRadius: 18,
  },
  profileInfo: {
    color: Colors.white,
  },
  profileInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },
  inputStyle: {
    color: Colors.primaryColor,
    backgroundColor: Colors.primaryLight,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    borderWidth: 0.3,
    borderColor: Colors.white,
    fontWeight: "bold",
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
