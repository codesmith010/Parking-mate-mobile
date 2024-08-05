import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for fetching classes
export const fetchBannerAds = createAsyncThunk(
  "bannerAds/fetch",
  async (userToken, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.get(
        `${BASE_URL}/banners/get`, // Replace with your actual API endpoint
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
