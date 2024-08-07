import { MERCHANT_ID, PUBLISHER_ID } from "@env";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { setAccountID, setOnboarding } from "../features/earning/earningSlice";
import {
  fetchOnBoardingStatus,
  fetchWithdrawPaymentIntentClientSecret,
  transferPayment,
  updateWithdrawPayment,
} from "../features/paymentIntent/paymentIntentActions";
import { dispatch, useSelector } from "../store/store";

const WithdrawEarningCheckout = ({ handleUpdate }) => {
  return (
    <StripeProvider
      merchantIdentifier={MERCHANT_ID}
      publishableKey={PUBLISHER_ID}
    >
      <WithdrawEarningScreen handleUpdate={handleUpdate} />
    </StripeProvider>
  );
};
export default WithdrawEarningCheckout;

function WithdrawEarningScreen({ handleUpdate }) {
  const { user } = useSelector((state) => state.user);
  const { EarningData, accountID, onboarding } = useSelector(
    (state) => state.Earning
  );
  const [loader, setLoader] = useState(false);

  const redirectUserToAccountLink = async (accountLinkURL) => {
    try {
      // Alert the user before redirecting
      Alert.alert(
        "Redirect to Stripe",
        "We will redirect you to Stripe to attach your bank account",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setLoader(false);
            },
          },
          {
            text: "OK",
            onPress: async () => {
              // Open the account link URL in the browser or default external app
              await Linking.openURL(accountLinkURL);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error occurred while redirecting:", error);
      // Handle error, such as showing a message to the user
    }
  };

  // Handle Pay
  const handlePaymentSheet = () => {
    const payload = {
      firstName: user?.firstName,
      user: user?._id,
      email: user?.email,
      currency: "usd",
      userToken: user?.userToken,
    };

    const successCallback = (response) => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        accountLinkURL,
        accountID,
      } = response;

      redirectUserToAccountLink(accountLinkURL);
      dispatch(setAccountID({ accountID: accountID, onboarding: true }));
    };

    const errorCallback = (error) => {
      setLoader(false);
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };
    setLoader(true);
    dispatch(fetchWithdrawPaymentIntentClientSecret(params));
  };

  useFocusEffect(
    useCallback(() => {
      if (onboarding) {
        const intervalId = setInterval(checkOnboardingStatus, 20000); // 20 seconds

        const timeoutId = setTimeout(() => {
          clearInterval(intervalId);
        }, 900000); // 15 minutes

        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId); // Clearing the timeout to prevent the interval from being cleared after screen close
        };
      }
    }, [onboarding === true])
  );

  const checkOnboardingStatus = () => {
    handleOnboardingStatus();
  };

  // Handle Pay
  const handleOnboardingStatus = () => {
    const payload = {
      accountID: accountID,
    };

    const successCallback = (response) => {
      const { onboardingStatus } = response;
      if (onboardingStatus === true) {
        dispatch(setOnboarding(false));
        handleUpdateWithdrawMethod(onboardingStatus);
      }
    };

    const errorCallback = (error) => {
      setLoader(false);
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };
    dispatch(fetchOnBoardingStatus(params));
  };

  // update withdraw method
  const handleUpdateWithdrawMethod = (isBankAttached) => {
    const payload = {
      userID: user._id,
      accountID: accountID,
      isBankAccountAttached: isBankAttached,
    };

    const successCallback = (response) => {
      setLoader(false);
      handleUpdate();

      Alert.alert("Success", "Successfully attached bank account");
    };

    const errorCallback = (error) => {
      setLoader(false);
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };
    dispatch(updateWithdrawPayment(params));
  };

  // create withdraw request
  const handlePaymentTransfer = (isBankAttached) => {
    if (
      EarningData.totalEarnings - EarningData.paidEarnings <= 0 ||
      Object.keys(EarningData).length === 0
    ) {
      return Alert.alert(
        "Insufficient Earnings",
        "You do not have enough earnings to withdraw money."
      );
    }

    if (!isBankAttached || !EarningData.accountID) {
      return Alert.alert(
        "Bank Account Required",
        "Please attach your bank account before sending a withdrawal request."
      );
    }
    const amountToBePay =
      EarningData.totalEarnings.toFixed(2) * 100 -
      EarningData.paidEarnings.toFixed(2) * 100;

    const payload = {
      userID: user._id,
      amount: amountToBePay,
      currency: "usd",
      destination: EarningData.accountID || accountID,
      transfer_group: "DRIVERHOST_EARNING_PAYMENT",
    };

    const successCallback = (response) => {
      setLoader(false);
      handleUpdate();
      Alert.alert("Success", "Successfully sent payment");
    };

    const errorCallback = (error) => {
      setLoader(false);
      Alert.alert(error);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };
    dispatch(transferPayment(params));
  };

  return (
    <>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexDirection: "row", gap: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={
            !EarningData.isBankAccountAttached
              ? styles.button
              : styles.disabledButton
          }
          onPress={() => {
            if (!EarningData.isBankAccountAttached && !loader) {
              handlePaymentSheet(); // Only call handlePaymentSheet if bank account is not attached and loader is false
            }
          }}
          disabled={EarningData.isBankAccountAttached}
        >
          {loader ? (
            <ActivityIndicator animating={loader} size="small" />
          ) : (
            <Text
              style={
                !EarningData.isBankAccountAttached
                  ? styles.buttonText
                  : styles.disabledButtonText
              }
            >
              {EarningData.isBankAccountAttached
                ? "Bank Account Attached"
                : "Attach Your Bank Account"}
            </Text>
          )}
          {EarningData.isBankAccountAttached && (
            <FontAwesomeIcon
              icon={faCheck}
              style={{
                color: Colors.grayDark,
              }}
              size={12}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePaymentTransfer}>
          <Text style={styles.buttonText}>Withdraw Money Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "lightblue",
    borderColor: "blue",
  },
  selectedText: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  disabledButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.gray, // Change to your desired disabled button background color
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.lightGray, // Change to your desired border color for disabled state
    opacity: 0.6, // Adjust opacity to visually indicate the disabled state
  },
  buttonText: {
    color: Colors.black,
    fontSize: 12,
  },
  disabledButtonText: {
    color: Colors.black,
    fontSize: 12,
    opacity: 0.9,
  },

  hidden: {
    opacity: 0,
  },
});
