import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/sections/_carRented.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CarRented() {
    const [bookedCars, setBookedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const fetchBookedCars = async () => {
        try {
            const userStr = localStorage.getItem('user');
            const user = JSON.parse(userStr || '{}');
            const token = user.token;

            if (!user || !token) {
                throw new Error('Authentication data missing');
            }

            const response = await axios.get(
                `http://localhost:3011/carsRented/${user.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (Array.isArray(response.data)) {
                setBookedCars(response.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setError(error.response?.data?.message || error.message || 'Failed to load booked cars');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookedCars();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        try {
            const userStr = localStorage.getItem('user');
            const user = JSON.parse(userStr || '{}');
            const token = user.token;

            if (!token) {
                throw new Error('Authentication token missing');
            }

            // Show confirmation dialog
            if (!window.confirm('Are you sure you want to cancel this booking?')) {
                return;
            }

            // Updated URL to match your backend endpoint
            const response = await axios.delete(
                `http://localhost:3011/cancelBooking/${user.id}/${bookingId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

          

            // Refresh the bookings list
            await fetchBookedCars();

            // Show success message
            alert('Booking cancelled successfully');

        } catch (error) {
            console.error('Error cancelling booking:', error);
            alert(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <>
            <div className="mainPage container">
                <Header isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} closeMenu={() => setIsOpen(false)} />
            </div>

            <div className="booked-cars-container">
                <h1>My Booked Cars</h1>
                {bookedCars.length === 0 ? (
                    <div className="no-bookings">
                        <p>You haven't made any bookings yet.</p>
                    </div>
                ) : (
                    <div className="booked-cars-grid">
                        {bookedCars.map((booking) => (
                            <div key={booking.bookingId} className="booked-car-card">
                                <div className="car-image">
                                    <img 
                                        src={`http://localhost:3011/${booking.car.image}`} 
                                        alt={`${booking.car.brand} ${booking.car.model}`} 
                                    />
                                </div>
                                <div className="car-details">
                                    <h2>{booking.car.brand} {booking.car.model}</h2>
                                    <div className="booking-info">
                                        <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
                                        <p><strong>Return Location:</strong> {booking.returnLocation}</p>
                                        <p><strong>Dates:</strong> {booking.formattedDates}</p>
                                        <p><strong>Status:</strong> 
                                            <span className={`status ${booking.status.toLowerCase()}`}>
                                                {booking.status}
                                            </span>
                                        </p>
                                    </div>
                                    {booking.status === 'Pending' && (
                                        <button 
                                            className="cancel-button"
                                            onClick={() => handleCancelBooking(booking.bookingId)}
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default CarRented;
