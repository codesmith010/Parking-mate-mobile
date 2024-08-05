import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  sendOtp,
  signup,
  updateLogin,
  verifyOtp,
  updatePassword,
  fetchInstructorImages,
  fetchProfilePicture,
  sendForgetPasswordOtp,
  verifyForgetPasswordOtp,
} from "./authActions";

const initialState = {
  authenticated: false,
  signupStatus: null,
  user: null,
  instructorImages: [],
  profilePicture: null,
  passwordChanged: null,
  otpCode: null,
  otpStatus: null,
  otpSentStatus: null,
  forgetPasswordOtpCode: null,
  logoutUser: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSignupStatus: (state, action) => {
      state.signupStatus = null;
    },
    updateAuthentication: (state, action) => {
      state.authenticated = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateOtpStatus: (state, action) => {
      state.otpStatus = null;
      state.otpCode = null;
    },
    updateForgetOtpStatus: (state, action) => {
      state.forgetPasswordOtpCode = null;
    },
    logoutUser: (state, action) => {
      state.authenticated = false;
      state.user = null;
      state.signupStatus = null;
      state.instructorImages = [];
      state.profilePicture = null;
      state.passwordChanged = null;
      state.logoutUser = true;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login reducers
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update Login
    builder.addCase(updateLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(updateLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Signup reducers
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.signupStatus = "success";
      state.otpSentStatus = "pending";
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.signupStatus = "error";
    });
    // Email OTP reducers
    builder.addCase(sendOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.otpCode = action.payload;
      state.otpSentStatus = "sent";
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
    // Verify Email OTP reducers
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.otpCode = null;
      state.otpStatus = action.payload;
      state.error = null;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
    // Verify Email OTP reducers
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.passwordChanged = "success";
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchInstructorImages.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchInstructorImages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.instructorImages = action.payload;
    });
    builder.addCase(fetchInstructorImages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchProfilePicture.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProfilePicture.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.profilePicture = action.payload;
    });
    builder.addCase(fetchProfilePicture.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(sendForgetPasswordOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendForgetPasswordOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.forgetPasswordOtpCode = action.payload.otp;
    });
    builder.addCase(sendForgetPasswordOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.forgetPasswordOtpCode = null;
    });
  },
});

// Reducer actions
export const {
  updateOtpStatus,
  updateForgetOtpStatus,
  updateSignupStatus,
  updateAuthentication,
  updateUser,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
