import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearPaymentStatus } from '../app/slices/paymentSlice';
import "../scss/layout/_payment-result.scss";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rentalDetails, setRentalDetails] = useState(null);

    useEffect(() => {
        const rental = JSON.parse(localStorage.getItem('rental') || '{}');
        setRentalDetails(rental);
    }, []);

    const handleCancelPayment = () => {
        localStorage.removeItem('rental');
        navigate('/mainPage');
    }

    return (
        <div className="payment-result success">
            <div className="result-container">
                <h1 className='success'>Payment Successful!</h1>
                <p>Your booking has been confirmed.</p>
                
                <div className="booking-summary">
                    <h2>Booking Details</h2>
                    <div className="summary-item">
                        <span>Vehicle:</span>
                        <span>
                            {rentalDetails?.selectedCar?.car.brand} {rentalDetails?.selectedCar?.car.model}
                        </span>
                    </div>
                    <div className="summary-item">
                        <span>Pick-up Date:</span>
                        <span>
                            {rentalDetails?.rentalDate?.from && 
                             new Date(rentalDetails.rentalDate.from).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="summary-item">
                        <span>Return Date:</span>
                        <span>
                            {rentalDetails?.rentalDate?.to && 
                             new Date(rentalDetails.rentalDate.to).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={() => handleCancelPayment()} className="primary-button">
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