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
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import { setPaymentInitiated } from '../../app/slices/paymentSlice';

function BookingModal({ onConfirm }) {
    const dispatch = useDispatch();
    const isVisible = useSelector(state => {
        console.log('BookingModal: Current state in modal:', state.modal.isBookingModalV);
        return state.modal.isBookingModalV;
    });
    const bookingDetails = useSelector(state => state.booking);

    const [userDetails, setUserDetails] = React.useState({
        name: '',
        email: '',
        phone_number: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        setUserDetails({
            name: user.username || 'Not available',
            email: user.email || 'Not available',
            phone_number: user.phone_number || 'Not available'
        });
    }, []);

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

    // Format the dates for display
    const formatDate = (date) => {
        if (!date) return 'Not available';
        return new Date(date).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateTotalPrice = () => {
        if (bookingDetails.selectedCar?.car && bookingDetails.rentalDate.from && bookingDetails.rentalDate.to) {
            const days = differenceInDays(new Date(bookingDetails.rentalDate.to), new Date(bookingDetails.rentalDate.from)) + 1;
            return bookingDetails.selectedCar.car.price * days;
        }
        return 0;
    };
    
    const handleStripeCheckout = async () => {
        try {
            dispatch(setPaymentInitiated(true));
            const totalPrice = calculateTotalPrice();
            const carName = `${bookingDetails.selectedCar?.car.brand} ${bookingDetails.selectedCar?.car.model}`;
            
            const { data } = await axios.post('http://localhost:3011/create-checkout-session', {
                amount: totalPrice,
                carName,
            });
    
            window.location.href = data.url;
        } catch (error) {
            console.error('Error redirecting to Stripe Checkout:', error);
            dispatch(clearPaymentStatus()); 
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
                        <h2>{bookingDetails.selectedCar?.car ? 
                            `${bookingDetails.selectedCar.car.brand} ${bookingDetails.selectedCar.car.model}` 
                            : 'Car not selected'}
                        </h2>
                    </div>
                    <img 
                        src={bookingDetails.selectedCar?.car ? 
                            `http://localhost:3011/${bookingDetails.selectedCar.car.image}` 
                            : carImage} 
                        alt={bookingDetails.selectedCar?.car ? 
                            `${bookingDetails.selectedCar.car.brand} ${bookingDetails.selectedCar.car.model}` 
                            : 'Car'} 
                        className="car-image" 
                    />
                </div>

                <div className="booking-details">
                    <div className="details-column">
                        <h3>Your details</h3>
                        <div className="detail-item">
                            <img src={nameIcon} alt="" />
                            <div>
                                <label>Name</label>
                                <p>{userDetails.name}</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <img src={emailIcon} alt="" />
                            <div>
                                <label>Email</label>
                                <p>{userDetails.email}</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <img src={phoneIcon} alt="" />
                            <div>
                                <label>Phone number</label>
                                <p>{userDetails.phone_number}</p>
                            </div>
                        </div>
                    </div>

                    <div className="details-column">
                        <h3>Rental info</h3>
                        <div className="detail-item booking-date">
                            <img src={dateIcon} alt="" />
                            <div>
                                <label>Booking Date</label>
                                <p className="booking-date-start">{formatDate(bookingDetails.rentalDate.from)}</p>
                                <p className="booking-date-end">{formatDate(bookingDetails.rentalDate.to)}</p>
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
                                <p>{bookingDetails.pickupLocation || 'Not available'}</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <img src={locationIcon} alt="" />
                            <div>
                                <label>Return location</label>
                                <p>{bookingDetails.returnLocation || 'Not available'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="booking-footer">
                    <div className="total-price">
                        <span>Total price:</span>
                        <span className="price">{calculateTotalPrice()}€</span>
                    </div>
                    <button
                        className="book-button"
                        onClick={handleStripeCheckout}
                    >Book with <span style={{
                        color: '#7878FD'
                    }}>Stripe</span></button>
                </div>
            </div>
        </div>
    );
}

export default BookingModal;