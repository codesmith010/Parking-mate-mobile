import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const withDrawal = () => {
  return (
    <View style={styles.mainView}>
      {/* <SafeAreaView /> */}
      <View style={styles.div1}>
        <Text style={styles.text2}>Withdrawal frequency</Text>
        <Text style={styles.text3}>
          We will transfer the payment at these intervals to your primary
          withdrawal method. It may take up to 10 working days for your payment
          to arrive
        </Text>
        <Text style={styles.text2}>Withdraw Never - Edit frequency</Text>
      </View>

      <View style={styles.div2}>
        <Text style={styles.text2}>Withdrawal methods</Text>
        <Text style={styles.text3}>
          We need you to do a few things to get your account verified.
        </Text>
      </View>

      <TextInput
        style={styles.textInputStyle}
        placeholder="Verify Phone Number"
      />

      <View style={styles.div2}>
        <Text style={styles.text2}>How to make yor listing stand out</Text>
        <Text style={styles.text3}>
          Now your listing has been submitted why not really sell your space by
          adding a description and photos?
        </Text>
      </View>
      <Text style={styles.text3}>
        The more usefull information you add to yuor listing, the more confident
        a driver will feel when booking.
      </Text>

      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 20,
  },
  div1: {
    marginTop: 40,
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

  div2: {
    marginVertical: 30,
  },

  div3: {
    marginVertical: 30,
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
    backgroundColor: "#50C878",
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

export default withDrawal;
