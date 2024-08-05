import { createSlice } from "@reduxjs/toolkit";
import {
  createInstructorPayment,
  getInstructorPaymentHistory,
} from "./instructorClassPaymentActions";

const initialState = {
  InstructorPaymentHistory: [],
  isLoading: false,
  error: null,
};

const instructorClassPaymentSlice = createSlice({
  name: "InstructorClassPayment",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(createInstructorPayment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createInstructorPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      // state.StudentPaymentHistory = action.payload;
    });
    builder.addCase(createInstructorPayment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getInstructorPaymentHistory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getInstructorPaymentHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.InstructorPaymentHistory = action.payload;
    });
    builder.addCase(getInstructorPaymentHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const { setClassName, setSelectClassType } = instructorClassPaymentSlice.actions;
export default instructorClassPaymentSlice.reducer;
