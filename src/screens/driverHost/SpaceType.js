import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { REVENUE_CAT_API_KEY } from "@env";
import Purchases from "react-native-purchases";
import Colors from "../../constants/Colors";
import { setDrivingHostData } from "../../features/drivingHost/drivingHostSlice";
import { dispatch, useSelector } from "../../store/store";
import SpaceTypeSecond from "./SpaceTypeSecond";

const RentOutSpace = ({ route, navigation }) => {
  const [packages, setPackages] = useState([]);
  const [subscribeBtn, setSubscribeBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      // analyticsEvent("advertiseclass_purchased", { user: user.email });
      // getting Customer info and checking if the user is subscribed or not
      const getCustomerInfo = async () => {
        const customerInfo = await Purchases.getCustomerInfo();

        if (
          typeof customerInfo.entitlements.active["driverhostpro"] !==
          "undefined"
        ) {
          setSubscribeBtn(!subscribeBtn);
        }
      };

      const main = async () => {
        // Purchases.setLogLevel(LOG_LEVEL);

        await Purchases.configure({
          apiKey: REVENUE_CAT_API_KEY,
        });

        // Load all offerings and the user object with entitlements
        await getCustomerInfo();
        await loadOfferings();
      };

      main();
      navigation.setOptions({ headerTitle: "Subscription" });

      return () => {};
    }, [])
  );

  // Load all offerings a user can (currently) purchase
  const loadOfferings = async () => {
    setLoader(true);
    const offerings = await Purchases.getOfferings();

    if (offerings.all["driverhostpro"].availablePackages) {
      setPackages(offerings.all["driverhostpro"].availablePackages);
      setLoader(false);
    }
  };

  // Purchase a product
  const handlePurchase = async (pack) => {
    // Using Offerings/Packages
    try {
      setLoader(true);
      // const { customerInfo, productIdentifier } = Purchases.setEmail(
      //   user.email
      // );
      const { customerInfo, productIdentifier } =
        await Purchases.purchasePackage(pack);

      if (
        typeof customerInfo.entitlements.all["driverhostpro"] !== "undefined"
      ) {
        // Unlock that great "pro" content
        // console.log("UNLOCK");
        // analyticsEvent("advertiseclass_purchased", { user: user.email });
        setLoader(false);
        setSubscribeBtn(!subscribeBtn);
      }
    } catch (e) {
      // console.log("Error: ", e);
      setLoader(false);
      if (!e.userCancelled) {
        // showError(e);
        // console.log("Error: ", e);
      }
    }
  };
  return subscribeBtn ? (
    <SpaceType route={route} navigation={navigation} />
  ) : (
    <MainRentOutSpace>
      {packages.map((pack) => (
        <TouchableOpacity
          key={pack.product.identifier}
          style={styles.buttonStyle1}
          onPress={() => handlePurchase(pack)}
        >
          {loader ? (
            <ActivityIndicator animating={loader} size="small" />
          ) : (
            <Text style={styles.buttonText1}>Subscribe</Text>
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
    </MainRentOutSpace>
  );
};

export default RentOutSpace;

const MainRentOutSpace = ({ navigation, children }) => {
  // analyticsEvent("advertiseclass_screen");
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
            PARKING MATE OFFERS A MONTHLY SUBSCRIPTION CHARGE OF{" "}
            <Text style={{ color: Colors.primaryColor, fontWeight: 600 }}>
              $1.99
            </Text>
            {"\n"}FOR UNLIMITED PARKING LISTINGS.{"\n"}
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
                Whenever you receive a booking.{"\n"} You get paid 100% of the
                total {"\n"}driveway booking fee you set.
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
                Let ‘Drivers’ know of your unique {"\n"} Driveway parking space.
                Location,{"\n"} why your Driveway is ideal{"\n"} and some
                awesome pictures!
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
                Once you have subscribed.{"\n"} ‘Drivers’ will be able to
                search,{"\n"} locate your space,{"\n"} book and pay you
                directly!
              </Text>
            </View>
          </View>
          <Text style={styles.textStyle}>
            Welcome to Parking Mate!{"\n"} Thank you for being part of our
            community.{"\n"} Sit back and enjoy your revenue stream!{"\n"}
            Remember, you can ‘Cash out’ at anytime.
          </Text>
        </View>
        {children}
      </View>
    </ScrollView>
  );
};

const SpaceType = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      handleFieldChange("DriverHostID", user._id);

      navigation.setOptions({ headerTitle: "Type" });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const handleFieldChange = (fieldName, value) => {
    dispatch(setDrivingHostData({ fieldName, value }));
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.div1}>
          <Text style={styles.text}>
            What type of residential parking do you offer?
          </Text>
        </View>
        <View style={styles.mainImage}>
          <Image
            source={require("../../../assets/RentOutSpace.png")}
            style={styles.mainImageStyle}
          />
        </View>

        <View style={styles.div2}>
          <Text style={styles.text2}>
            Where is your residential parking situated?
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleFieldChange("ParkingSituated", "driveway"); // Dispatch action to update the field value
            }}
            style={[
              styles.textInputStyle,
              DrivingHostData?.ParkingSituated?.driveway
                ? styles.selectedOption
                : null,
              {
                display: DrivingHostData?.ParkingSituated?.driveway
                  ? "flex"
                  : "none",
              },
            ]}
          >
            <Text>Driveway</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleFieldChange("ParkingSituated", "ownedAllocatedSpace"); // Dispatch action to update the field value
            }}
            style={[
              styles.textInputStyle,
              DrivingHostData?.ParkingSituated?.ownedAllocatedSpace
                ? styles.selectedOption
                : null, // Apply selected option
              {
                display: DrivingHostData?.ParkingSituated?.ownedAllocatedSpace
                  ? "flex"
                  : "none",
              },
            ]}
          >
            <Text>Owned Allocated Space</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleFieldChange("ParkingSituated", "carLot"); // Dispatch action to update the field value
            }}
            style={[
              styles.textInputStyle,
              DrivingHostData?.ParkingSituated?.carLot
                ? styles.selectedOption
                : null, // Apply selected option
              {
                display: DrivingHostData?.ParkingSituated?.carLot
                  ? "flex"
                  : "none",
              },
            ]}
          >
            <Text>Car Lot</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SpaceTypeSecond navigation={navigation} />
    </ScrollView>
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
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  mainImage: {
    alignItems: "center",
  },
  mainImageStyle: {
    height: 220,
    width: 220,
    borderRadius: 40,
  },
  div1: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 34,
    fontWeight: "500",
  },

  div2: {
    marginVertical: 10,
  },

  text2: {
    fontSize: 22,
    fontWeight: "600",
  },

  textInputStyle: {
    width: "100%",
    borderWidth: 0.3,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 15,
    marginVertical: 15,
  },
  buttonStyle1: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    width: "90%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText1: {
    color: Colors.white,
  },

  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 12,
    borderRadius: 6,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: Colors.primaryColor, // Change border color to primary color for selected option
  },
  textStyle: {
    fontStyle: "italic",
    fontSize: 13,
    textAlign: "center",
  },
});
