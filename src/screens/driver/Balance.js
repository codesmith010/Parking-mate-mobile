import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { getUserBalance } from "../../features/balance/balanceActions";
import { dispatch, useSelector } from "../../store/store";

const Balance = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { BalanceTotalAmount, BalanceData, isLoading, error } = useSelector(
    (state) => state.Balance
  );

  useFocusEffect(
    useCallback(() => {
      handleGetUserBalance();

      return () => {};
    }, [])
  );

  const handleGetUserBalance = () => {
    const payload = {
      userID: user._id,
    };

    const errorCallback = (error) => {
      Alert.alert(error);
    };
    const params = {
      errorCallback,
      payload,
    };

    dispatch(getUserBalance(params));
  };

  const handleTopup = () => {
    navigation.navigate("TopupBalance");
  };

  if (isLoading) {
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>;
  }
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.text}>Your Balance</Text>
          <View
            style={{
              borderWidth: 0.3,
              borderRadius: 15,
              paddingVertical: 10,
              paddingHorizontal: 10,
              height: 80,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primaryColor,
              display: "flex",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 28, color: "white" }}>
              ${BalanceTotalAmount === "" ? "0.00" : BalanceTotalAmount}
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>Total Balance</Text>
          </View>

          <ScrollView contentContainerStyle={styles.list1} style={styles.list1}>
            {BalanceData.length === 0 && (
              <Text style={{ textAlign: "center" }}>No Balance to show</Text>
            )}
            {BalanceData.map((data, index) => {
              const formattedDate = new Date(data?.CreatedAt);
              return (
                <TouchableOpacity key={data._id} style={styles.div2}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingBottom: 12,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.primaryLight,
                        padding: 8,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: Colors.primaryColor,
                        }}
                      >
                        {data.Status === "added" ? "Added" : "Spent"}
                      </Text>
                    </View>

                    <FontAwesomeIcon
                      icon={faMoneyBillTransfer}
                      style={{
                        color:
                          data.Status === "added" ? Colors.green : Colors.red, // Default color is Colors.grayDark
                      }}
                      size={24}
                    />
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text3}>Date: </Text>
                      <Text style={styles.text3}>
                        {formattedDate.toLocaleDateString()}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.primaryColor,
                        padding: 8,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        ${data.Amount}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleTopup}>
        <Text>Topup your Balance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  mainView: {
    flex: 1,
    gap: 15,
    marginVertical: 30,
    marginHorizontal: 20,
    position: "relative",
    width: "90%",
  },

  text: {
    fontSize: 25,
    fontWeight: "600",
  },
  list1: {
    gap: 16,
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
    gap: 4,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Balance;
