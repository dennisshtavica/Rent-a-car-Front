import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRentalDateModalV: false,
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
    },
})

export const { showRentalDateModal, hideRentalDateModal, toggleRentalDateModal } = rentalDateModalSlice.actions;

export default rentalDateModalSlice.reducer;