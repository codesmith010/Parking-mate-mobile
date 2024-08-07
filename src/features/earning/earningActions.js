import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATH } from "../../constants/endpoints";
import { API } from "../../services/api";

// Async action for getting earning
export const getUserEarning = createAsyncThunk(
  "earning/get",
  async (params, thunkAPI) => {
    try {
      const { errorCallback = () => {}, payload } = params;
      const options = {
        method: "POST",
        endpoint: PATH.earning.get,
        isToken: true,
        payload: payload,
      };

      const [ok, response] = await API(options);
      if (!ok || !response) return errorCallback(response.error);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
