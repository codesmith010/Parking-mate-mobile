import {
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Purchases from "react-native-purchases";
import { useSelector } from "react-redux";
import { set } from "lodash";
import Colors from "../../constants/Colors";
import BannerAd from "../../components/BannerAd";

const ISetting = () => {
  const { user } = useSelector((state) => state.user);
  const [userHasNotSubscription, setUserHasNotSubscription] = useState(true);
  const [subscriptionDate, setSubscriptionDate] = useState("");
  const [subscriptionExpireDate, setSubscriptionExpireDate] = useState("");
  const [refreshing, setRefreshing] = useState(false); // for pull to refresh

  console.log("userHasNotSubscription: ", userHasNotSubscription);
  useEffect(() => {
    // getting Customer info and checking if the user is subscribed or not
    const getCustomerInfo = async () => {
      const customerInfo = await Purchases.getCustomerInfo();

      console.log("customerInfo: ", customerInfo.entitlements);
      if (
        typeof customerInfo.entitlements.active["advertiseclass"] !==
        "undefined"
      ) {
        // setSubscribeBtn(!subscribeBtn);
        const dateString =
          customerInfo.entitlements.active["advertiseclass"].latestPurchaseDate;
        const formattedDate = formatDate(dateString);
        setSubscriptionDate(formattedDate);

        const expirationDate = new Date(dateString);
        expirationDate.setDate(expirationDate.getDate() + 30);
        const formattedExpireDate = formatDate(expirationDate);
        setSubscriptionExpireDate(formattedExpireDate);
        setUserHasNotSubscription(false);
      } else {
        setUserHasNotSubscription(true);
      }
    };

    const main = async () => {
      // Purchases.setDebugLogsEnabled(true);

      await Purchases.configure({
        apiKey: "appl_NLuggAFNRJJCMTzGkJyrBowiOQD",
      });

      // Load all customer info and the user object with entitlements
      await getCustomerInfo();
      setRefreshing(false);
    };

    main();
  }, [refreshing === true]);

  // Cancel subscription
  const handleCancelSubscription = async () => {
    Linking.openURL("https://apps.apple.com/account/subscriptions");
  };

  // Formating date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Pull to refresh
  const onRefresh = () => {
    // This function will be called when the user pulls down to refresh
    setRefreshing(true);
  };
  // -----------

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primaryColor}
          />
        }
      >
        <Text style={styles.title}>Your Subscription</Text>
        <Text style={styles.coolLine}>
          Keep track of your subscription and payment history
        </Text>
        {userHasNotSubscription ? (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text>No Subscription to show</Text>
          </View>
        ) : (
          <View style={styles.item}>
            <Text style={styles.className}>Advertise Classes</Text>

            <Text style={styles.instructorName}>
              Instructor: {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.amount}>Amount: $4.99 </Text>
            <Text style={styles.paymentDate}>
              Subscription date: {subscriptionDate}
            </Text>
            <Text style={styles.paymentDate}>
              Expire on: {subscriptionExpireDate}{" "}
            </Text>

            <TouchableOpacity
              style={{ flexDirection: "row", justifyContent: "flex-end" }}
              onPress={handleCancelSubscription}
            >
              <Text style={styles.coolLineBottom}> Cancel Subscription</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <BannerAd />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  coolLine: {
    color: "#007AFF",
    fontSize: 18,
    marginBottom: 16,
  },
  coolLineBottom: {
    color: "#007AFF",
    fontSize: 14,
    marginVertical: 16,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: "#F2F2F2",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classType: {
    fontSize: 16,
    color: "#555",
  },
  instructorName: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  paymentDate: {
    fontSize: 16,
    color: "#555",
  },
});

export default ISetting;
