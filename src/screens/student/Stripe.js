// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Button,
//   Alert,
//   TouchableOpacity,
//   Image,
//   Pressable,
//   Dimensions,
// } from "react-native";
// import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
// import {
//   CommonActions,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import CustomStatusBar from "../../components/CustomStatusBar";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch, useSelector } from "react-redux";
// import { createPayment } from "../../features/studentClassPayment/studentClassPaymentActions";
// import { fetchPaymentIntentClientSecret } from "../../features/paymentIntent/paymentIntentActions";
// import { createBooking } from "../../features/createStudentBooking/createStudentBookingActions";

// //ADD localhost address of your server
// // const API_URL = "";

// const Stripe = () => {
//   const { user } = useSelector((state) => state.user);
//   console.log("user: ", user.email);
//   const [email, setEmail] = useState(user.email);
//   const [amount, setAmount] = useState("5");
//   const [cardDetails, setCardDetails] = useState();
//   const { confirmPayment, loading } = useConfirmPayment();
//   const route = useRoute();

//   // Access the data sent from the previous screen
//   const receivedData = route?.params.data;

//   console.log("receivedData: ", receivedData);

//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const formattedDate = new Date().toLocaleDateString("en-US");

//   useEffect(() => {
//     // This code will run when the component mounts

//     // Return a function to be executed when the component unmounts
//     return () => {
//       // Reset the navigation stack
//       console.log("Unmount");
//       navigation.reset({
//         index: 0, // Index of the screen to reset to (typically 0)
//         routes: [{ name: "SHome" }], // Specify the screen(s) to reset to
//       });
//     };
//   }, []);

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
//   //       amount: amount * 100,
//   //       currency: "usd",
//   //       payment_method_types: ["card"],
//   //     }),
//   //   });
//   //   const { clientSecret, error } = await response.json();
//   //   return { clientSecret, error };
//   // };

//   const handlePayPress = async () => {
//     console.log("RDATA: ", receivedData.CostPerSession);
//     //1.Gather the customer's billing information (e.g., email)
//     if (!cardDetails?.complete || !email) {
//       Alert.alert("Please enter Complete card details and Email");
//       return;
//     }
//     const billingDetails = {
//       email: email,
//     };
//     //2.Fetch the intent client secret from the backend
//     try {
//       const { clientSecret, error } = await fetchPaymentIntentClientSecret(
//         user.firstName,
//         user.email,
//         receivedData.CostPerSession * 100,
//         user.userToken
//       );
//       //2. confirm the payment
//       if (error) {
//         console.log("Unable to process payment");
//       } else {
//         const { paymentIntent, error } = await confirmPayment(clientSecret, {
//           paymentMethodType: "Card",
//           billingDetails: billingDetails,
//         });
//         if (error) {
//           alert(`Payment Confirmation Error ${error.message}`);
//         } else if (paymentIntent) {
//           dispatch(
//             createBooking({
//               userID: user._id,
//               classID: receivedData._id,
//               bookingDate: formattedDate,
//               paymentID: paymentIntent.id,
//               token: user.userToken,
//             })
//           );
//           dispatch(
//             createPayment({
//               userID: user._id,
//               classID: receivedData._id,
//               paymentAmount: receivedData.CostPerSession,
//               paymentID: paymentIntent.id,
//               token: user.userToken,
//             })
//           ).then((response) => {
//             console.log("response: ", response.meta.requestStatus);
//             if (response.meta.requestStatus === "fulfilled") {
//               console.log("--------------------------- /n");
//               console.log("Payment successful : >", paymentIntent.id);
//               Alert.alert("Payment Successful");

//               navigation.dispatch(
//                 CommonActions.reset({
//                   index: 0,
//                   routes: [{ name: "SHome" }],
//                 })
//               );
//               navigation.goBack();
//             }
//           });
//         }
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <SafeAreaProvider>
//       <CustomStatusBar backgroundColor="#15326B" />
//       <View style={styles.container}>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingBottom: 5,
//             // backgroundColor: "#fff",
//             borderBottomColor: "#ccc",
//             borderBottomWidth: 1,
//             paddingHorizontal: 10,
//             width: Dimensions.get("window").width,
//           }}
//         >
//           <Pressable onPress={() => navigation.goBack()}>
//             <FontAwesomeIcon
//               icon={faArrowLeft}
//               style={{ color: "#0741ad" }}
//               size={28}
//             />
//           </Pressable>
//           <Text style={{ fontSize: 16, fontWeight: "bold", marginRight: 15 }}>
//             Payment
//           </Text>
//           <Text></Text>
//         </View>
//         <View>
//           <Image
//             style={styles.imgContainer}
//             source={require("../../../assets/512-fithubs.png")}
//           />
//         </View>

//         <Text style={styles.title}>Make a Payment to book your class</Text>

//         <TextInput
//           autoCapitalize="none"
//           placeholder="E-mail"
//           keyboardType="email-address"
//           // onChange={(value) => setEmail(value.nativeEvent.text)}
//           style={styles.input}
//           value={email}
//           editable={false}
//         />
//         <CardField
//           postalCodeEnabled={true}
//           placeholder={{
//             number: "4242 4242 4242 4242",
//           }}
//           cardStyle={styles.card}
//           style={styles.cardContainer}
//           onCardChange={(cardDetails) => {
//             setCardDetails(cardDetails);
//           }}
//         />
//         <Text
//           autoCapitalize="none"
//           keyboardType="email-address"
//           style={styles.input}
//         >
//           Total Amount : ${receivedData.CostPerSession}
//         </Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handlePayPress}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>Pay Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaProvider>
//   );
// };

// export default Stripe;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     margin: 20,
//     gap: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#F2F2F2",
//     borderRadius: 8,
//     fontSize: 18,
//     height: 50,
//     width: "100%",
//     padding: 10,
//     marginBottom: 20,
//   },
//   imgContainer: {
//     width: 100,
//     height: 100,
//   },
//   card: {
//     backgroundColor: "#F2F2F2",
//   },
//   cardContainer: {
//     height: 50,
//     width: "100%",
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     borderRadius: 8,
//     height: 50,
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
