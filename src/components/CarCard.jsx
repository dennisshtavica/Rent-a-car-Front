import React from 'react';
import "../scss/components/_carCard.scss"
import CarPhotos from "../assets/images/car.png";
import {Link} from "react-router-dom";
export default function CarCard() {
    return (
        <div className="cardWrapper">
            <div className="cardContainer">
                <div className="cardSpecs">
                    <div className="carPhoto">
                        <img src={CarPhotos}/>
                    </div>
                    <div className="carInfo">
                        <p className="carBrand">Porsche</p>
                        <p className="carModel">Cayenne</p>

                        <p className="carType">7 Seater</p>
                        <p className="carType">Automatic</p>
                        <p className="carType">Within 8.0 Km</p>
                    </div>
                </div>
                <div className="carPrice">
                    <p>$69/day</p>
                    <Link to="/bookingPage">
                        <button>Book</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


