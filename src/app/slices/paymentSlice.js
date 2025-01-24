import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initiated: localStorage.getItem('paymentInitiated') === 'true'
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentInitiated: (state, action) => {
      state.initiated = action.payload;
      localStorage.setItem('paymentInitiated', action.payload);
    },
    clearPaymentStatus: (state) => {
      state.initiated = false;
      localStorage.removeItem('paymentInitiated');
    }
  }
});

export const { setPaymentInitiated, clearPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;