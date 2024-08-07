import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneNumber from "../../components/PhoneNumber";
import Colors from "../../constants/Colors";
import { useSelector } from "../../store/store";

const SpaceListingSecond = ({ navigation }) => {
  const { user, isLoading, error } = useSelector((state) => state.user);
  const handleNextScreen = () => {
    const { PhoneStatus } = user;

    if (PhoneStatus !== "verified") {
      Alert.alert("Please verify your phone number first to proceed");
      return;
    }
    navigation.navigate("SpaceListingThird"); // Navigate to the 'test01' screen
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.div1}>
          <Text style={styles.text}>That’s it! Well done.</Text>

          <Text style={styles.text3}>
            We need to get you verified as a ‘Driveway Host’ so your Residential
            parking goes live
          </Text>
        </View>

        <PhoneNumber />

        <View style={styles.div2}>
          <Text style={styles.text3}>
            In the meantime, while you verify your number. It’s time to upload
            some photos of your Driveway or allocated parking spaces
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleNextScreen}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    height: "100%",
    gap: 30,
  },
  div1: {
    gap: 10,
  },

  text: {
    fontSize: 32,
    fontWeight: "600",
  },

  text2: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 20,
  },

  text3: {
    fontSize: 16,
    fontWeight: "300",
  },

  textInputStyle: {
    width: "100%",
    borderWidth: 0.3,
    borderRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 15,
    marginVertical: 15,
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
});

export default SpaceListingSecond;
