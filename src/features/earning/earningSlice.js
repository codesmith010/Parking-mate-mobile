import { createSlice } from "@reduxjs/toolkit";
import { getUserEarning } from "./earningActions";
import { act } from "react";

const initialState = {
  EarningData: {},
  onboarding: false,
  accountID: "",
  isLoading: false,
  error: null,
};

const earningSlice = createSlice({
  name: "earningSlice",
  initialState,
  reducers: {
    // Define reducers and actions for this slice as needed
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAccountID: (state, action) => {
      state.accountID = action.payload.accountID;
      state.onboarding = action.payload.onboarding;
    },
    setOnboarding: (state, action) => {
      state.onboarding = action.payload;
    },
    resetEarning: (state, action) => {
      // Return the new state with initial values
      return initialState;
    },

    // Add more reducers for other fields as needed
    // Add reducers for isLoading and error as well
  },
  extraReducers: (builder) => {
    builder.addCase(getUserEarning.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserEarning.fulfilled, (state, action) => {
      state.isLoading = false;
      state.EarningData = action.payload;
    });
    builder.addCase(getUserEarning.rejected, (state, action) => {
      state.isLoading = false;
      state.EarningData = {};
    });
  },
});

export const { setLoading, setAccountID, setOnboarding, resetEarning } =
  earningSlice.actions;
export default earningSlice.reducer;

// Repeat the above code structure for earningSlice
