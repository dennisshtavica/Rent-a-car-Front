import React from 'react';
import Header from "../components/Header";
import CarPhotos from "../assets/images/car.png";
import "../scss/sections/_bookingPage.scss";

export default function BookingPage() {
    return (
        <div className="booking container">
            <Header/>
            <div className="brand">
                <h2>Porsche Cayenne</h2>
                <div className="carContainer">
                    <img src={CarPhotos}/>
                </div>
            </div>
            <div className="specifications">
                <h4>Specifications</h4>
                <div className="specs">
                    <ul>
                        <li>7 Seater</li>
                        <li>Automatic</li>
                        <li>Within 8.0 Km</li>
                        <li>Electric</li>
                    </ul>
                </div>
            </div>
            <div className="pickupPlace">
                <h4>Pickup Location</h4>
                <input type="text" placeholder="Enter your city and street address"/>
            </div>
            <div className="pickupDate">
                <h4>PICK UP AND RETURN DATE</h4>
                <div className="datePickup">
                    <h5>Pick Up</h5>
                    <input type="date" id="pickupDate"
                           name="pickupDate"
                           pattern="\d{2}/\d{2}/\d{4}"
                           placeholder="dd/mm/yyyy"
                    />
                </div>
                <div className="datePickup">
                    <h5>Return</h5>
                    <input type="date" id="returnDate"
                           name="returnDate"
                           pattern="\d{2}/\m{2}/\d{4}"
                           placeholder="dd/mm/yyyy"
                    />
                </div>
            </div>
            <div className="pricing">
                <p>$69/day</p>
                <button>Book</button>
            </div>
        </div>
    );
}

