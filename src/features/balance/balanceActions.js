import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";
import { PATH } from "../../constants/endpoints";
import { API } from "../../services/api";

// Async action for creating balance
export const createBalance = createAsyncThunk(
  "balance/create",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.balance.add,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response.message);

      // return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for getting balance
export const getUserBalance = createAsyncThunk(
  "balance/get",
  async (params, thunkAPI) => {
    try {
      const { errorCallback = () => {}, payload } = params;
      const options = {
        method: "POST",
        endpoint: PATH.balance.get,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating balance
export const deductBalance = createAsyncThunk(
  "balance/deduct",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.balance.deduct,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response.message);

      // return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
