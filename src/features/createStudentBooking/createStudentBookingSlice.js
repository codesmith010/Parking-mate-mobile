import { createSlice } from "@reduxjs/toolkit";
import { createBooking } from "./createStudentBookingActions";

const initialState = {
  AddBooking: "",
  isLoading: false,
  error: null,
};

const createStudentBookingSlice = createSlice({
  name: "CreateBookingClass",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.AddBooking = action.payload;
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const { setClassName, setSelectClassType } = createStudentBookingSlice.actions;
export default createStudentBookingSlice.reducer;
