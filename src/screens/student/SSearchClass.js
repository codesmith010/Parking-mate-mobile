import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvertiseClasses } from "../../features/advertiseClass/advertiseClassActions";
import { fetchSearchClass } from "../../features/searchClass/searchClassActions";
import BannerAd from "../../components/BannerAd";

const SSearchClass = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { SearchClassesData, isFetching } = useSelector(
    (state) => state.SearchClass
  );
  const [showYoga, setShowYoga] = useState(false);
  const [showZumba, setShowZumba] = useState(false);
  const [showPilates, setShowPilates] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  // const [duration, setTimeTo] = useState(new Date());
  const [searchClassData, setSearchClassData] = useState({
    userID: user._id,
    SelectClassType: "",
    Styles: "none",
    LevelOfClass: "",
    Address: "",
    State: "",
    City: "",
    Country: "",
    StartDate: "",
    StartTime: "",
    Duration: "",
  });

  // console.log("SEARCH CLASS DATA: ", searchClassData);

  console.log("UseSelectorss SearchClass: ", SearchClassesData);

  const dispatch = useDispatch();

  // handle address
  const handleStudentAddressSelect = (addressData) => {
    const { address, city, country } = addressData;
    setSearchClassData((prevData) => ({
      ...prevData,
      Address: address,
      City: city,
      Country: country,
    }));
  };

  // handling start date change
  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartDate(currentDate);
    setSearchClassData({
      ...searchClassData,
      StartDate: currentDate.toLocaleDateString(),
    });
  };
  // handling end date change
  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndDate(currentDate);
    setSearchClassData({
      ...searchClassData,
      EndDate: currentDate.toLocaleDateString(),
    });
  };

  // handling time from change
  const handleStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setStartTime(currentTime);
    setSearchClassData({
      ...searchClassData,
      StartTime: currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };
  // handling time to change
  // const handleTimeToChange = (event, selectedTime) => {
  //   const currentTime = selectedTime || time;
  //   setTimeTo(currentTime);
  //   setSearchClassData({
  //     ...searchClassData,
  //     TimeTo: currentTime.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   });
  // };

  // handle can cover class
  const handleSearchClass = () => {
    // Check if any field in needCoverData is empty
    for (const key in searchClassData) {
      if (searchClassData[key] === "") {
        Alert.alert("Please fill in all fields");
        return;
      }
    }
    // Dispatch the createCanCover action
    dispatch(fetchSearchClass(searchClassData));
    navigation.navigate("SearchClass", {
      screen: "ViewResults",
      params: {
        ClassesQuery: searchClassData,
      },
    });
  };

  console.log("SEARCH CLASS DATA: ", searchClassData);

  const pickerClassType = [
    { label: "Yoga", value: "Yoga" },
    { label: "Zumba", value: "Zumba" },
    { label: "Pilates", value: "Pilates" },
    { label: "Aerobic Gymnastics", value: "Aerobic Gymnastics" },
    { label: "Badminton", value: "Badminton" },
    { label: "Baseball", value: "Baseball" },
    { label: "Basketball", value: "Basketball" },
    { label: "Bowling", value: "Bowling" },
    { label: "Boxing", value: "Boxing" },
    { label: "Cricket", value: "Cricket" },
    { label: "Dance Fitness", value: "Dance Fitness" },
    { label: "Fencing", value: "Fencing" },
    { label: "Figure Skating", value: "Figure Skating" },
    { label: "Football (U.K)", value: "Football (U.K)" },
    { label: "Soccer (U.S)", value: "Soccer (U.S)" },
    { label: "Golf", value: "Golf" },
    { label: "Handball", value: "Handball" },
    { label: "Hockey", value: "Hockey" },
    { label: "Ice Hockey", value: "Ice Hockey" },
    { label: "Ice Skating", value: "Ice Skating" },
    { label: "Judo", value: "Judo" },
    { label: "Karate", value: "Karate" },
    { label: "Kendo", value: "Kendo" },
    { label: "Kick Boxing", value: "Kick Boxing" },
    { label: "Mixed Martial Arts", value: "Mixed Martial Arts" },
    { label: "Rugby", value: "Rugby" },
    { label: "Sailing", value: "Sailing" },
    { label: "Squash", value: "Squash" },
    { label: "Table Tennis", value: "Table Tennis" },
    { label: "Taekwondo", value: "Taekwondo" },
    { label: "Tennis", value: "Tennis" },
    { label: "Track and Field", value: "Track and Field" },
    { label: "Trampolining", value: "Trampolining" },
    { label: "Volleyball", value: "Volleyball" },
    { label: "Weightlifting", value: "Weightlifting" },
    { label: "Wrestling", value: "Wrestling" },
  ];

  const pickerPrimaryYogaItems = [
    { label: "Vinyasa yoga", value: "Vinyasa yoga" },
    { label: "Hatha yoga", value: "Hatha yoga" },
    { label: "Iyengar yoga", value: "Iyengar yoga" },
    { label: "Kundalini yoga", value: "Kundalini yoga" },
    { label: "Ashtanga yoga", value: "Ashtanga yoga" },
    { label: "Bikram yoga", value: "Bikram yoga" },
    { label: "Yin yoga", value: "Yin yoga" },
    { label: "Restorative yoga", value: "Restorative yoga" },
    { label: "Prenatal yoga", value: "Prenatal yoga" },
    { label: "Anusara yoga", value: "Anusara yoga" },
    { label: "Jivamukti yoga", value: "Jivamukti yoga" },
  ];

  const pickerPrimaryZumbaItems = [
    { label: "Zumba Gold", value: "Zumba Gold" },
    { label: "Zumba Dance", value: "Zumba Dance" },
    { label: "Zumba Classic", value: "Zumba Classic" },
    { label: "Aqua Zumba", value: "Aqua Zumba" },
    { label: "Zumba Kids", value: "Zumba Kids" },
    { label: "Zumba Gold-Toning", value: "Zumba Gold-Toning" },
    { label: "Zumba Strong", value: "Zumba Strong" },
  ];

  const pickerPrimaryPilatesItems = [
    { label: "Everyday Pilates", value: "Everyday Pilates" },
    { label: "Polestar Pilates", value: "Polestar Pilates" },
    {
      label: "Classical Pilates (Smart Body)",
      value: "Classical Pilates (Smart Body)",
    },
    { label: "Stott Pilates", value: "Stott Pilates" },
  ];

  const pickerEnvironmentClass = [
    {
      label: "In Person Class",
      value: "In Person Class",
    },
    { label: "In Person 1:1", value: "In Person 1:1" },
    { label: "Virtual", value: "Virtual" },
  ];

  const pickerStates = [
    // States of the USA
    { label: "Alabama", value: "Alabama" },
    { label: "Alaska", value: "Alaska" },
    { label: "Arizona", value: "Arizona" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Iowa", value: "Iowa" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Maine", value: "Maine" },
    { label: "Maryland", value: "Maryland" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Missouri", value: "Missouri" },
    { label: "Montana", value: "Montana" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "Nevada", value: "Nevada" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "New York", value: "New York" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Vermont", value: "Vermont" },
    { label: "Virginia", value: "Virginia" },
    { label: "Washington", value: "Washington" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "Wyoming", value: "Wyoming" },

    // Canadian provinces/territories
    { label: "Alberta", value: "Alberta" },
    { label: "British Columbia", value: "British Columbia" },
    { label: "Manitoba", value: "Manitoba" },
    { label: "New Brunswick", value: "New Brunswick" },
    { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    { label: "Nova Scotia", value: "Nova Scotia" },
    { label: "Ontario", value: "Ontario" },
    { label: "Prince Edward Island", value: "Prince Edward Island" },
    { label: "Quebec", value: "Quebec" },
    { label: "Saskatchewan", value: "Saskatchewan" },
    { label: "Northwest Territories", value: "Northwest Territories" },
    { label: "Nunavut", value: "Nunavut" },
    { label: "Yukon", value: "Yukon" },

    // States of Mexico
    { label: "Aguascalientes", value: "Aguascalientes" },
    { label: "Baja California", value: "Baja California" },
    { label: "Baja California Sur", value: "Baja California Sur" },
    { label: "Campeche", value: "Campeche" },
    { label: "Chiapas", value: "Chiapas" },
    { label: "Chihuahua", value: "Chihuahua" },
    { label: "Coahuila", value: "Coahuila" },
    { label: "Colima", value: "Colima" },
    { label: "Durango", value: "Durango" },
    { label: "Guanajuato", value: "Guanajuato" },
    { label: "Guerrero", value: "Guerrero" },
    { label: "Hidalgo", value: "Hidalgo" },
    { label: "Jalisco", value: "Jalisco" },
    { label: "Mexico City", value: "Mexico City" },
    { label: "Michoacán", value: "Michoacán" },
    { label: "Morelos", value: "Morelos" },
    { label: "Nayarit", value: "Nayarit" },
    { label: "Nuevo León", value: "Nuevo León" },
    { label: "Oaxaca", value: "Oaxaca" },
    { label: "Puebla", value: "Puebla" },
    { label: "Querétaro", value: "Querétaro" },
    { label: "Quintana Roo", value: "Quintana Roo" },
    { label: "San Luis Potosí", value: "San Luis Potosí" },
    { label: "Sinaloa", value: "Sinaloa" },
    { label: "Sonora", value: "Sonora" },
    { label: "Tabasco", value: "Tabasco" },
    { label: "Tamaulipas", value: "Tamaulipas" },
    { label: "Tlaxcala", value: "Tlaxcala" },
    { label: "Veracruz", value: "Veracruz" },
    { label: "Yucatán", value: "Yucatán" },
    { label: "Zacatecas", value: "Zacatecas" },
  ];

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="#15326B" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
        style={{
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            flex: 1,
            gap: 30,
          }}
        >
          <View
            style={{
              // backgroundColor: "red",
              width: "90%",
              alignItems: "center",
              gap: 22,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "#0741ad",
                fontSize: 20,
                fontWeight: "bold",
                width: "90%",
              }}
            >
              Search Class
            </Text>

            <View style={styles.inputStyle}>
              <RNPickerSelect
                style={{
                  placeholder: {
                    color: "#3967bd",
                  },
                  inputIOS: {
                    color: "#3967bd",
                  },
                }}
                items={pickerClassType}
                placeholder={{
                  label: "Select Class Type",
                  value: "",
                }}
                onValueChange={(value) => {
                  if (value === "Yoga") {
                    setShowYoga(true);
                    setShowZumba(false);
                    setShowPilates(false);
                    setSearchClassData({
                      ...searchClassData,
                      SelectClassType: value,
                    });
                  } else if (value === "Zumba") {
                    setShowYoga(false);
                    setShowZumba(true);
                    setShowPilates(false);
                    setSearchClassData({
                      ...searchClassData,
                      SelectClassType: value,
                    });
                  } else if (value === "Pilates") {
                    setShowYoga(false);
                    setShowZumba(false);
                    setShowPilates(true);
                    setSearchClassData({
                      ...searchClassData,
                      SelectClassType: value,
                    });
                  } else {
                    setShowYoga(false);
                    setShowZumba(false);
                    setShowPilates(false);
                    setSearchClassData({
                      ...searchClassData,
                      SelectClassType: value,
                    });
                  }
                }}
                value={setSearchClassData.SelectClassType}
              />
            </View>
            {showYoga && (
              <View style={styles.inputStyle}>
                <RNPickerSelect
                  style={{
                    placeholder: {
                      color: "#3967bd",
                    },
                    inputIOS: {
                      color: "#3967bd",
                    },
                  }}
                  onValueChange={(value) => {
                    setSearchClassData({
                      ...searchClassData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryYogaItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={searchClassData.Styles}
                />
              </View>
            )}
            {showZumba && (
              <View style={styles.inputStyle}>
                <RNPickerSelect
                  style={{
                    placeholder: {
                      color: "#3967bd",
                    },
                    inputIOS: {
                      color: "#3967bd",
                    },
                  }}
                  onValueChange={(value) => {
                    setSearchClassData({
                      ...searchClassData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryZumbaItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={searchClassData.Styles}
                />
              </View>
            )}
            {showPilates && (
              <View style={styles.inputStyle}>
                <RNPickerSelect
                  style={{
                    placeholder: {
                      color: "#3967bd",
                    },
                    inputIOS: {
                      color: "#3967bd",
                    },
                  }}
                  onValueChange={(value) => {
                    setSearchClassData({
                      ...searchClassData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryPilatesItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={searchClassData.Styles}
                />
              </View>
            )}
            <View style={styles.inputStyle}>
              <RNPickerSelect
                style={{
                  placeholder: {
                    color: "#3967bd",
                  },
                  inputIOS: {
                    color: "#3967bd",
                  },
                }}
                onValueChange={(value) => {
                  setSearchClassData({
                    ...searchClassData,
                    LevelOfClass: value,
                  });
                }}
                items={pickerEnvironmentClass}
                placeholder={{
                  label: "Level of Class",
                  value: "",
                }}
                value={searchClassData.LevelOfClass}
              />
            </View>

            <TextInput
              style={styles.inputStyle}
              placeholder="Address"
              placeholderTextColor="#3967bd"
              onPressIn={() =>
                navigation.navigate("Address", {
                  onAddressSelect: handleStudentAddressSelect,
                })
              }
              value={searchClassData.Address}
            />

            <View style={styles.inputStyle}>
              <RNPickerSelect
                style={{
                  placeholder: {
                    color: "#3967bd",
                  },
                  inputIOS: {
                    color: "#3967bd",
                  },
                }}
                onValueChange={(value) => {
                  setSearchClassData({
                    ...searchClassData,
                    State: value,
                  });
                }}
                items={pickerStates}
                placeholder={{
                  label: "State Within North America",
                  value: "",
                }}
                value={searchClassData.State}
              />
            </View>

            <TextInput
              style={styles.inputStyle}
              placeholder="City"
              placeholderTextColor="#3967bd"
              value={searchClassData.City}
              onChangeText={(text) =>
                setSearchClassData({
                  ...searchClassData,
                  City: text,
                })
              }
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Country"
              placeholderTextColor="#3967bd"
              value={searchClassData.Country}
              onChangeText={(text) =>
                setSearchClassData({
                  ...searchClassData,
                  Country: text,
                })
              }
            />

            <Pressable style={styles.dateStyle}>
              <Text style={{ color: "#3967bd" }}>
                {searchClassData.StartDate.length > 0
                  ? searchClassData.StartDate
                  : "Select Date"}
              </Text>
              <View
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <RNDateTimePicker
                  style={{ marginTop: 8, height: "80%" }}
                  textColor="blue"
                  mode="date"
                  display="default"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </View>
            </Pressable>

            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Pressable style={styles.dateStyleHalf}>
                <Text style={{ color: "#3967bd" }}>
                  {searchClassData.StartTime.length > 0
                    ? searchClassData.StartTime
                    : "Start Time"}
                </Text>
                <View
                  style={{
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <RNDateTimePicker
                    style={{ marginTop: 8, height: "80%" }}
                    textColor="blue"
                    mode="time"
                    display="default"
                    value={startTime}
                    onChange={handleStartTime}
                  />
                </View>
              </Pressable>
              <TextInput
                style={styles.inputStyleHalf}
                placeholder="Duration (in Hours)"
                placeholderTextColor="#3967bd"
                value={searchClassData.Duration}
                onChangeText={(text) =>
                  setSearchClassData({
                    ...searchClassData,
                    Duration: text,
                  })
                }
              />
            </View>

            {/* ------ */}
          </View>

          <View style={{ width: "90%", alignItems: "center", marginTop: 5 }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSearchClass}
            >
              <Text style={styles.buttonText}>Search Class</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default SSearchClass;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#e6ecf7",
    padding: 12,
    width: "90%",
    borderRadius: 12,
  },
  inputStyleHalf: {
    backgroundColor: "#e6ecf7",
    padding: 12,
    width: "45%",
    borderRadius: 12,
  },
  groupStyle: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#e6ecf7",
    padding: 12,
    width: "45%",
    borderRadius: 12,
  },

  dateStyle: {
    backgroundColor: "#e6ecf7",
    padding: 12,
    width: "90%",
    borderRadius: 12,
    gap: 10,
    position: "relative",
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  dateStyleHalf: {
    backgroundColor: "#e6ecf7",
    padding: 12,
    width: "45%",
    borderRadius: 12,
    gap: 10,
    position: "relative",
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#0741ad",
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
