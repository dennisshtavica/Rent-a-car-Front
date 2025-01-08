import { configureStore } from "@reduxjs/toolkit";
import rentalDateModalSlice from "./slices/rentalDateModalSlice";
import bookingSlice from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    modal: rentalDateModalSlice,
    booking: bookingSlice
  },
});
