import { createSlice } from "@reduxjs/toolkit";
import {
  createBooking,
  getNearbyParkingSpaces,
  getSpecificDriverParkingSpaces,
} from "./driverActions";

const initialState = {
  DriverHistory: [],
  isLoading: false,
  error: null,
  DriverData: {
    UserID: "",
    CurrentLocation: "",
    ArriveTime: "",
    LeaveTime: "",
    Price: "",
    latitude: "",
    longitude: "",
  },
  NearbyParkingSpaces: [],
  SelectedParkingSpace: {},
  // Getting data from server and storing it to here.
  DriverDataSpecific: [],
  DriverSelectedData: {},
};

const driverSlice = createSlice({
  name: "Driver",
  initialState,
  reducers: {
    // Define reducers and actions for this slice as needed
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setDriverSelectedData: (state, action) => {
      state.isLoading = true;
      state.DriverSelectedData = action.payload;
    },

    // Set a specific field in DriverData
    setDriverData: (state, action) => {
      const { fieldName, value } = action.payload;

      switch (fieldName) {
        case "UserID":
          state.DriverData.UserID = value;
          break;

        case "CurrentLocation":
          state.DriverData.CurrentLocation = value;
          break;

        case "ArriveTime":
          state.DriverData.ArriveTime = value;
          break;

        case "LeaveTime":
          state.DriverData.LeaveTime = value;
          break;

        default:
          // If fieldName is not nested, update directly
          state.DriverData = {
            ...state.DriverData,
            [fieldName]: value,
          };
          break;
      }
    },

    setSelectParkingSpace: (state, action) => {
      state.SelectedParkingSpace = action.payload;
    },
    // Reset a specific field
    resetDriverField: (state, action) => {
      const { fieldName } = action.payload;
      state[fieldName] = initialState[fieldName];
    },

    // Reset all fields
    resetDriverData: (state) => {
      state.DriverData = initialState.DriverData;
    },

    resetAllDriverData: (state) => {
      // Return the new state with initial values
      return initialState;
    },
    // Add more reducers for other fields as needed
    // Add reducers for isLoading and error as well
  },
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getNearbyParkingSpaces.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getNearbyParkingSpaces.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the state with the data returned from the API if needed
      state.NearbyParkingSpaces = action.payload;
    });
    builder.addCase(getNearbyParkingSpaces.rejected, (state, action) => {
      state.isLoading = false;
      state.NearbyParkingSpaces = [];
      state.error = action.payload;
    });

    // getting driverhost specific user parking spaces data
    builder.addCase(getSpecificDriverParkingSpaces.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getSpecificDriverParkingSpaces.fulfilled,
      (state, action) => {
        state.isLoading = false;
        // Update the state with the data returned from the API if needed
        state.DriverDataSpecific = action.payload;
      }
    );
    builder.addCase(
      getSpecificDriverParkingSpaces.rejected,
      (state, action) => {
        state.isLoading = false;
        state.DriverDataSpecific = [];
        state.error = action.payload;
      }
    );
  },
});

export const {
  setLoading,
  setDriverData,
  setSelectParkingSpace,
  resetDriverData,
  resetAllDriverData,
  resetDriverField,
  setDriverSelectedData,
} = driverSlice.actions;
export default driverSlice.reducer;

// Repeat the above code structure for driverSlice and advertiseClassSlice with their initial states and reducers.
