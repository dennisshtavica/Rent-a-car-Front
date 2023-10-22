import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import "../scss/components/_carCard.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import CarCard from "../components/CarCard";

export default function CarRented() {
  const [car, setCar] = useState([])
  const [bookedCar, setBookedCar] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3011/bookings/:id")
    .then((res) => {
        setBookedCar(res.data)
    })
  }, [])


  return (
    <div className="carRented container">
      <Header />
      <div>
        <h1>Car Rented</h1>
        {bookedCar && (
          <CarCard
            _id={bookedCar.carId._id}
            image={bookedCar.carId.image}
            name={bookedCar.carId.name}
            model={bookedCar.carId.model}
            seats={bookedCar.carId.seats}
            transmission={bookedCar.carId.transmission}
            range={bookedCar.carId.range}
            // price={bookedCar.carId.price}
          />
        )}
        {/* <div className="cardWrapper">
          <div className="cardContainer">
            <div className="cardSpecs">
              <div className="carPhoto">
                <img src={`http://localhost:3011/${image}`} />
              </div>
              <div className="carInfo">
                <p className="carBrand">{bookedCar.carId.name}</p>
                <p className="carModel">Porshce</p>

                <p className="carType">Porshce</p>
                <p className="carType">Porshce</p>
                <p className="carType">Porshce</p>
              </div>
            </div>
            <div className="carPrice">
              <p>Porshce€/day</p>
              <Link to={`/bookingPage`}>
                <button>Cancel</button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
