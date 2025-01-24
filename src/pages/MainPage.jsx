import React, { useState, useEffect } from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_mainPage.scss";
import Header from "../components/Header";
import axios from "axios";
import arrowDown from "../assets/images/arrowDown.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SignIn from "./Users/SignIn";
import "react-day-picker/style.css";
import RentalDateModal from "../components/Modal/RentalDateModal";
import PickUpLocationModal from "../components/Modal/PickUpLocationModal";
import ReturnLocationModal from "../components/Modal/ReturnLocationModal";
import BookingModal from "../components/Modal/BookingModal";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleRentalDateModal,
  togglePickupLocationModal,
  toggleReturnLocationModal,
  toggleBookingModal,
} from "../app/slices/rentalDateModalSlice";
import { format, isValid, differenceInDays } from "date-fns";
import FilterCars from "../components/FilterCars";
import CarGrid from "../components/CarGrid";
import { se } from "react-day-picker/locale";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChooseBelow, setShowChooseBelow] = useState(false);
  const { rentalDate, pickupLocation, returnLocation, selectedCar } = useSelector(
    (state) => state.booking
  );

  const dispatch = useDispatch();
  const isRentalDateModalV = useSelector(
    (state) => state.modal.isRentalDateModalV
  );

  const isBookingModalV = useSelector((state) => {
    return state.modal.isBookingModalV;
  });

  const isPickupLocationModalV = useSelector(
    (state) => state.modal.isPickupLocationModalV
  );

  const isReturnLocationModalV = useSelector(
    (state) => state.modal.isReturnLocationModalV
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    priceRange: [],
    transmission: [],
    fuelType: [],
    seats: [],
    vehicleCategory: []
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return null;
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formattedRentalDate =
    rentalDate.from && rentalDate.to
      ? `${formatDate(rentalDate.from)} - ${formatDate(rentalDate.to)}`
      : rentalDate.from
      ? formatDate(rentalDate.from)
      : "Choose date";

  const handleToggleRetalDateModal = (step) => {
    dispatch(toggleRentalDateModal());
    // setSelectedDate(date);
  };

  const handleTogglePickupLocationModal = () => {
    dispatch(togglePickupLocationModal());
  };

  const handleToggleReturnLocationModal = () => {
    dispatch(toggleReturnLocationModal());
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleVehicleClick = () => {
    setShowChooseBelow(!showChooseBelow);
  };

  const handleToggleBookingModal = () => {
    dispatch(toggleBookingModal());
  };

  const calculateTotalPrice = () => {
    if (selectedCar && rentalDate.from && rentalDate.to) {
      const days = differenceInDays(rentalDate.to, rentalDate.from) + 1;
      return selectedCar.car.price * days;
    }
    return null;
  };

  if (!user) {
    return <SignIn />;
  }

  return (
    <div>
      <div className="mainPage container">
        <Header isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
      </div>

      <div className="bookingSteps">
        <div className="rentalInfo item1">
          <div className="stepNum">
            <h1>1</h1>
          </div>
          <div className="stepAndChoose">
            <div className="stepText">
              <p>RENTAL INFORMATION DATE</p>
            </div>
            <div className="stepChoose">
              <p
                onClick={handleToggleRetalDateModal}
                style={{ cursor: "pointer" }}
              >
                {formattedRentalDate}
              </p>
            </div>
          </div>
        </div>

        <div className="rentalInfo item2">
          <div className="stepNum">
            <h1>2</h1>
          </div>
          <div className="stepAndChoose">
            <div className="stepText">
              <p>PICK UP LOCATION</p>
            </div>
            <div className="stepChoose">
              <p
                onClick={handleTogglePickupLocationModal}
                style={{ cursor: "pointer" }}
              >
                {pickupLocation || "Choose"}
              </p>
            </div>
          </div>
        </div>

        <div className="rentalInfo item3">
          <div className="stepNum">
            <h1>3</h1>
          </div>
          <div className="stepAndChoose">
            <div className="stepText">
              <p>RETURN LOCATION</p>
            </div>
            <div className="stepChoose">
              <p
                onClick={handleToggleReturnLocationModal}
                style={{ cursor: "pointer" }}
              >
                {returnLocation || "Choose"}
              </p>
            </div>
          </div>
        </div>

        <div className="rentalInfo item4">
          <div className="stepNum">
            <h1>4</h1>
          </div>
          <div className="stepAndChoose">
            <div className="stepText">
              <p>VEHICLE</p>
            </div>
            <div className="stepChoose" onClick={handleVehicleClick} style={{ cursor: "pointer" }}>
              <p>{selectedCar ? `${selectedCar.car.brand} ${selectedCar.car.model}` : (showChooseBelow ? "Choose Below" : "Choose")}</p>
            </div>
          </div>
        </div>
        
        <div className="rentalInfo item5">
          <div className="stepNum">
            <h1>5</h1>
          </div>
          <div className="stepAndChoose">
            <div className="stepText">
              <p>TOTAL</p>
            </div>
            <div className="stepChoose">
              <p>{calculateTotalPrice() ? `${calculateTotalPrice()}€` : 'Choose'}</p>
            </div>
          </div>
          <button 
            className="bookBtn" 
            onClick={handleToggleBookingModal}
            disabled={!selectedCar || !rentalDate.from || !rentalDate.to}
          >
            Book
          </button>
        </div>
      </div>


      {isRentalDateModalV && (
        <div className="modalWrapper modal1">
          <RentalDateModal onConfirm={handleToggleRetalDateModal} />
        </div>
      )}

      {isPickupLocationModalV && (
        <div className="modalWrapper modal2">
          <PickUpLocationModal onConfirm={handleTogglePickupLocationModal} />
        </div>
      )}

      {isReturnLocationModalV && (
        <div className="modalWrapper modal2">
          <ReturnLocationModal onConfirm={handleToggleReturnLocationModal} />
        </div>
      )}
      {isBookingModalV && (
        <div className="modalWrapper modal3">
          <BookingModal 
            isVisible={isBookingModalV}
            onConfirm={() => {
              dispatch(toggleBookingModal(false));
            }} 
          />
        </div>
      )}

      <div className="carGridContainer">
        <FilterCars onFilterChange={handleFilterChange} />
        <CarGrid filters={filters} />
      </div>
      <Footer />


      {/* <Footer /> */}
    </div>
  );
}
