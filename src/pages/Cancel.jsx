import React from 'react';
import { useNavigate } from 'react-router-dom';
// import cancelIcon from '../assets/images/icons/x-circle.svg';
import "../scss/layout/_payment-result.scss";


const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-result cancel">
            <div className="result-container">
                {/* <img src={cancelIcon} alt="Cancelled" className="status-icon" /> */}
                <h1>Payment Cancelled</h1>
                <p>Your payment was cancelled. No charges were made.</p>

                <div className="action-buttons">
                    <button onClick={() => navigate(-1)} className="primary-button">
                        Try Again
                    </button>
                    <button onClick={() => navigate('/mainPage')} className="secondary-button">
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;