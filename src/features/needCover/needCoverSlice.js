// canCoverSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createNeedCover,
  fetchNeedCover,
  fetchNeedCoverSpecific,
} from "./needCoverActions";

const initialState = {
  NeedCovers: "",
  isLoading: false,
  error: null,
  NeedCoverData: {},
  NeedCoverDataSpecific: [],
};

const needCoverSlice = createSlice({
  name: "NeedCovers",
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
    builder.addCase(createNeedCover.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createNeedCover.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.NeedCovers = action.payload;
    });
    builder.addCase(createNeedCover.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchNeedCover.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchNeedCover.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.NeedCoverData = action.payload;
    });
    builder.addCase(fetchNeedCover.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchNeedCoverSpecific.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchNeedCoverSpecific.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.NeedCoverDataSpecific = action.payload;
    });
    builder.addCase(fetchNeedCoverSpecific.rejected, (state, action) => {
      state.isLoading = false;
      state.NeedCoverDataSpecific = [];
      state.error = action.payload;
    });
  },
});

export const { setClassName, setSelectClassType } = needCoverSlice.actions;
export default needCoverSlice.reducer;

// Repeat the above code structure for needCoverSlice and advertiseClassSlice with their initial states and reducers.
