import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../scss/layout/_payment-result.scss";
// import checkIcon from '../assets/images/icons/check-circle.svg';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const bookingDetails = useSelector((state) => state.booking);

    return (
        <div className="payment-result success">
            <div className="result-container">
                {/* <img src={checkIcon} alt="Success" className="status-icon" /> */}
                <h1>Payment Successful!</h1>
                <p>Your booking has been confirmed.</p>
                
                <div className="booking-summary">
                    <h2>Booking Details</h2>
                    <div className="summary-item">
                        <span>Vehicle:</span>
                        <span>{bookingDetails.selectedCar?.car.brand} {bookingDetails.selectedCar?.car.model}</span>
                    </div>
                    <div className="summary-item">
                        <span>Pick-up Date:</span>
                        <span>{new Date(bookingDetails.rentalDate.from).toLocaleDateString()}</span>
                    </div>
                    <div className="summary-item">
                        <span>Return Date:</span>
                        <span>{new Date(bookingDetails.rentalDate.to).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={() => navigate('/mainPage')} className="primary-button">
                        Return to Home
                    </button>
                    <button onClick={() => navigate('/profile')} className="secondary-button">
                        View My Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;