import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for creating advertiseClass
export const createAdvertiseClass = createAsyncThunk(
  "advertiseClass/create",
  async (advertiseClassData, thunkAPI) => {
    console.log("advertiseClassData: ", advertiseClassData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/advertiseClass/create`, // Replace with your actual API endpoint
        advertiseClassData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating advertiseClass
export const fetchAdvertiseClasses = createAsyncThunk(
  "advertiseClass/fetch",
  async (userID, thunkAPI) => {
    try {
      console.log("workinngg");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/advertiseClass/fetch`, // Replace with your actual API endpoint
        { userID: userID },
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Async action for creating advertiseClass
export const fetchAllAdvertiseClasses = createAsyncThunk(
  "advertiseClass/fetch/all",
  async (userID, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/advertiseClass/fetch/all`, // Replace with your actual API endpoint
        { userID: userID },
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating advertiseClass
export const fetchSpecificAdvertiseClasses = createAsyncThunk(
  "advertiseClass/fetch/specific",
  async (searchData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/advertiseClass/fetch/specific`, // Replace with your actual API endpoint
        searchData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Async action for creating advertiseClass
export const deleteSpecificAdvertiseClass = createAsyncThunk(
  "advertiseClass/delete/specific",
  async (classData, thunkAPI) => {
    console.log("classData: ", classData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/advertiseClass/delete/specific`, // Replace with your actual API endpoint
        classData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
