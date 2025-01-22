import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRentalDateModalV: false,
    isPickupLocationModalV: false,
    isReturnLocationModalV: false,
    isBookingModalV: false,
}

const rentalDateModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
          toggleRentalDateModal: (state) => {
            state.isRentalDateModalV = !state.isRentalDateModalV;
          },
          togglePickupLocationModal: (state) => {
            state.isPickupLocationModalV = !state.isPickupLocationModalV;
          },
          toggleReturnLocationModal: (state) => {
            state.isReturnLocationModalV = !state.isReturnLocationModalV;
          },
          toggleBookingModal: (state, action) => {
            console.log('Reducer: toggling modal with payload:', action.payload);
            if (action.payload !== undefined) {
                state.isBookingModalV = action.payload;
            } else {
                state.isBookingModalV = !state.isBookingModalV;
            }
            console.log('Reducer: new state:', state.isBookingModalV);
          },
    },
})

export const { showRentalDateModal, hideRentalDateModal, toggleRentalDateModal, togglePickupLocationModal, toggleReturnLocationModal, toggleBookingModal } = rentalDateModalSlice.actions;

export default rentalDateModalSlice.reducer;