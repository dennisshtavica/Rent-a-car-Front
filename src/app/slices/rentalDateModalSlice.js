import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRentalDateModalV: false,
    isPickupLocationModalV: false,
}

const rentalDateModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showRentalDateModal: (state) => {
            state.isRentalDateModalV = true;
          },
          hideRentalDateModal: (state) => {
            state.isRentalDateModalV = false;
          },
          toggleRentalDateModal: (state) => {
            state.isRentalDateModalV = !state.isRentalDateModalV;
          },
          togglePickupLocationModal: (state) => {
            state.isPickupLocationModalV = !state.isPickupLocationModalV;
          },
    },
})

export const { showRentalDateModal, hideRentalDateModal, toggleRentalDateModal, togglePickupLocationModal } = rentalDateModalSlice.actions;

export default rentalDateModalSlice.reducer;