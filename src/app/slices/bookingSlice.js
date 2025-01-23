import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rentalDate: { from: null, to: null },
    pickupLocation: null,
    returnLocation: null,
    cardId: null,
    selectedCar: null
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setRentalDate: (state, action) => {
            state.rentalDate = action.payload;
        },
        setPickupLocation: (state, action) => {
            state.pickupLocation = action.payload;
        },
        setReturnLocation: (state, action) => {
            state.returnLocation = action.payload;
        },
        setCardId: (state, action) => {
            state.cardId = action.payload;
        },
        setSelectedCar: (state, action) => {
            state.selectedCar = action.payload;
        },
    },
})

export const { setRentalDate, setPickupLocation, setReturnLocation, setCardId, setSelectedCar } = bookingSlice.actions;

export default bookingSlice.reducer;