import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for creating canCoverData
export const createCanCover = createAsyncThunk(
  "canCover/create",
  async (canCoverData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create canCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/canCover/create`, // Replace with your actual API endpoint
        canCoverData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Async action for creating canCoverData
export const fetchCanCover = createAsyncThunk(
  "canCover/fetch",
  async (canCoverData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create canCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/canCover/fetch`, // Replace with your actual API endpoint
        canCoverData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating canCoverData
export const fetchCanCoverSpecific = createAsyncThunk(
  "canCover/fetch/specific",
  async (userID, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/canCover/fetch/specific`, // Replace with your actual API endpoint
        { userID: userID },
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for delete canCover
export const deleteCanCoverSpecific = createAsyncThunk(
  "canCover/delete/specific",
  async (classData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create canCover
      const response = await axios.post(
        `${BASE_URL}/user/instructor/canCover/delete/specific`, // Replace with your actual API endpoint
        classData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
