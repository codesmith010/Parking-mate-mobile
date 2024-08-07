import {
  faArrowLeft,
  faArrowRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
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
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { getNearbyParkingSpaces } from "../../features/driver/driverActions";
import {
  setDriverData,
  setSelectParkingSpace,
} from "../../features/driver/driverSlice";
import { dispatch } from "../../store/store";

const NearByLocation = ({ navigation }) => {
  const { DriverData, NearbyParkingSpaces, SelectedParkingSpace } = useSelector(
    (state) => state.Driver
  );
  const { user, isLoading, error } = useSelector((state) => state.user);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleNextScreen = () => {
    navigation.navigate("SecureCheckout"); // Navigate to the 'test01' screen
  };

  useFocusEffect(
    useCallback(() => {
      handleNearbyLocation();
      return () => {};
    }, [])
  );

  const handleAddressSelect = (addressData) => {
    const { address, lat, lng } = addressData;
    handleFieldChange("CurrentLocation", address);
    handleFieldChange("latitude", lat);
    handleFieldChange("longitude", lng);
  };

  const handleFieldChange = (fieldName, value) => {
    dispatch(setDriverData({ fieldName, value }));
  };

  const mapRegion = {
    latitude: DriverData.latitude,
    longitude: DriverData.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocation = {
    latitude: DriverData.latitude,
    longitude: DriverData.longitude,
  };

  const handleNearbyLocation = () => {
    const { ArriveTime, LeaveTime, latitude, longitude } = DriverData;

    const payload = {
      ArriveTime: ArriveTime,
      LeaveTime: LeaveTime,
      lat: latitude,
      lng: longitude,
      radius: 2500,
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      errorCallback,
      payload,
    };

    dispatch(getNearbyParkingSpaces(params));
  };

  const handleSelectedParkingSpace = (data) => {
    dispatch(setSelectParkingSpace(data));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            position: "absolute",
            top: 20,
            zIndex: 100,
            width: "90%",
            marginTop: 30,
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderStartEndRadius: 10,
            borderTopStartRadius: 10,
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                borderRadius: 6,
              }}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
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
              placeholder="Sarasota Bradenton International"
              value={DriverData.CurrentLocation}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
            position: "absolute",
            top: 68,
            zIndex: 100,
            width: "90%",
            marginTop: 30,
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            backgroundColor: Colors.white,
          }}
        >
          <TextInput
            style={{ width: "35%" }}
            placeholder="Arrive"
            value={DriverData.ArriveTime}
            editable={false}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{
              color: Colors.grayDark,
            }}
            size={24}
          />
          <TextInput
            style={{ width: "35%" }}
            placeholder="Leave Time"
            value={DriverData.LeaveTime}
            editable={false}
          />
        </View>

        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          region={mapRegion}
          style={styles.map}
          showsUserLocation={true}
          // followsUserLocation={true}
        >
          <Marker draggable coordinate={selectedLocation} style={styles.marker}>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Selected Location</Text>
                <View style={styles.arrowDown} />
              </View>
            </Callout>
          </Marker>

          {NearbyParkingSpaces.length > 0 &&
            NearbyParkingSpaces.map((data, index) => {
              const parkingSpaceLocation = {
                longitude: data?.Coordinates?.coordinates[0],
                latitude: data?.Coordinates?.coordinates[1],
              };

              return (
                <Marker
                  key={data._id}
                  draggable
                  coordinate={parkingSpaceLocation}
                  style={styles.marker}
                  image={require("../../../assets/parking2.png")}
                  onPress={() => handleSelectedParkingSpace(data)}
                >
                  {Object.keys(SelectedParkingSpace).length > 0 && (
                    <Callout tooltip>
                      <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>
                          ${SelectedParkingSpace?.PricingPlan}/hr
                        </Text>
                        <View style={styles.arrowDown} />
                      </View>
                    </Callout>
                  )}
                </Marker>
              );
            })}
          <Circle
            center={mapRegion}
            radius={2500}
            strokeWidth={1}
            strokeColor="black"
          />
        </MapView>
        {Object.keys(SelectedParkingSpace).length > 0 && (
          <View style={styles.bottomInfo}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                {SelectedParkingSpace?.ParkingSpaceAddress}
              </Text>
              <Text style={styles.infoText}>
                Only {SelectedParkingSpace?.ParkingSpaces} Space Available
              </Text>

              <Text style={styles.infoText}>
                Status:{" "}
                {SelectedParkingSpace?.Status.charAt(0).toUpperCase() +
                  SelectedParkingSpace?.Status.slice(1).toLowerCase()}
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
              <Text style={styles.buttonText}>
                Reserve for ${SelectedParkingSpace?.PricingPlan}/hr
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default NearByLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 6,
    marginRight: 10,
  },

  map: {
    flex: 1,
    width: "100%",
  },

  marker: {
    width: 3,
    height: 3,
  },

  calloutContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 70,
    height: 40,
    borderRadius: 10,
  },

  calloutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  arrowDown: {
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: "transparent",
    borderRightWidth: 5,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "black",
  },

  bottomInfo: {
    position: "absolute",
    bottom: 30,
    width: "80%",
    backgroundColor: "white",
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
  },

  infoContainer: {
    gap: 5,
    marginVertical: 10,
  },

  infoText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "500",
  },

  button: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 12,
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
