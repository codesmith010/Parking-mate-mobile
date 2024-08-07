import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { dispatch, useSelector } from "../../store/store";
import { deleteUser } from "../../features/auth/authActions";

const ISetting = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  useFocusEffect(
    useCallback(() => {
      return () => {
        // console.log("unfocused, screen closed");
      };
    }, [])
  );

  const handleDeleteUserAccount = () => {
    const payload = {
      userID: user._id,
    };
    const successCallback = (response) => {
      Alert.alert(response);
      // setUpdate(!update);
      setTimeout(() => {
        navigation.navigate("Logout");
      }, 1000);
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };

    dispatch(deleteUser(params));
  };

  const deleteAlert = (parkingSpaceID) => {
    Alert.alert(
      "Delete",
      "Do you want to delete your account?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: handleDeleteUserAccount,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.div2}
          onPress={() => navigation.navigate("SubscriptionStatus")}
        >
          <View style={styles.mainView2}>
            <View>
              <Text style={styles.text2}>Subscription</Text>
            </View>
          </View>
          <View style={styles.view3}>
            <View>
              <Text style={styles.text3}>Check Subscription Status</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.div2} onPress={deleteAlert}>
          <View style={styles.mainView2}>
            <View>
              <Text style={styles.text2}>Account Deletion</Text>
            </View>
          </View>
          <View style={styles.view3}>
            <View>
              <Text style={styles.text3}>Delete your account</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 20,
    backgroundColor: "white",
  },
  mainView2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  view3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
  },

  text2: {
    fontSize: 18,
    fontWeight: "600",
  },

  text3: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.gray,
  },

  div2: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: Colors.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    elevation: 1,
    padding: 18,
    gap: 6,
    alignItems: "flex-start",
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

export default ISetting;
