import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATH } from "../../constants/endpoints";
import { API } from "../../services/api";

// Async action for fetching classes
export const getPaymentIntent = createAsyncThunk(
  "payment/history",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.userToken,
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.get(
        `${BASE_URL}/payment/get/${userData._id}`, // Replace with your actual API endpoint
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating balance

export const fetchPaymentIntentClientSecret = createAsyncThunk(
  "payment/create",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.payment.create,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response);
      // const { clientSecret, error } = await response.json();
      // return { clientSecret, error };

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchWithdrawPaymentIntentClientSecret = createAsyncThunk(
  "payment/withdraw/create",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.payment.createWithdraw,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response);
      // const { clientSecret, error } = await response.json();
      // return { clientSecret, error };

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchOnBoardingStatus = createAsyncThunk(
  "payment/onboarding/status",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.payment.onboarding,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateWithdrawPayment = createAsyncThunk(
  "payment/withdraw/update",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "PUT",
        endpoint: PATH.payment.updateWithdraw,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const transferPayment = createAsyncThunk(
  "payment/withdraw/transfer",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.payment.createPaymentTransfer,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
