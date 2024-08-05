import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MAP_KEY } from "@env";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Address = ({ route, navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  // const { onAddressSelect } = route.params;

  console.log("MAP__KEY: ", MAP_KEY);

  const handlePlaceSelect = async (data, details = null) => {
    try {
      // Fetch place details using the place_id
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&key=${MAP_KEY}`
      );

      const { lat, lng } = response.data.result.geometry.location;
      const { address_components } = response.data.result;

      // Extract the city, country, and zip code from the address components
      let city = "";
      let country = "";
      address_components.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        } else if (component.types.includes("country")) {
          country = component.long_name;
        }
      });

      // Create a new object with latitude, longitude, city, and country properties
      const location = {
        latitude: lat,
        longitude: lng,
        city,
        country,
      };

      // Update the selected location state
      setSelectedLocation(location);
      setMapRegion({
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Pass the address details back to the signup screen
      route.params.onAddressSelect({
        address: data.description,
        city,
        country,
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
      setSelectedLocation(null);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: Constants.statusBarHeight + 10,
          zIndex: 99,
          height: isTyping ? "100%" : "10%",
          width: "100%",
          // flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
          // backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 5,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ color: "#0741ad" }}
              size={28}
            />
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Enter your Address
          </Text>
          <Text></Text>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Search your Address"
          onPress={handlePlaceSelect}
          query={{
            key: MAP_KEY,
            language: "en",
          }}
          textInputProps={{
            onFocus: () => setIsTyping(true),
            onBlur: () => setIsTyping(false),
          }}
        />
      </View>
      {selectedLocation && (
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          region={mapRegion}
          style={styles.map}
        >
          <Marker coordinate={selectedLocation} />
        </MapView>
      )}
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
