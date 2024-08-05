// // import {
// //   PlatformPay,
// //   PlatformPayButton,
// //   StripeProvider,
// //   confirmPlatformPayPayment,
// //   isPlatformPaySupported,
// // } from "@stripe/stripe-react-native";
// import { useEffect, useState } from "react";
// import { Alert, TouchableOpacity, View, Text } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPaymentIntent,
//   fetchPaymentIntentClientSecret,
// } from "../../features/paymentIntent/paymentIntentActions";
// import {
//   createInstructorPayment,
//   createPayment,
// } from "../../features/instructorClassPayment/instructorClassPaymentActions";
// import { createAdvertiseClass } from "../../features/advertiseClass/advertiseClassActions";
// import { CommonActions, useNavigation } from "@react-navigation/native";

// const MyApplePay = ({ advertiseClassData, handleAdvertiseClass }) => {
//   return (
//     <StripeProvider
//       merchantIdentifier=""
//       publishableKey=""
//     >
//       <ApplePayScreen
//         receivedData={advertiseClassData}
//         handleAdvertiseClass={handleAdvertiseClass}
//       />
//     </StripeProvider>
//   );
// };

// function ApplePayScreen({ receivedData, handleAdvertiseClass }) {
//   const [packages, setPackages] = useState([]);
//   console.log("receivedData: ", receivedData);
//   const { user } = useSelector((state) => state.user);
//   const { AdvertiseClass, isLoading, error } = useSelector(
//     (state) => state.AdvertiseClass
//   );
//   console.log("AdvertiseClass: useSelector ", AdvertiseClass._id);
//   // const { PaymentIntent } = useSelector((state) => state.PaymentIntent);
//   const [isApplePaySupported, setIsApplePaySupported] = useState(false);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // const API_URL = "http://192.168.0.104:4000/api";

//   useEffect(() => {
//     (async function () {
//       setIsApplePaySupported(await isPlatformPaySupported());
//     })();
//   }, [isPlatformPaySupported]);

//   // ...
//   // const fetchPaymentIntentClientSecret = async () => {
//   //   const response = await fetch(`${API_URL}/create-payment-intent`, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       // params: {
//   //       //   amount: 1099,
//   //       //   currency: "usd",
//   //       //   payment_method_types: ["card"],
//   //       // },
//   //       amount: 495,
//   //       currency: "usd",
//   //       // payment_method_types: ["card"],
//   //     }),
//   //   });
//   //   const { clientSecret, error } = await response.json();
//   //   return { clientSecret, error };
//   // };

//   // const pay = async () => {
//   //   try {
//   //     // Dispatch the createCanCover action
//   //     const creatingAdvertiseClass = await dispatch(
//   //       createAdvertiseClass(receivedData)
//   //     );
//   //     console.log(
//   //       "creatingAdvertiseClass: <><> ",
//   //       creatingAdvertiseClass.meta.requestStatus
//   //     );

//   //     // Dispatch the action to create a payment intent and wait for it to complete
//   //     await dispatch(
//   //       createPaymentIntent({
//   //         amount: 495,
//   //         currency: "usd",
//   //         userToken: user.userToken,
//   //       })
//   //     );

//   //     // Now, you can use PaymentIntent as you did before
//   //     const { clientSecret } = PaymentIntent;

//   //     const { paymentIntent, error } = await confirmPlatformPayPayment(
//   //       clientSecret,
//   //       {
//   //         applePay: {
//   //           cartItems: [
//   //             {
//   //               label: "Advertise Class",
//   //               amount: "4.95",
//   //               paymentType: PlatformPay.PaymentType.Immediate,
//   //             },
//   //             {
//   //               label: "Total",
//   //               amount: "4.95",
//   //               paymentType: PlatformPay.PaymentType.Immediate,
//   //             },
//   //           ],
//   //           merchantCountryCode: "US",
//   //           currencyCode: "USD",
//   //           requiredShippingAddressFields: [
//   //             PlatformPay.ContactField.PostalAddress,
//   //           ],
//   //           requiredBillingContactFields: [
//   //             PlatformPay.ContactField.PhoneNumber,
//   //           ],
//   //         },
//   //       }
//   //     );

//   //     if (error) {
//   //       // Handle error
//   //       console.log("Error: ", error);
//   //     } else {
//   //       // dispatch(
//   //       //   createInstructorPayment({
//   //       //     userID: user._id,
//   //       //     classID: AdvertiseClass._id,
//   //       //     paymentID: paymentIntent.id,
//   //       //     paymentAmount: "4.95",
//   //       //   })
//   //       // );
//   //       Alert.alert("Success", "Check the logs for payment intent details.");
//   //       console.log(JSON.stringify(paymentIntent.id, null, 2));
//   //     }
//   //   } catch (e) {
//   //     // Handle any errors that occur during dispatch or other operations
//   //     console.error("An error occurred:", e);
//   //   }
//   // };

//   const pay = async () => {
//     if (handleAdvertiseClass() === true) {
//       const creatingAdvertiseClass = await dispatch(
//         createAdvertiseClass(receivedData)
//       );
//       console.log("><", creatingAdvertiseClass.payload);

//       //     // Dispatch the action to create a payment intent and wait for it to complete
//       // const myPaymentIntent = await dispatch(
//       //   createPaymentIntent({
//       //     amount: 495,
//       //     currency: "usd",
//       //     userToken: user.userToken,
//       //   })
//       // );

//       // const { clientSecret } = myPaymentIntent.payload;
//       const { clientSecret } = await fetchPaymentIntentClientSecret(
//         user.firstName,
//         user.email,
//         495,
//         user.userToken
//       );

//       const { paymentIntent, error } = await confirmPlatformPayPayment(
//         clientSecret,
//         {
//           applePay: {
//             cartItems: [
//               {
//                 label: "Advertise Class",
//                 amount: "4.95",
//                 paymentType: PlatformPay.PaymentType.Immediate,
//               },
//               {
//                 label: "Total",
//                 amount: "4.95",
//                 paymentType: PlatformPay.PaymentType.Immediate,
//               },
//             ],
//             merchantCountryCode: "US",
//             currencyCode: "USD",
//             requiredShippingAddressFields: [
//               PlatformPay.ContactField.PostalAddress,
//             ],
//             requiredBillingContactFields: [
//               PlatformPay.ContactField.PhoneNumber,
//             ],
//           },
//         }
//       );
//       if (error) {
//         // handle error
//         console.log("Error: ", error);
//       } else {
//         dispatch(
//           createInstructorPayment({
//             userID: user._id,
//             classID: creatingAdvertiseClass.payload._id,
//             paymentID: paymentIntent.id,
//             paymentAmount: "4.95",
//             token: user.userToken,
//           })
//         );
//         Alert.alert("Success");
//         console.log(JSON.stringify(paymentIntent.id, null, 2));
//         // Navigating to Home screen
//         // navigation.dispatch(
//         //   CommonActions.reset({
//         //     index: 0,
//         //     routes: [{ name: "IHome" }],
//         //   })
//         // );
//         navigation.goBack();
//       }
//     }
//   };

//   // ...

//   return (
//     // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <>
//       {isApplePaySupported && (
//         <PlatformPayButton
//           onPress={pay}
//           type={PlatformPay.ButtonType.Subscribe}
//           appearance={PlatformPay.ButtonStyle.Black}
//           borderRadius={20}
//           style={{
//             width: "80%",
//             height: 50,
//             marginBottom: 70,
//             padding: 4,
//           }}
//         />
//       )}
//     </>
//     // </View>
//   );
// }

// export default MyApplePay;
