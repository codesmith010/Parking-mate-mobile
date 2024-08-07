import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";
import { PATH } from "../../constants/endpoints";
import { API } from "../../services/api";

// Async action for creating parking space
export const createParkingSpace = createAsyncThunk(
  "parkingSpace/create",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.parkingSpace.create,
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
export const getSpecificDriverHostParkingSpaces = createAsyncThunk(
  "parkingSpace/specificDriverHostGet",
  async (params, thunkAPI) => {
    try {
      const { errorCallback = () => {}, payload } = params;
      const options = {
        method: "POST",
        endpoint: PATH.parkingSpace.getSpecificDriverHost,
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

export const deleteSpecificParkingRecord = createAsyncThunk(
  "parkingSpace/specificDriverHostRecordDelete",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.parkingSpace.delete,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      successCallback(response.message);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
