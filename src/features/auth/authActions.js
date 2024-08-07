import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@env";
import { PATH } from "../../constants/endpoints";
import { API } from "../../services/api";

// Async action for user login
export const login = createAsyncThunk(
  "user/signin",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;

      const options = {
        method: "POST",
        endpoint: PATH.auth.login,
        isToken: false,
        payload: payload,
      };
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);
      successCallback(response.message);
      return response;
    } catch (error) {
      errorCallback(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateLogin = createAsyncThunk(
  "user/updatesignin",
  async (params, thunkAPI) => {
    try {
      const options = {
        method: "GET",
        endpoint: PATH.auth.updateLogin,
        isToken: true,
      };
      const [ok, response] = await API(options);
      return response;
    } catch (error) {
      errorCallback(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async action for user signup
export const signup = createAsyncThunk(
  "user/signup",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;

      const options = {
        method: "POST",
        endpoint: PATH.auth.register,
        isToken: false,
        payload: payload,
      };
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);
      successCallback(response.message);
      return response;
    } catch (error) {
      errorCallback(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async action for delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;

      const options = {
        method: "POST",
        endpoint: PATH.auth.deleteUser,
        isToken: true,
        payload: payload,
      };
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);
      successCallback(response.message);
      return response;
    } catch (error) {
      errorCallback(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "/user/signup/emailotp/sent",
  async (userData, thunkAPI) => {
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

      return response.data;
    } catch (error) {
      // console.log("ERRORRR: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendForgetPasswordOtp = createAsyncThunk(
  "/user/forgetPassword/emailotp/sent",
  async (userData, thunkAPI) => {
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
export const uploadDriverHostImages = createAsyncThunk(
  "user/uploadDriverHostImages",
  async (imagesData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: imagesData.token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/parking-space/image/driverHost/save`,
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

// Phone verification actions
export const sentSmsOTP = createAsyncThunk(
  "user/sentSmsOTP",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;

      const options = {
        method: "POST",
        endpoint: PATH.auth.sentSmsOTP,
        isToken: true,
        payload: payload,
      };
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);
      successCallback(response);
      return response;
    } catch (error) {
      errorCallback(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const verifySmsOTP = createAsyncThunk(
  "user/verifySmsOTP",
  async (params, thunkAPI) => {
    try {
      const {
        successCallback = () => {},
        errorCallback = () => {},
        payload,
      } = params;

      const options = {
        method: "POST",
        endpoint: PATH.auth.verifySmsOTP,
        isToken: true,
        payload: payload,
      };
      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);
      successCallback(response);
      return response;
    } catch (error) {
      errorCallback(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
