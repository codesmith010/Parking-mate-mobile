import { configureStore } from "@reduxjs/toolkit";
import { useSelector as useAppSelector } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "../features/auth/authSlice";
import balanceSliceReducer from "../features/balance/balanceSlice";
import driverSliceReducer from "../features/driver/driverSlice";
import drivingHostSliceReducer from "../features/drivingHost/drivingHostSlice";
import earningSliceReducer from "../features/earning/earningSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    DrivingHost: drivingHostSliceReducer,
    Driver: driverSliceReducer,
    Balance: balanceSliceReducer,
    Earning: earningSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const { dispatch } = store;
export const useSelector = useAppSelector;
export default store;
