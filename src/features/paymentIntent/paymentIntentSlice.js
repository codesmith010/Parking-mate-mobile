import { createSlice } from "@reduxjs/toolkit";
import { createPaymentIntent, getPaymentIntent } from "./paymentIntentActions";

const initialState = {
  PaymentIntent: {},
  GetPaymentIntent: [],
  isLoading: false,
  error: null,
};

const instructorPaymentSlice = createSlice({
  name: "InstructorPayment",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createPaymentIntent.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.PaymentIntent = action.payload;
    });
    builder.addCase(createPaymentIntent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get instructor payment history
    builder.addCase(getPaymentIntent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPaymentIntent.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.GetPaymentIntent = action.payload;
    });
    builder.addCase(getPaymentIntent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const { setClassName, setSelectClassType } = instructorPaymentSlice.actions;
export default instructorPaymentSlice.reducer;
