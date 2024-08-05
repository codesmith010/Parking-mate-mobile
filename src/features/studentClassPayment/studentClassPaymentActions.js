import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for fetching classes
export const createPayment = createAsyncThunk(
  "book/create",
  async (paymentData, thunkAPI) => {
    try {
      console.log("paymentData: ", paymentData.token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: paymentData.token,
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/student-payment/create`, // Replace with your actual API endpoint
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
export const getPaymentHistory = createAsyncThunk(
  "stpayment/history",
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
        `${BASE_URL}/student-payment/get/${userData._id}`, // Replace with your actual API endpoint
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
