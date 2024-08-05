import { createSlice } from "@reduxjs/toolkit";
import {
  createAdvertiseClass,
  deleteSpecificAdvertiseClass,
  fetchAdvertiseClasses,
  fetchAllAdvertiseClasses,
  fetchSpecificAdvertiseClasses,
} from "./advertiseClassActions";

const initialState = {
  AdvertiseClass: "",
  AdvertiseClassesData: {},
  TransformAllAdvertiseClassesData: [],
  SpecificAdvertiseClassesData: {},
  isFetching: false,
  isLoading: false,
  error: null,
};

const advertiseClassSlice = createSlice({
  name: "AdvertiseClass",
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
    // create advertise class
    builder.addCase(createAdvertiseClass.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createAdvertiseClass.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.AdvertiseClass = action.payload;
    });
    builder.addCase(createAdvertiseClass.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete specific advertise class
    builder.addCase(deleteSpecificAdvertiseClass.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteSpecificAdvertiseClass.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      // state.AdvertiseClassesData = {};
    });
    builder.addCase(deleteSpecificAdvertiseClass.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAdvertiseClasses.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(fetchAdvertiseClasses.fulfilled, (state, action) => {
      state.isFetching = false;
      // Update the state with the data returned from the API if needed
      state.AdvertiseClassesData = action.payload;
    });
    builder.addCase(fetchAdvertiseClasses.rejected, (state, action) => {
      state.isFetching = false;
      state.AdvertiseClassesData = {};
      state.error = action.payload;
    });

    // All Advertise Class Data for picker
    builder.addCase(fetchAllAdvertiseClasses.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(fetchAllAdvertiseClasses.fulfilled, (state, action) => {
      state.isFetching = false;
      // Update the state with the data returned from the API if needed
      state.TransformAllAdvertiseClassesData = action.payload;
    });
    builder.addCase(fetchAllAdvertiseClasses.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });

    // Specific Advertise Ckass Data
    builder.addCase(fetchSpecificAdvertiseClasses.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchSpecificAdvertiseClasses.fulfilled,
      (state, action) => {
        state.isLoading = false;
        // Update the state with the data returned from the API if needed
        state.SpecificAdvertiseClassesData = action.payload;
      }
    );
    builder.addCase(fetchSpecificAdvertiseClasses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setClassName, setSelectClassType } = advertiseClassSlice.actions;
export default advertiseClassSlice.reducer;

// Repeat the above code structure for needCoverSlice and advertiseClassSlice with their initial states and reducers.
