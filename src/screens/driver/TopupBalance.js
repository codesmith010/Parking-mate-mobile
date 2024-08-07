import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ApplePay from "../../components/ApplePay";
import Colors from "../../constants/Colors";

const TopupBalance = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.mainView2}>
          <Text>
            For your convenience, we offer 3 payment bundles.{"\n\n"}
            <Text style={{ fontWeight: "bold" }}>Bundle 1: </Text>
            For less frequent use in searching and booking a parking space.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>Bundle 2: </Text>
            For frequent use in searching and booking a parking space. (most
            popular){"\n\n"}
            <Text style={{ fontWeight: "bold" }}>Bundle 3: </Text>
            Ultimate package. High usage in searching and booking a parking
            space.{"\n\n"}
            You can check your balance at anytime in your menu options
          </Text>
        </View>
        <View style={styles.mainView2}>
          <ApplePay />
          <Text
            style={{
              color: Colors.black,
              fontSize: 12,
              textDecorationLine: "none",
              textAlign: "center",
              letterSpacing: 0.2,
            }}
          >
            By Purchasing, you agree to our {"\n"}
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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    gap: 20,
    backgroundColor: Colors.white,
  },
  mainView2: {
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 20,
    alignItems: "center",
  },

  div1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryColor,
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },

  text2: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 20,
  },

  text3: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
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
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  list1: {
    flex: 1,
    gap: 8,
  },
  div2: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    padding: 14,
    gap: 8,
  },
});

export default TopupBalance;
