import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import Shimmer from "../../components/Shimmer";
import { useSelector } from "../../store/store";

const SpacePricingSecond = ({ navigation }) => {
  const { DrivingHostData, isLoading, error } = useSelector(
    (state) => state.DrivingHost
  );

  const handleValidationAndNavigation = () => {
    const { PricingPlan } = DrivingHostData;

    if (PricingPlan !== "automated") {
      alert("Please select Automated pricing to proceed");
      return;
    }

    navigation.navigate("SpaceListing");
  };
  return (
    <ScrollView>
      <View style={styles.mainView}>
        <View style={styles.div1}>
          <Text style={styles.text2heading}>The pricing breakdown</Text>
          <Text style={styles.text3}>
            Below is our recommendation based on your location. However you can
            set your own price.
          </Text>
        </View>

        <View style={styles.div3}>
          <Shimmer width={130}>
            <Text style={styles.text3}>
              <Text style={{ fontWeight: "bold" }}>$1.60</Text> per hour
            </Text>
          </Shimmer>
          <Shimmer width={120}>
            <Text style={styles.text3}>
              <Text style={{ fontWeight: "bold" }}>$8.00</Text> per day
            </Text>
          </Shimmer>
          <Shimmer width={130}>
            <Text style={styles.text3}>
              <Text style={{ fontWeight: "bold" }}>$32.00</Text> per week
            </Text>
          </Shimmer>
          <Shimmer width={200}>
            <Text style={styles.text3}>
              <Text style={{ fontWeight: "bold" }}>$150.00</Text> per monthly
              booking
            </Text>
          </Shimmer>
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleValidationAndNavigation}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 20,
    gap: 20,
  },

  text: {
    fontSize: 15,
    fontWeight: "100",
  },

  text2: {
    fontSize: 20,
    fontWeight: "500",
  },

  text3: {
    fontSize: 16.1,
    fontWeight: "300",
  },

  text2heading: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },

  div2: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    paddingVertical: 25,
  },

  div3: {
    marginVertical: 10,
    gap: 18,
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

export default SpacePricingSecond;
