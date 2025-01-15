import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRentalDateModalV: false,
    isPickupLocationModalV: false,
    isReturnLocationModalV: false,
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
    },
})

export const { showRentalDateModal, hideRentalDateModal, toggleRentalDateModal, togglePickupLocationModal, toggleReturnLocationModal } = rentalDateModalSlice.actions;

export default rentalDateModalSlice.reducer;