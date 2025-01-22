import React, { useEffect } from 'react';
import '../../scss/components/_bookingModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookingModal } from '../../app/slices/rentalDateModalSlice';
import backgroundImage from '../../assets/images/bookingbg.svg';
import dateIcon from '../../assets/images/icons/date.svg';
import emailIcon from '../../assets/images/icons/email.svg';
import locationIcon from '../../assets/images/icons/location.svg';
import nameIcon from '../../assets/images/icons/name.svg';
import phoneIcon from '../../assets/images/icons/phone.svg';
import carImage from '../../assets/images/troc.svg';

function BookingModal({ onConfirm }) {
    const dispatch = useDispatch();
    const isVisible = useSelector(state => {
        console.log('BookingModal: Current state in modal:', state.modal.isBookingModalV);
        return state.modal.isBookingModalV;
    });

    const handleClose = () => {
        console.log('BookingModal: Close button clicked - dispatching close action');
        dispatch(toggleBookingModal(false));
        setTimeout(() => {
            console.log('BookingModal: State after dispatch:', isVisible);
            if (onConfirm) {
                onConfirm();
            }
        }, 0);
    };

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                console.log('BookingModal: ESC key pressed - calling handleClose');
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [handleClose]);

    const handleBackgroundClick = (e) => {
        if (e.target.className === 'booking-modal') {
            console.log('Background clicked - closing modal');
            handleClose();
        }
    };

    return (
        <div className="booking-modal" onClick={handleBackgroundClick}>
            <div className="booking-modal-content" style={{ 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                <button 
                    className="close-button" 
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log('BookingModal: Close button clicked');
                        handleClose();
                    }}
                >
                    ×
                </button>
                
                <div className="booking-header" >
                    <div className="textWrapper">
                        <h1>YOU'RE BOOKING</h1>
                        <h2>VW T-Roc</h2>
                    </div>
                    <img src={carImage} alt="VW T-Roc" className="car-image" />
                </div>

                <div className="booking-details">
                    <div className="details-column">
                        <h3>Your details</h3>
                        <div className="detail-item">
                            <img src={nameIcon} alt="" />
                            <div>
                                <label>Name</label>
                                <p>Bledor Pireci</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <img src={emailIcon} alt="" />
                            <div>
                                <label>Email</label>
                                <p>bledor@g.com</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <img src={phoneIcon} alt="" />
                            <div>
                                <label>Phone number</label>
                                <p>+420696969</p>
                            </div>
                        </div>
                    </div>

                    <div className="details-column">
                        <h3>Rental info</h3>
                        <div className="detail-item booking-date">
                            <img src={dateIcon} alt="" />
                            <div>
                                <label>Booking Date</label>
                                <p className="booking-date-start">Wed, Jan 22, 12:00 AM</p>
                                <p className="booking-date-end">Thu, Jan 23, 12:00 AM</p>
                            </div>
                            <div className="date-dots">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        </div>
                        <div className="detail-item">
                            <img src={locationIcon} alt="" />
                            <div>
                                <label>Pick up location</label>
                                <p>Paris</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <img src={locationIcon} alt="" />
                            <div>
                                <label>Return location</label>
                                <p>Milano</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="booking-footer">
                    <div className="total-price">
                        <span>Total price:</span>
                        <span className="price">1200€</span>
                    </div>
                    <button className="book-button">Book with Stripe</button>
                </div>
            </div>
        </div>
    );
}

export default BookingModal;