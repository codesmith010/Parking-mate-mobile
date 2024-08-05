import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";

// Async action for user login
export const login = createAsyncThunk(
  "user/signin",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("userdata: ", userData);

      const response = await axios.post(
        `${BASE_URL}/user/signin`,
        userData,
        config
      ); // Replace with your actual login API function
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateLogin = createAsyncThunk(
  "user/updatesignin",
  async (token, thunkAPI) => {
    try {
      console.log("MYYYYYYYtoken: ", token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const response = await axios.get(`${BASE_URL}/user/updatesignin`, config); // Replace with your actual login API function
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for user signup
export const signup = createAsyncThunk(
  "user/signup",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${BASE_URL}/user/signup`,
        userData,
        config
      ); // Replace with your actual signup API function

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const sendOtp = createAsyncThunk(
  "/user/signup/emailotp/sent",
  async (userData, thunkAPI) => {
    console.log("userData: ", userData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/signup/emailotp/sent`,
        userData,
        config
      ); // Replace with your actual signup API function

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "/user/signup/emailotp/verify",
  async (userData, thunkAPI) => {
    console.log("userData: ", userData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/signup/emailotp/verify`,
        userData,
        config
      ); // Replace with your actual signup API function

      console.log("ERRORRR: ", response.data);

      return response.data;
    } catch (error) {
      console.log("ERRORRR: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendForgetPasswordOtp = createAsyncThunk(
  "/user/forgetPassword/emailotp/sent",
  async (userData, thunkAPI) => {
    console.log("userData: ", userData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/forgetPassword/emailotp/sent`,
        userData,
        config
      ); // Replace with your actual signup API function

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const verifyForgetPasswordOtp = createAsyncThunk(
  "/user/forgetPassword/emailotp/verify",
  async (userData, thunkAPI) => {
    console.log("userData: ", userData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/forgetPassword/emailotp/verify`,
        userData,
        config
      ); // Replace with your actual signup API function

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateResetPassword = createAsyncThunk(
  "/user/resetPassword/update",
  async (userData, thunkAPI) => {
    console.log("userData: ", userData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/resetPassword/update`,
        userData,
        config
      ); // Replace with your actual signup API function

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (changePass, thunkAPI) => {
    try {
      console.log("MYYYYYYYtoken: ", changePass);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: changePass.token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/updatePassword`,
        changePass,
        config
      ); // Replace with your actual login API function
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const uploadInstructorImages = createAsyncThunk(
  "user/uploadInstructorImages",
  async (imagesData, thunkAPI) => {
    try {
      console.log("MYYYYYYYtoken: ", imagesData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: imagesData.token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/image/instructorClass/save`,
        imagesData,
        config
      ); // Replace with your actual login API function
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchInstructorImages = createAsyncThunk(
  "user/fetchInstructorImages",
  async (userID, thunkAPI) => {
    try {
      console.log("MYYYYYYYtoken: ", userID);
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: userID.token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/image/instructorClass/fetch`,
        userID,
        config
      ); // Replace with your actual login API function
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (imagesData, thunkAPI) => {
    try {
      console.log("MYYYYYYYtoken: ", imagesData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: imagesData.token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/image/profile/save`,
        imagesData,
        config
      ); // Replace with your actual login API function
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchProfilePicture = createAsyncThunk(
  "user/fetchProfilePicture",
  async (userID, thunkAPI) => {
    try {
      console.log("MYYYYYYYtoken: ", userID);
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: userID.token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/user/image/profile/fetch`,
        userID,
        config
      ); // Replace with your actual login API function
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
