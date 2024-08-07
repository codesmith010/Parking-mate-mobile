import { MERCHANT_ID, PUBLISHER_ID } from "@env";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  PlatformPay,
  PlatformPayButton,
  StripeProvider,
  confirmPlatformPayPayment,
  isPlatformPaySupported,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBalance } from "../features/balance/balanceActions";
import { fetchPaymentIntentClientSecret } from "../features/paymentIntent/paymentIntentActions";
import { dispatch, useSelector } from "../store/store";

const ApplePay = () => {
  return (
    <StripeProvider
      merchantIdentifier={MERCHANT_ID}
      publishableKey={PUBLISHER_ID}
    >
      <ApplePayScreen />
    </StripeProvider>
  );
};
export default ApplePay;

function ApplePayScreen() {
  const { user } = useSelector((state) => state.user);
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState({
    basic: true,
    standard: false,
    deluxe: false,
  });
  const navigation = useNavigation();

  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  const handleAddBalance = async ({ PaymentID, Amount }) => {
    const payload = {
      userID: user._id,
      PaymentID,
      Amount,
    };
    const successCallback = (response) => {
      Alert.alert(response);
      setLoader(false);
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "SHome" }],
          })
        );
      }, 1000);
    };

    const errorCallback = (error) => {
      Alert.alert(error);
      setLoader(false);
    };
    const params = {
      successCallback,
      errorCallback,
      payload,
    };

    await dispatch(createBalance(params));
  };

  const payBasic = async (clientSecret) => {
    const { paymentIntent, error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        applePay: {
          cartItems: [
            {
              label: "Parking Mate App - Driver Basic",
              amount: "10",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: "Parking Mate App - Fees",
              amount: "0.61",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: "Parking Mate App - Total",
              amount: "10.61",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: "US",
          currencyCode: "USD",
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      }
    );

    if (paymentIntent && paymentIntent.status === "Succeeded") {
      handleAddBalance({
        userID: user?._id,
        PaymentID: paymentIntent?.id,
        Amount: 10,
      });
    }
    if (error) {
      // handle error
      setLoader(false);
      // console.log("Error: ", error);
    }
  };
  const payStandard = async (clientSecret) => {
    const { paymentIntent, error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        applePay: {
          cartItems: [
            {
              label: "Parking Mate App - Driver Standard",
              amount: "20",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: "Parking Mate App - Fees",
              amount: "0.91",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: "Parking Mate App - Total",
              amount: "20.91",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: "US",
          currencyCode: "USD",
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      }
    );
    if (paymentIntent && paymentIntent.status === "Succeeded") {
      handleAddBalance({
        userID: user?._id,
        PaymentID: paymentIntent?.id,
        Amount: 20,
      });
    }
    if (error) {
      // handle error
      setLoader(false);
      // console.log("Error: ", error);
    }
  };
  const payDeluxe = async (clientSecret) => {
    const { paymentIntent, error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        applePay: {
          cartItems: [
            {
              label: "Parking Mate App - Driver Deluxe",
              amount: "50",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: "Parking Mate App - Fees",
              amount: "1.8",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: "Parking Mate App - Total",
              amount: "51.8",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: "US",
          currencyCode: "USD",
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      }
    );
    if (paymentIntent && paymentIntent.status === "Succeeded") {
      handleAddBalance({
        userID: user?._id,
        PaymentID: paymentIntent?.id,
        Amount: 50,
      });
    }
    if (error) {
      // handle error
      setLoader(false);
      // console.log("Error: ", error);
    }
  };

  // Handle Pay
  const handlePay = () => {
    const payload = {
      firstName: user?.firstName,
      user: user?._id,
      email: user?.email,
      currency: "usd",
      userToken: user?.userToken,
    };

    if (selected.basic) {
      payload.amount = "1061";
    } else if (selected.standard) {
      payload.amount = "2091";
    } else if (selected.deluxe) {
      payload.amount = "5180";
    }

    const successCallback = (response) => {
      const { clientSecret } = response;

      if (selected.basic) {
        payBasic(clientSecret);
      } else if (selected.standard) {
        payStandard(clientSecret);
      } else if (selected.deluxe) {
        payDeluxe(clientSecret);
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
    setLoader(true);
    dispatch(fetchPaymentIntentClientSecret(params));
  };

  const handleSelect = (option) => {
    setSelected({
      ...selected,
      basic: false,
      standard: false,
      deluxe: false,
      [option]: true,
    });
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => handleSelect("basic")}
          style={[styles.optionButton, selected.basic && styles.selectedButton]}
        >
          <Text
            style={[styles.optionText, selected.basic && styles.selectedText]}
          >
            $10
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("standard")}
          style={[
            styles.optionButton,
            selected.standard && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected.standard && styles.selectedText,
            ]}
          >
            $20
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("deluxe")}
          style={[
            styles.optionButton,
            selected.deluxe && styles.selectedButton,
          ]}
        >
          <Text
            style={[styles.optionText, selected.deluxe && styles.selectedText]}
          >
            $50
          </Text>
        </TouchableOpacity>
      </View>
      {loader && (
        <View
          style={[
            PlatformPay.ButtonStyle.Black,
            {
              width: "80%",
              height: 50,
              marginBottom: 70,
              padding: 4,
            },
          ]}
        >
          <ActivityIndicator animating={loader} size="large" />
        </View>
      )}
      {isApplePaySupported && !loader && (
        <PlatformPayButton
          onPress={handlePay}
          type={PlatformPay.ButtonType.AddMoney}
          appearance={PlatformPay.ButtonStyle.Black}
          borderRadius={20}
          style={{
            width: "80%",
            height: 50,
            marginBottom: 70,
            padding: 4,
          }}
        />
      )}
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
});
