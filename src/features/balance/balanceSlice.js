import { createSlice } from "@reduxjs/toolkit";
import { getUserBalance } from "./balanceActions";

const initialState = {
  BalanceTotalAmount: "",
  BalanceData: [],
  isLoading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: "balanceSlice",
  initialState,
  reducers: {
    // Define reducers and actions for this slice as needed
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    resetBalance: (state, action) => {
      // Return the new state with initial values
      return initialState;
    },

    // Add more reducers for other fields as needed
    // Add reducers for isLoading and error as well
  },
  extraReducers: (builder) => {
    builder.addCase(getUserBalance.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.BalanceTotalAmount = action.payload.totalBalanceAmount;
      state.BalanceData = action.payload.balances;
    });
    builder.addCase(getUserBalance.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.payload;
    });
  },
});

export const { setLoading, resetBalance } = balanceSlice.actions;
export default balanceSlice.reducer;

// Repeat the above code structure for balanceSlice
