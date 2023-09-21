import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import CarPhotos from "../assets/images/car.png";
import "../scss/sections/_bookingPage.scss";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
    const {id} = useParams()

    const [carDetails, setCarDetails] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3011/bookingPage/${id}`)
        .then((res) => {
            setCarDetails(res.data)
        })
        .catch((err) => {
            console.log('Err', err);
        })

    }, [id])

    
    return (
        <div className="booking container">
            <Header/>
            <div className="brand">
                <h2>{carDetails.name} {carDetails.model}</h2>
                <div className="carContainer">
                    {/* <img src={CarPhotos}/> */}
                    <img src={`http://localhost:3011/${carDetails.image}`} alt="" />
                </div>
            </div>
            <div className="specifications">
                <h4>Specifications</h4>
                <div className="specs">
                    <ul>
                        <li>{carDetails.seats} Seater</li>
                        <li>{carDetails.transmission}</li>
                        <li>Within {carDetails.range}</li>
                        <li>{carDetails.type}</li>
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
                <p>{`${carDetails.price}$/day`}</p>
                <button>Book</button>
            </div>
        </div>
    );
}

