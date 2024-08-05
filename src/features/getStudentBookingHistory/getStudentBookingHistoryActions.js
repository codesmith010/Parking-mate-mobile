import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for fetching classes
export const fetchStudentBookings = createAsyncThunk(
  "book/history",
  async (userId, thunkAPI) => {
    try {
      // Make an API call to create advertiseClassData
      const response = await axios.get(
        `${BASE_URL}/user/student/book/${userId}/history` // Replace with your actual API endpoint
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Async action for fetching classes
export const removeStudentBookingSpecific = createAsyncThunk(
  "book/remove",
  async (studentData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: studentData.token,
        },
      };

      // Make an API call to create advertiseClassData
      const response = await axios.post(
        `${BASE_URL}/user/student/book/remove`, // Replace with your actual API endpoint
        studentData,
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
