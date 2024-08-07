import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Listing3 = () => {
  return (
    <View style={styles.mainView}>
      {/* <SafeAreaView /> */}
      <View style={styles.div1}>
        <Text style={styles.text2}>How to make your listing stand out</Text>
        <Text style={styles.text3}>
          Now your listing has been submitted why not really sell your space by
          adding a description and photos?
        </Text>
        <Text style={styles.text3}>
          The more usefull information you add to your listing, the more
          confident a driver will feel when booking.
        </Text>
      </View>

      <View style={styles.div3}>
        <Text style={styles.text4}>Add photos</Text>
        <Text style={styles.text3}>
          Photos encourage trust and make your space stand out.
        </Text>
      </View>
      <View style={styles.div3}>
        <Text style={styles.text4}>Add a description and features</Text>
        <Text style={styles.text3}>
          Make your space more appealing to drivers.
        </Text>
      </View>

      <View style={styles.div2}>
        <Text style={styles.text2}>The important bit, getting paid!</Text>
        <Text style={styles.text3}>
          Payouts are done via bank transfer to your designated account. Let us
          know where you'd like us to send your money.
        </Text>
      </View>

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
    gap: 20,
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

  text4: {
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "400",
  },

  div2: {
    marginVertical: 30,
  },

  div3: {
    borderWidth: 0.3,
    marginVertical: 10,
    padding: 20,
    borderRadius: 5,
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

export default Listing3;
