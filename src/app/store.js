import { configureStore } from "@reduxjs/toolkit";
import rentalDateModalSlice from "./slices/rentalDateModalSlice";
import bookingSlice from "./slices/bookingSlice";
import paymentSlice from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    modal: rentalDateModalSlice,
    booking: bookingSlice,
    payment: paymentSlice,
  },
});
