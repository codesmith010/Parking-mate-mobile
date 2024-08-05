import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "../features/auth/authSlice";
import canCoverReducer from "../features/canCover/canCoverSlice";
import needCoverReducer from "../features/needCover/needCoverSlice";
import advertiseClassReducer from "../features/advertiseClass/advertiseClassSlice";
import searchClassReducer from "../features/searchClass/searchClassSlice";
import createStudentBookingReducer from "../features/createStudentBooking/createStudentBookingSlice";
import getStudentBookingReducer from "../features/getStudentBookingHistory/getStudentBookingHistorySlice";
import bannerAdsReducer from "../features/bannerAds/bannerAdsSlice";
import paymentIntentReducer from "../features/paymentIntent/paymentIntentSlice";
import studentClassPaymentReducer from "../features/studentClassPayment/studentClassPaymentSlice";
import instructorClassPaymentReducer from "../features/instructorClassPayment/instructorClassPaymentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    CanCovers: canCoverReducer,
    NeedCovers: needCoverReducer,
    AdvertiseClass: advertiseClassReducer,
    SearchClass: searchClassReducer,
    CreateStudentBook: createStudentBookingReducer,
    GetStudentBookingHistory: getStudentBookingReducer,
    BannerAds: bannerAdsReducer,
    PaymentIntent: paymentIntentReducer,
    StudentClassPayment: studentClassPaymentReducer,
    InstructorClassPayment: instructorClassPaymentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
