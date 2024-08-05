import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
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
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdvertiseClass,
  fetchAdvertiseClasses,
} from "../../features/advertiseClass/advertiseClassActions";
// import { PlatformPay, PlatformPayButton } from "@stripe/stripe-react-native";
// import MyApplePay from "./MyApplePay";
import Purchases from "react-native-purchases";
import { REVENUE_CAT_API_KEY } from "@env";
import { analyticsEvent } from "../../utils/analytics";

const IAdvertiseClass = ({ route, navigation }) => {
  const [packages, setPackages] = useState([]);
  const [subscribeBtn, setSubscribeBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    analyticsEvent("advertiseclass_purchased", { user: user.email });
    // getting Customer info and checking if the user is subscribed or not
    const getCustomerInfo = async () => {
      const customerInfo = await Purchases.getCustomerInfo();

      console.log(
        "customerInfo: ",
        customerInfo.entitlements.active["advertiseclass"]
      );
      if (
        typeof customerInfo.entitlements.active["advertiseclass"] !==
        "undefined"
      ) {
        setSubscribeBtn(!subscribeBtn);
      }
    };

    const main = async () => {
      // Purchases.setDebugLogsEnabled(true);

      await Purchases.configure({
        apiKey: REVENUE_CAT_API_KEY,
      });

      // Load all offerings and the user object with entitlements
      await getCustomerInfo();
      await loadOfferings();
    };

    main();
  }, []);

  // Load all offerings a user can (currently) purchase
  const loadOfferings = async () => {
    const offerings = await Purchases.getOfferings();
    if (offerings.current) {
      setPackages(offerings.current.availablePackages);
    }
  };

  // Purchase a product
  const handlePurchase = async (pack) => {
    // Using Offerings/Packages
    try {
      setLoader(true);
      const { customerInfo, productIdentifier } = Purchases.setEmail(
        user.email
      );
      // const { customerInfo, productIdentifier } =
      await Purchases.purchasePackage(pack);
      console.log(
        "After purchase",
        typeof customerInfo.entitlements.active["advertiseclass"] !==
          "undefined"
      );
      if (
        typeof customerInfo.entitlements.active["advertiseclass"] !==
        "undefined"
      ) {
        // Unlock that great "pro" content
        console.log("UNLOCK");
        analyticsEvent("advertiseclass_purchased", { user: user.email });
        setLoader(false);
        setSubscribeBtn(!subscribeBtn);
      }
    } catch (e) {
      console.log("Error: ", e);
      setLoader(false);
      if (!e.userCancelled) {
        // showError(e);
        console.log("Error: ", e);
      }
    }
  };

  // const handleSubscribeBtn = () => {
  //   setSubscribeBtn(!subscribeBtn);
  // };

  return subscribeBtn ? (
    <AdvertiseClassScreen route={route} navigation={navigation} />
  ) : (
    <MainAdvertiseClass>
      {packages.map((pack) => (
        <TouchableOpacity
          key={pack.product.identifier}
          style={styles.buttonStyle}
          onPress={() => handlePurchase(pack)}
        >
          {loader ? (
            <ActivityIndicator animating={loader} size="small" />
          ) : (
            <Text style={styles.buttonText}>Subscribe</Text>
          )}
        </TouchableOpacity>
      ))}
      <Text
        style={{
          color: "black",
          fontSize: 12,
          textDecorationLine: "none",
          textAlign: "center",
          letterSpacing: 0.2,
        }}
      >
        By Subscribing, you agree to our {"\n"}
        {"\n"}
        <Text
          style={{ color: Colors.primaryColor }}
          onPress={() => navigation.navigate("TermsCondition")}
        >
          Terms and Service
        </Text>{" "}
        and{" "}
        <Text
          style={{ color: Colors.primaryColor }}
          onPress={() => navigation.navigate("TermsCondition")}
        >
          Privacy Policy
        </Text>
      </Text>
    </MainAdvertiseClass>
  );
};

export default IAdvertiseClass;

const MainAdvertiseClass = ({ navigation, children }) => {
  analyticsEvent("advertiseclass_screen");
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        <View style={{ fontSize: 14 }}>
          <Text style={{ fontWeight: 600, textAlign: "center" }}>
            FIT-HUBS OFFERS A MONTHLY SUBSCRIPTION CHARGE OF ONLY{" "}
            <Text style={{ color: Colors.primaryColor, fontWeight: 600 }}>
              $4.99
            </Text>
            .{"\n"}
            {"\n"}
          </Text>
          <View
            style={{
              gap: 40,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Image
                source={require("../../../assets/subscription.png")}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.textStyle}>
                Advertise as many classes as you like {"\n"}within your
                subscription period
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Image
                source={require("../../../assets/subscription1.png")}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.textStyle}>
                Reach out to students across North {"\n"}America
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Image
                source={require("../../../assets/subscription2.png")}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.textStyle}>
                Advertise virtual, in-person or group {"\n"}classes
              </Text>
            </View>
          </View>
          <Text style={styles.textStyle}>
            Boost your revenue with the Fit-Hubs App. {"\n"}Thank you for being
            part of the Fit-Hubs {"\n"}community
          </Text>
        </View>
        {children}
      </View>
    </ScrollView>
  );
};

const AdvertiseClassScreen = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.user);
  const [showYoga, setShowYoga] = useState(false);
  const [showZumba, setShowZumba] = useState(false);
  const [showPilates, setShowPilates] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const repeatClassData = route?.params?.ClassesQuery;

  console.log("ClassesQuery: ", repeatClassData);

  // const [duration, setTimeTo] = useState(new Date());
  const [advertiseClassData, setAdvertiseClassData] = useState({
    userID: user._id,
    ClassName: "",
    SelectClassType: "",
    Styles: "none",
    LevelOfClass: "",
    Address: "",
    State: "",
    ZipCode: "",
    City: "",
    Country: "",
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
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();
  const { AdvertiseClass, isLoading, error } = useSelector(
    (state) => state.AdvertiseClass
  );

  useEffect(() => {
    console.log("INSIDE USEFFECT");
    if (repeatClassData) {
      setAdvertiseClassData({
        ...repeatClassData,
        userID: user._id,
      });
    }
  }, [repeatClassData]);

  console.log("AdvertiseClass ::::: ", advertiseClassData);

  // // Fetching the advertiseClassData
  // useEffect(() => {
  //   dispatch(fetchAdvertiseClasses(user._id));
  // }, [dispatch]);

  // handle address
  const handleStudentAddressSelect = (addressData) => {
    const { address, city, country } = addressData;
    setAdvertiseClassData((prevData) => ({
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
    setAdvertiseClassData({
      ...advertiseClassData,
      StartDate: currentDate.toLocaleDateString(),
    });
  };
  // handling end date change
  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndDate(currentDate);
    setAdvertiseClassData({
      ...advertiseClassData,
      EndDate: currentDate.toLocaleDateString(),
    });
  };

  // handling time from change
  const handleStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setStartTime(currentTime);
    setAdvertiseClassData({
      ...advertiseClassData,
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
  //   setAdvertiseClassData({
  //     ...advertiseClassData,
  //     TimeTo: currentTime.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   });
  // };

  const handleIsGroup = () => {
    setAdvertiseClassData({
      ...advertiseClassData,
      Group: true,
      OneToOne: false,
    });
  };
  const handleOneToOne = () => {
    setAdvertiseClassData({
      ...advertiseClassData,
      Group: false,
      OneToOne: true,
    });
  };
  const handleOnline = () => {
    setAdvertiseClassData({
      ...advertiseClassData,
      Online: true,
      Offline: false,
    });
  };
  const handleOffline = () => {
    setAdvertiseClassData({
      ...advertiseClassData,
      Online: false,
      Offline: true,
    });
  };

  // handle can cover class
  const handleAdvertiseClass = async () => {
    // Check if any field in needCoverData is empty
    for (const key in advertiseClassData) {
      if (advertiseClassData[key] === "") {
        Alert.alert("Please fill in all fields");
        return false;
      }
    }

    // return true;

    // Dispatch the createCanCover action
    const dispatchAdvertiseClass = await dispatch(
      createAdvertiseClass(advertiseClassData)
    );
    if (dispatchAdvertiseClass) {
      Alert.alert(dispatchAdvertiseClass.payload.message);
      return;
    }
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
              Advertise a new Class
            </Text>
            {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Primary Fitness Specialization"
                    placeholderTextColor="#3967bd"
                    onChangeText={(text) =>
                      setInstructorData({
                        ...instructorData,
                        PrimaryFitnessSpecialization: text,
                      })
                    }
                  /> */}
            <TextInput
              style={styles.inputStyle}
              placeholder="Class Name"
              placeholderTextColor="#3967bd"
              value={advertiseClassData.ClassName}
              onChangeText={(text) =>
                setAdvertiseClassData({
                  ...advertiseClassData,
                  ClassName: text,
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
                    setAdvertiseClassData({
                      ...advertiseClassData,
                      SelectClassType: value,
                    });
                  } else if (value === "Zumba") {
                    setShowYoga(false);
                    setShowZumba(true);
                    setShowPilates(false);
                    setAdvertiseClassData({
                      ...advertiseClassData,
                      SelectClassType: value,
                    });
                  } else if (value === "Pilates") {
                    setShowYoga(false);
                    setShowZumba(false);
                    setShowPilates(true);
                    setAdvertiseClassData({
                      ...advertiseClassData,
                      SelectClassType: value,
                    });
                  } else {
                    setShowYoga(false);
                    setShowZumba(false);
                    setShowPilates(false);
                    setAdvertiseClassData({
                      ...advertiseClassData,
                      SelectClassType: value,
                    });
                  }
                }}
                value={setAdvertiseClassData.SelectClassType}
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
                    setAdvertiseClassData({
                      ...advertiseClassData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryYogaItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={advertiseClassData.Styles}
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
                    setAdvertiseClassData({
                      ...advertiseClassData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryZumbaItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={advertiseClassData.Styles}
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
                    setAdvertiseClassData({
                      ...advertiseClassData,
                      Styles: value,
                    });
                  }}
                  items={pickerPrimaryPilatesItems}
                  placeholder={{
                    label: "Select Styles",
                    value: "",
                  }}
                  value={advertiseClassData.Styles}
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
                  setAdvertiseClassData({
                    ...advertiseClassData,
                    LevelOfClass: value,
                  });
                }}
                items={pickerEnvironmentClass}
                placeholder={{
                  label: "Level of Class",
                  value: "",
                }}
                value={advertiseClassData.LevelOfClass}
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
              value={advertiseClassData.Address}
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
                  setAdvertiseClassData({
                    ...advertiseClassData,
                    State: value,
                  });
                }}
                items={pickerStates}
                placeholder={{
                  label: "State Within North America",
                  value: "",
                }}
                value={advertiseClassData.State}
              />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="Zip Code"
              placeholderTextColor="#3967bd"
              value={advertiseClassData.ZipCode}
              onChangeText={(text) =>
                setAdvertiseClassData({
                  ...advertiseClassData,
                  ZipCode: text,
                })
              }
            />

            <TextInput
              style={styles.inputStyle}
              placeholder="City"
              placeholderTextColor="#3967bd"
              value={advertiseClassData.City}
              onChangeText={(text) =>
                setAdvertiseClassData({
                  ...advertiseClassData,
                  City: text,
                })
              }
            />

            <TextInput
              style={styles.inputStyle}
              placeholder="Country"
              placeholderTextColor="#3967bd"
              value={advertiseClassData.Country}
              onChangeText={(text) =>
                setAdvertiseClassData({
                  ...advertiseClassData,
                  Country: text,
                })
              }
            />
            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Pressable style={styles.dateStyleHalf}>
                <Text style={{ color: "#3967bd" }}>
                  {advertiseClassData.StartDate.length > 0
                    ? advertiseClassData.StartDate
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
                  {advertiseClassData.EndDate.length > 0
                    ? advertiseClassData.EndDate
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
                  {advertiseClassData.StartTime.length > 0
                    ? advertiseClassData.StartTime
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
                value={advertiseClassData.Duration}
                onChangeText={(text) =>
                  setAdvertiseClassData({
                    ...advertiseClassData,
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
                      color={advertiseClassData.Group ? "#042768" : "#83a0d6"}
                      style={{
                        borderWidth: advertiseClassData.Group ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={advertiseClassData.Group}
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
                      color={
                        advertiseClassData.OneToOne ? "#042768" : "#83a0d6"
                      }
                      style={{
                        borderWidth: advertiseClassData.OneToOne ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={advertiseClassData.OneToOne}
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
                      color={advertiseClassData.Online ? "#042768" : "#83a0d6"}
                      style={{
                        borderWidth: advertiseClassData.Online ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={advertiseClassData.Online}
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
                      color={advertiseClassData.Offline ? "#042768" : "#83a0d6"}
                      style={{
                        borderWidth: advertiseClassData.Offline ? 3 : 1,
                        borderRadius: 12,
                      }}
                      value={advertiseClassData.Offline}
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
              value={advertiseClassData.TotalStudents}
              onChangeText={(text) =>
                setAdvertiseClassData({
                  ...advertiseClassData,
                  TotalStudents: text,
                })
              }
            />

            <TextInput
              style={styles.inputStyle}
              placeholder="$ Cost Per Session Per Person"
              placeholderTextColor="#3967bd"
              value={advertiseClassData.CostPerSession}
              onChangeText={(text) =>
                setAdvertiseClassData({
                  ...advertiseClassData,
                  CostPerSession: text,
                })
              }
            />

            {/* ------ */}
          </View>

          <View style={{ width: "90%", alignItems: "center", marginTop: 5 }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleAdvertiseClass}
            >
              {isLoading ? (
                <ActivityIndicator animating={isLoading} size="small" />
              ) : (
                <Text style={styles.buttonText}>Confirm Class</Text>
              )}
            </TouchableOpacity>
            {/* <MyApplePay
              advertiseClassData={advertiseClassData}
              handleAdvertiseClass={handleAdvertiseClass}
            /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",

    backgroundColor: Colors.white,
  },
  mainContainer: {
    height: "80%",
    width: "85%",
    // backgroundColor: "gray",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryDark,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
  },
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
  textStyle: {
    fontStyle: "italic",
    fontSize: 13,
    textAlign: "center",
  },
});
