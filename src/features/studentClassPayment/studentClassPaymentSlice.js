import { createSlice } from "@reduxjs/toolkit";
import { createPayment, getPaymentHistory } from "./studentClassPaymentActions";

const initialState = {
  StudentPaymentHistory: [],
  isLoading: false,
  error: null,
};

const studentClassPaymentSlice = createSlice({
  name: "StudentClassPayment",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(createPayment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      // state.StudentPaymentHistory = action.payload;
    });
    builder.addCase(createPayment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getPaymentHistory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPaymentHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.StudentPaymentHistory = action.payload;
    });
    builder.addCase(getPaymentHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const { setClassName, setSelectClassType } = studentClassPaymentSlice.actions;
export default studentClassPaymentSlice.reducer;
