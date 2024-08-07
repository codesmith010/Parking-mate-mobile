import { createSlice } from "@reduxjs/toolkit";
import {
  createParkingSpace,
  deleteSpecificParkingRecord,
  getSpecificDriverHostParkingSpaces,
} from "./drivingHostActions";

const initialState = {
  DriverHostHistory: [],
  isLoading: false,
  error: null,
  DrivingHostData: {
    DriverHostID: "",
    ParkingSpaceID: "",
    ParkingType: "residential",
    ParkingSituated: {
      driveway: true,
      ownedAllocatedSpace: true,
      carLot: true,
    },
    ParkingSpaces: 1,
    ParkingSpaceSize: { small: true, medium: true, large: true },
    ElectricVehicleChargingFacility: "",
    BookingType: {
      all: true,
      standard: true,
      monthly: true,
    },
    ParkingAvailability: {
      alwaysAvailable: true,
      workingWeek: true,
      custom: true,
    },
    ParkingSpaceCountry: "",
    ParkingSpaceAddress: "",
    ParkingSpaceCoordinates: [],
    EntryPermitRequired: "",
    PricingPlan: "",
    DriverHostAvailableDate: {},
    ParkingPhotos: [],
    ParkingDetails: "",
  },

  DriverHostDataSpecific: [],
  DriverHostSelectedData: {},
};

const drivingHostSlice = createSlice({
  name: "DrivingHost",
  initialState,
  reducers: {
    // Define reducers and actions for this slice as needed
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDriverHostSelectedData: (state, action) => {
      state.isLoading = true;
      state.DriverHostSelectedData = action.payload;
    },

    // Set a specific field in DrivingHostData
    setDrivingHostData: (state, action) => {
      const { fieldName, value } = action.payload;

      switch (fieldName) {
        case "DriverHostID":
          state.DrivingHostData.DriverHostID = value;
          break;

        case "ParkingSituated":
          state.DrivingHostData.ParkingSituated = {
            driveway: value === "driveway",
            ownedAllocatedSpace: value === "ownedAllocatedSpace",
            carLot: value === "carLot",
          };
          break;

        case "ParkingSpaces":
          state.DrivingHostData.ParkingSpaces = value;
          break;

        case "ParkingSpaceSize":
          state.DrivingHostData.ParkingSpaceSize = {
            small: value === "small",
            medium: value === "medium",
            large: value === "large",
          };
          break;

        case "ElectricVehicleChargingFacility":
          state.DrivingHostData.ElectricVehicleChargingFacility = value;
          break;

        case "BookingType":
          state.DrivingHostData.BookingType = {
            all: value === "all",
            standard: value === "standard",
            monthly: value === "monthly",
          };
          break;
        case "ParkingAvailability":
          state.DrivingHostData.ParkingAvailability = {
            alwaysAvailable: value === "alwaysAvailable",
            workingWeek: value === "workingWeek",
            custom: value === "custom",
          };
          break;

        case "ParkingSpaceCountry":
          state.DrivingHostData.ParkingSpaceCountry = value;
          break;

        case "ParkingSpaceAddress":
          state.DrivingHostData.ParkingSpaceAddress = value;
          break;

        case "ParkingSpaceCoordinates":
          state.DrivingHostData.ParkingSpaceCoordinates = value;
          break;

        case "EntryPermitRequired":
          state.DrivingHostData.EntryPermitRequired = value;
          break;
        case "PricingPlan":
          state.DrivingHostData.PricingPlan = value;
          break;

        case "DriverHostAvailableDate":
          state.DrivingHostData.DriverHostAvailableDate = value;
          break;
        case "ParkingPhotos":
          if (state.DrivingHostData.ParkingPhotos.length <= 4) {
            state.DrivingHostData.ParkingPhotos = value;
            state.isLoading = false;
          }
          break;

        default:
          // If fieldName is not nested, update directly
          state.DrivingHostData = {
            ...state.DrivingHostData,
            [fieldName]: value,
          };
          break;
      }
    },
    // Reset a specific field
    resetField: (state, action) => {
      const { fieldName } = action.payload;
      state.DrivingHostData[fieldName] =
        initialState.DrivingHostData[fieldName];
    },

    // Reset all fields
    resetDrivingHostData: (state) => {
      state.DrivingHostData = initialState.DrivingHostData;
    },
    // Reset all fields
    resetAllDrivingHostData: (state) => {
      // Return the new state with initial values
      return initialState;
    },

    // Reducer for resetting all fields to their initial state
    // resetFields: (state) => {
    //   for (const key in state) {
    //     state[key] = initialState[key];
    //   }
    // },

    // Add more reducers for other fields as needed
    // Add reducers for isLoading and error as well
  },
  extraReducers: (builder) => {
    builder.addCase(createParkingSpace.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createParkingSpace.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createParkingSpace.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.payload;
    });

    // getting driverhost specific user parking spaces data
    builder.addCase(getSpecificDriverHostParkingSpaces.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getSpecificDriverHostParkingSpaces.fulfilled,
      (state, action) => {
        state.isLoading = false;
        // Update the state with the data returned from the API if needed
        state.DriverHostDataSpecific = action.payload;
      }
    );
    builder.addCase(
      getSpecificDriverHostParkingSpaces.rejected,
      (state, action) => {
        state.isLoading = false;
        state.DriverHostDataSpecific = [];
        state.error = action.payload;
      }
    );

    builder.addCase(deleteSpecificParkingRecord.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteSpecificParkingRecord.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteSpecificParkingRecord.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.payload;
    });
  },
});

export const {
  setLoading,
  setDriverHostSelectedData,
  setDrivingHostData,
  resetDrivingHostData,
  resetAllDrivingHostData,
  setDriverHostAvailableDate,
} = drivingHostSlice.actions;
export default drivingHostSlice.reducer;

// Repeat the above code structure for drivingHostSlice and advertiseClassSlice with their initial states and reducers.
