export const PATH = {
  auth: {
    register: "user/signup",
    login: "user/signin",
    updateLogin: "user/updatesignin",
    loginTwitter: "success",
    sendForgotPasswordOTP: "user/forgot-password/otp",
    verifyForgotPasswordOTP: "user/forgot-password/otp/verify",
    resetPassword: "user/reset-password",
    deleteUser: "user/delete",
    verifyEmail: "auth/verify-email",
    resetPasswordByVerfToken: "auth/reset-password/",
    sentSmsOTP: "sms/otp/sent",
    verifySmsOTP: "sms/otp/verify",
    logout: "auth/logout",
  },
  parkingSpace: {
    // driverHost
    create: "parking-space/create",
    getSpecificDriverHost: "parking-space/driverHost/get",
    delete: "parking-space/driverHost/delete",
    // -------

    // driver
    createBooking: "parking-space/booking/create",
    getNearbyParkingSpaces: "parking-space/nearby",
    getSpecificDriver: "parking-space/booking/get",
  },
  balance: {
    add: "balance/add",
    get: "balance/get",
    deduct: "balance/deduct",
  },
  earning: {
    // add: "earning/add",
    get: "earning/get",
    // deduct: "earning/deduct",
  },

  payment: {
    create: "payment/payment-intent/create",
    get: "payment/payment-intent/get",
    createWithdraw: "payment/withdraw/payment-intent/create",
    updateWithdraw: "payment/withdraw/payment-intent/update",
    onboarding: "payment/onboarding/status",
    createPaymentTransfer: "payment/withdraw/payment-intent/transfer",
  },
};
