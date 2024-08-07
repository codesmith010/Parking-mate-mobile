import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { getUserEarning } from "../../features/earning/earningActions";
import { dispatch, useSelector } from "../../store/store";
import { useFocusEffect } from "@react-navigation/native";
import WithdrawEarningCheckout from "../../components/WithdrawEarningCheckout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDeleteLeft,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const Earning = () => {
  const { user } = useSelector((state) => state.user);
  const { EarningData, isLoading, error } = useSelector(
    (state) => state.Earning
  );
  const [update, setUpdate] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handleGetUserEarning();

      return () => {};
    }, [update])
  );

  // handle update earning screen
  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleGetUserEarning = () => {
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

    dispatch(getUserEarning(params));
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <Text style={styles.text}>Earnings</Text>

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
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 28, color: "white" }}>
            $
            {EarningData?.totalEarnings === "0" ||
            Object.keys(EarningData).length === 0
              ? "0.00"
              : EarningData?.totalEarnings?.toFixed(2)}
          </Text>
          <Text style={{ fontSize: 16, color: "white" }}>Total Earnings</Text>
        </View>

        <View
          style={{
            borderWidth: 0.3,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 10,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.greenDark,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 28, color: "white" }}>
            $
            {EarningData?.paidEarnings === "0" ||
            Object.keys(EarningData).length === 0
              ? "0.00"
              : EarningData?.paidEarnings?.toFixed(2)}
          </Text>
          <Text style={{ fontSize: 16, color: "white" }}>Paid Earnings</Text>
        </View>
        {EarningData?.totalEarnings === "0" ||
        Object.keys(EarningData).length === 0 ? null : (
          <WithdrawEarningCheckout handleUpdate={handleUpdate} />
        )}

        {Object.keys(EarningData).length === 0 ||
        EarningData?.earningData?.length === 0 ? (
          <Text style={{ textAlign: "center" }}>No Data to show</Text>
        ) : null}
        {EarningData?.earningData?.map((data, index) => {
          var formattedDate = new Date(data?.createdAt);
          return (
            <TouchableOpacity key={index} style={styles.div2}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 20,
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
                    {"#" + data?.parkingSpaceID}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faMoneyBillTransfer}
                  style={{
                    color: data.status === "earned" ? Colors.green : Colors.red, // Default color is Colors.grayDark
                  }}
                  size={24}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "500" }}>
                  Date: {formattedDate?.toLocaleDateString()}{" "}
                </Text>
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
                  <Text style={styles.text3}>Status: </Text>
                  <Text style={styles.text3}>
                    {data.status.slice(0, 1).toUpperCase() +
                      data.status.slice(1)}
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
                    ${data?.amount}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "600",
  },

  text2: {
    fontSize: 12,
    fontWeight: "500",
  },

  text3: {
    fontSize: 14,
    fontWeight: "500",
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

export default Earning;
