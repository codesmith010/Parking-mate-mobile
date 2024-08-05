// canCoverSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCanCover,
  fetchCanCover,
  fetchCanCoverSpecific,
} from "./canCoverActions";

const initialState = {
  CanCovers: "",
  isLoading: false,
  error: null,
  CanCoverData: {},
  CanCoverDataSpecific: [],
};

const canCoverSlice = createSlice({
  name: "CanCovers",
  initialState,
  reducers: {
    // Define reducers and actions for this slice as needed
    setClassName: (state, action) => {
      state.ClassName = action.payload;
    },
    setSelectClassType: (state, action) => {
      state.SelectClassType = action.payload;
    },
    // Generate reducers dynamically for all fields in canCoverData
    setField: (state, action) => {
      const fieldName = action.payload.fieldName;
      state[fieldName] = action.payload.value;
    },

    // Reducer for resetting all fields to their initial state
    resetFields: (state) => {
      for (const key in state) {
        state[key] = initialState[key];
      }
    },

    // Add more reducers for other fields as needed
    // Add reducers for isLoading and error as well
  },
  extraReducers: (builder) => {
    builder.addCase(createCanCover.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCanCover.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.CanCovers = action.payload;
    });
    builder.addCase(createCanCover.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCanCover.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCanCover.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.CanCoverData = action.payload;
    });
    builder.addCase(fetchCanCover.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCanCoverSpecific.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCanCoverSpecific.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.CanCoverDataSpecific = action.payload;
    });
    builder.addCase(fetchCanCoverSpecific.rejected, (state, action) => {
      state.isLoading = false;
      state.CanCoverDataSpecific = [];
      state.error = action.payload;
    });
  },
});

export const { setClassName, setSelectClassType } = canCoverSlice.actions;
export default canCoverSlice.reducer;

// Repeat the above code structure for needCoverSlice and advertiseClassSlice with their initial states and reducers.
