import { createSlice } from "@reduxjs/toolkit";
import { fetchBannerAds } from "./bannerAdsActions";

const initialState = {
  BannerAdsData: [],
  bannerIsLoading: false,
  bannerError: null,
};

const bannerAdsSlice = createSlice({
  name: "BannerAds",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchBannerAds.pending, (state) => {
      state.bannerIsLoading = true;
      state.bannerError = null;
    });
    builder.addCase(fetchBannerAds.fulfilled, (state, action) => {
      state.bannerIsLoading = false;
      state.BannerAdsData = action.payload;
    });
    builder.addCase(fetchBannerAds.rejected, (state, action) => {
      state.bannerIsLoading = false;
      state.bannerError = action.payload;
    });
  },
});

// export const { setClassName, setSelectClassType } = bannerAdsSlice.actions;
export default bannerAdsSlice.reducer;
