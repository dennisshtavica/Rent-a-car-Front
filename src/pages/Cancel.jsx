import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import cancelIcon from '../assets/images/icons/x-circle.svg';
import "../scss/layout/_payment-result.scss";
import { useDispatch, useSelector } from 'react-redux';
import { clearPaymentStatus } from '../app/slices/paymentSlice';


const PaymentCancel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCancelPayment = () => {
        dispatch(clearPaymentStatus());
        navigate('/mainPage');
    }

    return (
        <div className="payment-result cancel">
            <div className="result-container">
                {/* <img src={cancelIcon} alt="Cancelled" className="status-icon" /> */}
                <h1 className='canceled'>Payment Cancelled</h1>
                <p>Your payment was cancelled. No charges were made.</p>

                <div className="action-buttons">
                    <button onClick={() => navigate(-1)} className="primary-button">
                        Try Again
                    </button>
                    <button onClick={() => handleCancelPayment()} className="secondary-button">
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;