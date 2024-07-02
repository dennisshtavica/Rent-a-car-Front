import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../scss/components/_carCard.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import CarCard from "../components/CarCard";
import CarRentedCard from "../components/CarRentedCard";

export default function CarRented() {
  const [bookedCar, setBookedCar] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  console.log("bookedCar", bookedCar);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    axios.get(`http://localhost:3011/carsRented/${user.id}`,
      {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }
    ).then((res) => {
      setBookedCar(res.data);
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleCancelBooking = (bookingId) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [bookingId]: true,
    }));

    axios
      .delete(`http://localhost:3011/cancelBooking/${user.id}/${bookingId}`, 
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((res) => {
        setTimeout(() => {
          setLoadingStates((prevState) => ({
            ...prevState,
            [bookingId]: false,
          }));
          setBookedCar(bookedCar.filter((car) => car.bookingId !== bookingId));
        }, 2000);
      })
      .catch((err) => {
        console.error("Error canceling booking:", err);
        setLoadingStates((prevState) => ({
          ...prevState,
          [bookingId]: false,
        }));
      });
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
          <CarRentedCard
            key={car.bookingId}
            _id={car.car._id}
            image={car.car.image}
            name={car.car.name}
            model={car.car.model}
            seats={car.car.seats}
            transmission={car.car.transmission}
            range={car.car.range}
            price={car.car.price}
            formattedDates={car.formattedDates}
            pickupLocation={car.pickupLocation}
            handleCancelBooking={() => handleCancelBooking(car.bookingId)}
            loading={loadingStates[car.bookingId] || false}
          />
        ))}
      </div>
    </div>
  );
}
