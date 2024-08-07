import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";
import { PATH } from "../../constants/endpoints";
import { API } from "../../services/api";

export const createBooking = createAsyncThunk(
  "parkingSpace/createBooking",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;
      const options = {
        method: "POST",
        endpoint: PATH.parkingSpace.createBooking,
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

export const getSpecificDriverParkingSpaces = createAsyncThunk(
  "parkingSpace/specificDriverGet",
  async (params, thunkAPI) => {
    try {
      const { errorCallback = () => {}, payload } = params;
      const options = {
        method: "POST",
        endpoint: PATH.parkingSpace.getSpecificDriver,
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

export const fetchNeedCover = createAsyncThunk(
  "parkingSpace/fetch",
  async (needCoverData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/parkingSpace/fetch`, // Replace with your actual API endpoint
        needCoverData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating needCoverData
export const fetchNeedCoverSpecific = createAsyncThunk(
  "parkingSpace/fetch/specific",
  async (userID, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/parkingSpace/fetch/specific`, // Replace with your actual API endpoint
        { userID: userID },
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Async action for delete needCoverData
export const deleteNeedCoverSpecific = createAsyncThunk(
  "parkingSpace/delete/specific",
  async (classData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/parkingSpace/delete/specific`, // Replace with your actual API endpoint
        classData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating parking space
export const getNearbyParkingSpaces = createAsyncThunk(
  "parkingSpace/getNearbyParkingSpaces",
  async (params, thunkAPI) => {
    try {
      const { errorCallback = () => {}, payload } = params;

      const options = {
        method: "POST",
        endpoint: PATH.parkingSpace.getNearbyParkingSpaces,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(error);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
