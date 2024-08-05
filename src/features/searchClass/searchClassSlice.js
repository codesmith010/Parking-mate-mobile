import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchClass } from "./searchClassActions";

const initialState = {
  SearchClassesData: {},
  isFetching: false,
  isLoading: false,
  error: null,
};

const searchClassSlice = createSlice({
  name: "SearchClass",
  initialState,
  //   reducers: {
  //     // Define reducers and actions for this slice as needed
  //     setClassName: (state, action) => {
  //       state.ClassName = action.payload;
  //     },
  //     setSelectClassType: (state, action) => {
  //       state.SelectClassType = action.payload;
  //     },
  //     // Generate reducers dynamically for all fields in canCoverData
  //     setField: (state, action) => {
  //       const fieldName = action.payload.fieldName;
  //       state[fieldName] = action.payload.value;
  //     },

  //     // Reducer for resetting all fields to their initial state
  //     resetFields: (state) => {
  //       for (const key in state) {
  //         state[key] = initialState[key];
  //       }
  //     },

  //     // Add more reducers for other fields as needed
  //     // Add reducers for isLoading and error as well
  //   },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchClass.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(fetchSearchClass.fulfilled, (state, action) => {
      state.isFetching = false;
      // Update the state with the data returned from the API if needed
      state.SearchClassesData = action.payload;
    });
    builder.addCase(fetchSearchClass.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

// export const { setClassName, setSelectClassType } = searchClassSlice.actions;
export default searchClassSlice.reducer;

// Repeat the above code structure for needCoverSlice and advertiseClassSlice with their initial states and reducers.
