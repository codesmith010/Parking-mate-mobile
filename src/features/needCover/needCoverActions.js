import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for creating needCoverData
export const createNeedCover = createAsyncThunk(
  "needCover/create",
  async (needCoverData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/needCover/create`, // Replace with your actual API endpoint
        needCoverData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for creating canCoverData
export const fetchNeedCover = createAsyncThunk(
  "needCover/fetch",
  async (needCoverData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/needCover/fetch`, // Replace with your actual API endpoint
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
  "needCover/fetch/specific",
  async (userID, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/needCover/fetch/specific`, // Replace with your actual API endpoint
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
  "needCover/delete/specific",
  async (classData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create needCoverData
      const response = await axios.post(
        `${BASE_URL}/user/instructor/needCover/delete/specific`, // Replace with your actual API endpoint
        classData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
