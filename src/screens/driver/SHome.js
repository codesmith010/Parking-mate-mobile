import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import Colors from "../../constants/Colors";
import {
  resetDriverField,
  setDriverData,
} from "../../features/driver/driverSlice";
import { dispatch, useSelector } from "../../store/store";
import { resetDrivingHostData } from "../../features/drivingHost/drivingHostSlice";

const SHome = ({ navigation }) => {
  const { DriverData } = useSelector((state) => state.Driver);
  const { user, isLoading, error } = useSelector((state) => state.user);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const snapPoints = useMemo(() => ["12%", "38%"], []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Parking Mate needs access to your location to provide nearby parking spots",
          [
            {
              text: "OK",
              onPress: () => {
                // Open device settings to enable location services
                Linking.openSettings();
              },
            },
          ]
        );
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        // console.error("Error fetching current location: ", error);
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);
  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetDrivingHostData());
        dispatch(resetDriverField({ fieldName: "SelectedParkingSpace" }));
      };
    }, [])
  );

  if (loadingLocation) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  // handleSearchDestination
  const handleSearchDestination = () => {
    navigation.navigate("DriverSpaceSearch");
  };

  const handleAddressSelect = (addressData) => {
    const { address, lat, lng } = addressData;
    handleFieldChange("CurrentLocation", address);

    setCurrentLocation({ ...currentLocation, latitude: lat, longitude: lng });
    handleFieldChange("latitude", lat);
    handleFieldChange("longitude", lng);
  };

  const handleFieldChange = (fieldName, value) => {
    dispatch(setDriverData({ fieldName, value }));
  };

  const handleValidationAndSubmission = () => {
    const { CurrentLocation } = DriverData;

    if (CurrentLocation.length === 0 || CurrentLocation.trim() === "") {
      Alert.alert("Please select your location.");
      return;
    }
    handleSearchDestination();
  };

  const mapRegion = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocation = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
  };

  const truncateAddress = (address) => {
    const maxLength = 38; // Maximum length for address before truncation
    if (address.length <= maxLength) {
      return address;
    } else {
      return address.slice(0, maxLength - 3) + "...";
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning!";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  };

  const greetingMessage = getGreeting();

  // Usage:
  <Text style={{ color: Colors.gray, fontWeight: "bold" }}>
    {getGreeting()}
  </Text>;

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={Colors.primaryColor} />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            position: "absolute",
            top: 20,
            zIndex: 100,
            width: "90%",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 100,
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{
                borderRadius: 6,
              }}
            >
              <FontAwesomeIcon
                icon={faBars}
                style={{
                  color: Colors.grayDark,
                }}
                size={24}
              />
            </Pressable>
            <TextInput
              style={{
                paddingLeft: 10,
                fontSize: 12,
                fontWeight: "bold",
                color: Colors.primaryDark,
              }}
              onPressIn={() =>
                navigation.navigate("Address", {
                  onAddressSelect: handleAddressSelect,
                })
              }
              value={truncateAddress(DriverData?.CurrentLocation)}
              onChangeText={(text) => {
                handleFieldChange("CurrentLocation", text);
              }}
              placeholder="Where are you going?"
            />
          </View>

          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: Colors.grayDark,
            }}
            size={24}
          />
        </View>

        <View style={{ width: "100%", height: "100%" }}>
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            region={mapRegion}
            style={styles.map}
          >
            <Marker coordinate={selectedLocation} />
          </MapView>
        </View>

        <BottomSheet
          backgroundStyle={styles.bottomSheetContainer}
          index={1}
          snapPoints={snapPoints}
        >
          <View style={styles.contentContainer}>
            <View style={{ gap: 10 }}>
              <Text style={{ color: Colors.gray, fontWeight: "bold" }}>
                {greetingMessage}
              </Text>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Searching for a 'Driveway'?
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: Colors.white,
                shadowColor: Colors.gray,
                shadowOpacity: 0.7,
                shadowOffset: { width: 0, height: 0 },
                padding: 10,
                borderRadius: 8,
              }}
              onPress={handleValidationAndSubmission}
            >
              <View
                style={{
                  backgroundColor: Colors.primaryLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    color: Colors.primaryColor,
                  }}
                  size={24}
                />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Search your destination here
                </Text>
                <Text style={{ color: Colors.gray }}>
                  To reserve your parking space in advance
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaProvider>
  );
};

export default SHome;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  textStyle: {
    // backgroundColor: "red",
    width: "85%",
    textAlign: "left",
    fontSize: 21,
    fontWeight: "600",
    letterSpacing: 1.1,
    color: Colors.black,
  },
  imgContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 80,
    height: 80,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  bottomSheetContainer: {
    backgroundColor: Colors.grayLight,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.grayLight,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 24,
  },
});
