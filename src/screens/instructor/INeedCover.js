import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { createNeedCover } from "../../features/needCover/needCoverActions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAdvertiseClasses,
  fetchSpecificAdvertiseClasses,
} from "../../features/advertiseClass/advertiseClassActions";

const INeedCover = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const [showYoga, setShowYoga] = useState(false);
  const [showZumba, setShowZumba] = useState(false);
  const [showPilates, setShowPilates] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  // const [duration, setTimeTo] = useState(new Date());
  const [needCoverData, setNeedCoverData] = useState({
    userID: user._id,
    ClassID: "",
    SelectClassType: "",
    LevelOfClass: "",
    Styles: "none",
    Address: "",
    State: "",
    City: "",
    Country: "",
    ZipCode: "",
    StartDate: "",
    EndDate: "",
    StartTime: "",
    Duration: "",
    Group: true,
    OneToOne: false,
    Online: true,
    Offline: false,
    TotalStudents: "",
    CostPerSession: "",
  });

  console.log("needCoverData: ", needCoverData);

  const dispatch = useDispatch();

  const { NeedCovers, error } = useSelector((state) => state.NeedCovers);
  const {
    TransformAllAdvertiseClassesData,
    isFetching,
    SpecificAdvertiseClassesData,
    isLoading,
  } = useSelector((state) => state.AdvertiseClass);

  // Fetching the advertiseClassData
  useEffect(() => {
    dispatch(fetchAllAdvertiseClasses(user._id));
  }, [dispatch]);

  console.log("SpecificAdvertiseClassesData: ", SpecificAdvertiseClassesData);
  useEffect(() => {
    console.log("SpecificAdvertiseClassesData: ", SpecificAdvertiseClassesData);
    if (!isObjectEmpty(SpecificAdvertiseClassesData)) {
      console.log("Inside if");
      setNeedCoverData({
        ...SpecificAdvertiseClassesData,
        userID: user._id,
        ClassID: SpecificAdvertiseClassesData._id,
        CostPerSession: "",
      });
    }
  }, [dispatch, SpecificAdvertiseClassesData]);

  console.log("NeedCovers ::::: ><> ", NeedCovers);

  function isObjectEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false; // The object has at least one property, so it's not empty
      }
    }
    return true; // The object has no properties, so it's empty
  }

  // handle address
  const handleStudentAddressSelect = (addressData) => {
    const { address, city, country } = addressData;
    setNeedCoverData((prevData) => ({
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
    setNeedCoverData({
      ...needCoverData,
      StartDate: currentDate.toLocaleDateString(),
    });
  };
  // handling end date change
  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndDate(currentDate);
    setNeedCoverData({
      ...needCoverData,
      EndDate: currentDate.toLocaleDateString(),
    });
  };

  // handling time from change
  const handleStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setStartTime(currentTime);
    setNeedCoverData({
      ...needCoverData,
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
  //   setNeedCoverData({
  //     ...needCoverData,
  //     TimeTo: currentTime.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   });
  // };

  const handleIsGroup = () => {
    setNeedCoverData({ ...needCoverData, Group: true, OneToOne: false });
  };
  const handleOneToOne = () => {
    setNeedCoverData({ ...needCoverData, Group: false, OneToOne: true });
  };
  const handleOnline = () => {
    setNeedCoverData({ ...needCoverData, Online: true, Offline: false });
  };
  const handleOffline = () => {
    setNeedCoverData({ ...needCoverData, Online: false, Offline: true });
  };

  // handle can cover class
  const handleNeedCoverClass = async () => {
    // Check if any field in needCoverData is empty
    for (const key in needCoverData) {
      if (needCoverData[key] === "") {
        Alert.alert("Please fill in all fields");
        return;
      }
    }
    // Dispatch the createCanCover action
    const dispatchNeedCover = await dispatch(createNeedCover(needCoverData));

    if (dispatchNeedCover) {
      Alert.alert(dispatchNeedCover.payload.message);
      return;
    }

    // if (error !== null) {
    //   Alert.alert(error?.message);
    //   return;
    // }
  };

  // handle Select Class Picker
  const handleSelectClassPicker = (value) => {
    setNeedCoverData({
      ...needCoverData,
      ClassID: value,
    });
    const selectedClassData = { userID: user._id, classID: value };
    dispatch(fetchSpecificAdvertiseClasses(selectedClassData));
  };

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
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="#15326B" />

      <ScrollView
        contentContainerStyle={{
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
              I Need Cover
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
                onValueChange={handleSelectClassPicker}
                items={TransformAllAdvertiseClassesData}
                placeholder={{
                  label: "Select your class",
                  value: "",
                }}
                value={needCoverData.ClassID}
              />
            </View>

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
                    setNeedCoverData({
                      ...needCoverData,
                      SelectClassType: value,
                    });
                  } else if (value === "Zumba") {
                    setShowYoga(false);
                    setShowZumba(true);
                    setShowPilates(false);
                    setNeedCoverData({
                      ...needCoverData,
                      SelectClassType: value,
                    });
                  } else if (value === "Pilates") {
                    setShowYoga(false);
                    setShowZumba(false);
                    setShowPilates(true);
                    setNeedCoverData({
                      ...needCoverData,
                      SelectClassType: value,
                    });
                  } else {
                    setShowYoga(false);
                    setShowZumba(false);
                    setShowPilates(false);
                    setNeedCoverData({
                      ...needCoverData,
                      SelectClassType: value,
                    });
                  }
                }}
                value={setNeedCoverData.SelectClassType}
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
                    setNeedCoverData({
                      ...needCoverData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryYogaItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={needCoverData.Styles}
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
                    setNeedCoverData({
                      ...needCoverData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryZumbaItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={needCoverData.Styles}
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
                    setNeedCoverData({
                      ...needCoverData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryPilatesItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={needCoverData.Styles}
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
                  setNeedCoverData({
                    ...needCoverData,
                    LevelOfClass: value,
                  });
                }}
                items={pickerEnvironmentClass}
                placeholder={{
                  label: "Level of Class",
                  value: "",
                }}
                value={needCoverData.LevelOfClass}
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
              value={needCoverData.Address}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Zip Code"
              placeholderTextColor="#3967bd"
              value={needCoverData.ZipCode}
              onChangeText={(text) =>
                setNeedCoverData({
                  ...needCoverData,
                  ZipCode: text,
                })
              }
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
                  setNeedCoverData({
                    ...needCoverData,
                    State: value,
                  });
                }}
                items={pickerStates}
                placeholder={{
                  label: "State Within North America",
                  value: "",
                }}
                value={needCoverData.State}
              />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="City"
              placeholderTextColor="#3967bd"
              value={needCoverData.City}
              onChangeText={(text) =>
                setNeedCoverData({
                  ...needCoverData,
                  City: text,
                })
              }
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Country"
              placeholderTextColor="#3967bd"
              value={needCoverData.Country}
              onChangeText={(text) =>
                setNeedCoverData({
                  ...needCoverData,
                  Country: text,
                })
              }
            />

            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Pressable style={styles.dateStyleHalf}>
                <Text style={{ color: "#3967bd" }}>
                  {needCoverData.StartDate.length > 0
                    ? needCoverData.StartDate
                    : "Start Date"}
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
              <Pressable style={styles.dateStyleHalf}>
                <Text style={{ color: "#3967bd" }}>
                  {needCoverData.EndDate.length > 0
                    ? needCoverData.EndDate
                    : "End Date"}
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
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </View>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Pressable style={styles.dateStyleHalf}>
                <Text style={{ color: "#3967bd" }}>
                  {needCoverData.StartTime.length > 0
                    ? needCoverData.StartTime
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
                value={needCoverData.Duration}
                onChangeText={(text) =>
                  setNeedCoverData({
                    ...needCoverData,
                    Duration: text,
                  })
                }
              />
            </View>

            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <View style={styles.groupStyle}>
                {/* <Text style={{ fontSize: 14, fontWeight: "light" }}>
                Select Options:
              </Text> */}

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
                      color={needCoverData.Group ? "#042768" : "#83a0d6"}
                      style={{
                        borderWidth: needCoverData.Group ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={needCoverData.Group}
                      onValueChange={handleIsGroup}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        textDecorationLine: "none",
                      }}
                    >
                      Group
                    </Text>
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
                      color={needCoverData.OneToOne ? "#042768" : "#83a0d6"}
                      style={{
                        borderWidth: needCoverData.OneToOne ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={needCoverData.OneToOne}
                      onValueChange={handleOneToOne}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        textDecorationLine: "none",
                      }}
                    >
                      1:1
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.groupStyle}>
                {/* <Text style={{ fontSize: 14, fontWeight: "light" }}>
                Select Options:
              </Text> */}

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
                      color={needCoverData.Online ? "#042768" : "#83a0d6"}
                      style={{
                        borderWidth: needCoverData.Online ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={needCoverData.Online}
                      onValueChange={handleOnline}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        textDecorationLine: "none",
                      }}
                    >
                      Online
                    </Text>
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
                      color={needCoverData.Offline ? "#042768" : "#83a0d6"}
                      style={{
                        borderWidth: needCoverData.Offline ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={needCoverData.Offline}
                      onValueChange={handleOffline}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        textDecorationLine: "none",
                      }}
                    >
                      Offline
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="Total Students"
              placeholderTextColor="#3967bd"
              value={needCoverData.TotalStudents}
              onChangeText={(text) =>
                setNeedCoverData({
                  ...needCoverData,
                  TotalStudents: text,
                })
              }
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="$ Cost Per Session Per Person"
              placeholderTextColor="#3967bd"
              value={needCoverData.CostPerSession}
              onChangeText={(text) =>
                setNeedCoverData({
                  ...needCoverData,
                  CostPerSession: text,
                })
              }
            />

            {/* ------ */}
          </View>

          <View style={{ width: "90%", alignItems: "center", marginTop: 5 }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              // onPress={() => navigation.navigate("Calendar")}
              onPress={handleNeedCoverClass}
            >
              <Text style={styles.buttonText}>Create Need Cover Class</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default INeedCover;

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
