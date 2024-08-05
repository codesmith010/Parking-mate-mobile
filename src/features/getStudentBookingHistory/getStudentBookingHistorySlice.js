import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentBookings } from "./getStudentBookingHistoryActions";

const initialState = {
  BookingHistory: {},
  isFetching: false,
  isLoading: false,
  error: null,
};

const getStudentBookingHistorySlice = createSlice({
  name: "getStudentBookingHistory",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchStudentBookings.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(fetchStudentBookings.fulfilled, (state, action) => {
      state.isFetching = false;
      // Update the state with the data returned from the API if needed
      state.BookingHistory = action.payload;
    });
    builder.addCase(fetchStudentBookings.rejected, (state, action) => {
      state.BookingHistory = {};
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

export default getStudentBookingHistorySlice.reducer;
