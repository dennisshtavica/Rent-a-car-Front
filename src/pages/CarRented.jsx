import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../scss/components/_carCard.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import CarCard from "../components/CarCard";

export default function CarRented() {
  const [bookedCar, setBookedCar] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log("bookedCar", bookedCar);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios.get(`http://localhost:3011/carsRented/${user.id}`).then((res) => {
      setBookedCar(res.data);
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="carRented container">
      <Header isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
      <div>
        <h1>Car Rented</h1>
        {bookedCar.map((car) => (
          <CarCard
            key={car._id}
            _id={car._id}
            image={car.image}
            name={car.name}
            model={car.model}
            seats={car.seats}
            transmission={car.transmission}
            range={car.range}
            price={car.price}
          />
        ))}
      </div>
    </div>
  );
}
