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
            const rental = JSON.parse(localStorage.getItem('rental') || '{}');
            rental.rentalDate = action.payload;
            localStorage.setItem('rental', JSON.stringify(rental));
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
            const rental = JSON.parse(localStorage.getItem('rental') || '{}');
            rental.selectedCar = action.payload;
            localStorage.setItem('rental', JSON.stringify(rental));
        },
    },
})

export const { setRentalDate, setPickupLocation, setReturnLocation, setCardId, setSelectedCar } = bookingSlice.actions;

export default bookingSlice.reducer;