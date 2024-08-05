import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for fetching classes
export const fetchSearchClass = createAsyncThunk(
  "searchClass/fetch",
  async (searchClassData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/user/student/searchClass/fetch`, // Replace with your actual API endpoint
        searchClassData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
