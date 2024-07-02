import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CarPhotos from "../assets/images/car.png";
import "../scss/sections/_bookingPage.scss";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function BookingPage() {
  const { id } = useParams();

  const [carDetails, setCarDetails] = useState([]);
  const [location, setLocation] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [retDate, setRetDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:3011/bookingPage/${id}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        setCarDetails(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, [id]);

  const bookCar = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        "http://localhost:3011/bookings",
        {
          carId: id,
          pickupLocation: location,
          pickupDate: pickUp,
          returnDate: retDate,
          userId: user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        },
      )
      .then((res) => {
        console.log("Car booked");
        setTimeout(() => {
          setLoading(false);
          setIsBooked(true);
        }, 1500);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

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
    <div className="booking container">
      <Header isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
      <div className="brand">
        <h2 style={{ marginBottom: "10px" }}>
          {carDetails.name} {carDetails.model}
        </h2>
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
      <form action="" onSubmit={bookCar}>
        <div className="pickupPlace">
          <h4>Pickup Location</h4>
          <input
            type="text"
            placeholder="Enter your city and street address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="pickupDate">
          <h4>PICK UP AND RETURN DATE</h4>
          <div className="datePickup">
            <h5>Pick Up</h5>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="dd/mm/yyyy"
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
            />
          </div>
          <div className="datePickup">
            <h5>Return</h5>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              pattern="\d{2}/\m{2}/\d{4}"
              placeholder="dd/mm/yyyy"
              value={retDate}
              onChange={(e) => setRetDate(e.target.value)}
            />
          </div>
        </div>
        <div className="pricing">
          <p>{`${carDetails.price}$/day`}</p>
          {isBooked ? (
            <div className="background-opacity">
              <div className="carBooked">
                <h1>CAR BOOKED</h1>
                <Link to="/carsRented">
                  <p>See details</p>
                </Link>
              </div>
            </div>
          ) : (
            <button type="submit" style={{ cursor: "pointer" }}>
              {loading ? <PulseLoader color="#fff" size={8} /> : "Book"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
