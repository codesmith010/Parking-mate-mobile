import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

const GetQuoteScreen = () => {
  return (
    <ScrollView>
      <View style={styles.mainView}>
        {/* <SafeAreaView /> */}
        <View style={styles.div1}>
          <Text style={styles.text}>
            Emily in New York earns enough to cover her monthly energy bills,
            what could your space pay for?
          </Text>
        </View>
        <View style={styles.div2}>
          <Text style={styles.text2}>
            Find out how much your driveway or parking space could in your area.
          </Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your name"
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your postcode"
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your email to receive your qoute"
          />

          <TouchableOpacity style={styles.firstbuttonStyle}>
            <Text style={styles.buttonText}>Get quote</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondbuttonStyle}>
            <Text style={styles.buttonText}>Rent out your space</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },

  div1: {
    marginVertical: 60,
    marginHorizontal: 20,
  },

  text: {
    fontSize: 24,
    fontWeight: "700",
  },

  div2: {
    gap: 10,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: 25,
  },

  text2: {
    fontSize: 20,
    fontWeight: "600",
  },

  textInputStyle: {
    height: 45,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginTop: 10,
  },

  InputViewStyle: {
    marginHorizontal: 10,
    marginTop: 15,
  },

  firstbuttonStyle: {
    backgroundColor: Colors.primaryDark,
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 6,
    width: "40%",
  },

  secondbuttonStyle: {
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 6,
    width: "70%",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default GetQuoteScreen;
