import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for fetching classes
export const createPaymentIntent = createAsyncThunk(
  "book/create",
  async (paymentData, thunkAPI) => {
    try {
      console.log("paymentData: ", paymentData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authoritzation: paymentData.userToken,
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/payment/create-payment-intent`, // Replace with your actual API endpoint
        paymentData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for fetching classes
export const getPaymentIntent = createAsyncThunk(
  "instructorpayment/history",
  async (userData, thunkAPI) => {
    try {
      console.log("paymentData: ", userData.userToken);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.userToken,
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.get(
        `${BASE_URL}/instructor-payment/get/${userData._id}`, // Replace with your actual API endpoint
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchPaymentIntentClientSecret = async (
  firstName,
  email,
  amount,
  token
) => {
  const response = await fetch(`${BASE_URL}/payment/create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      // params: {
      //   amount: 1099,
      //   currency: "usd",
      //   payment_method_types: ["card"],
      // },
      firstName: firstName,
      email: email,
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    }),
  });
  const { clientSecret, error } = await response.json();
  return { clientSecret, error };
};
