import React, { useState, useEffect } from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_mainPage.scss";
import CarCard from "../components/CarCard";
import Header from "../components/Header";
import axios from "axios";
import arrowDown from "../assets/images/arrowDown.svg";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import SignIn from "./Users/SignIn";

export default function MainPage() {
  //   const [selectedValue, setSelectedValue] = useState("");
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState("Car Brand");
  const [selectedModel, setSelectedModel] = useState("Car Model");
  const [cars, setCars] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const carsData = [
    { car: "Audi", models: ["Q7", "Q8"] },
    { car: "BMW", models: ["3", "M3"] },
    { car: "Porsche", models: ["Cayenne", "Carrera S"] },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleFirstDropdown = () => {
    setFirstDropdownOpen(!firstDropdownOpen);
  };

  const toggleSecondDropdown = () => {
    setSecondDropdownOpen(!secondDropdownOpen);
  };

  const handleCarBrand = (option) => {
    setSelectedCar(option);
    setFirstDropdownOpen(false);
  };

  const handleModel = (option) => {
    setSelectedModel(option);
    setSecondDropdownOpen(false);
  };

  const handleCarChange = (selectedCarValue) => {
    setSelectedCar(selectedCarValue);

    const selectedCarData = carsData.find(
      (car) => car.car === selectedCarValue
    );

    if (selectedCarData) {
      setModelOptions(selectedCarData.models);
    } else {
      setModelOptions([]);
    }

    setFirstDropdownOpen(false);
  };

  const handleSearch = () => {
    if (selectedCar && selectedModel) {
      navigate(`/search-results/${selectedCar}/${selectedModel}`);
    } else {
      alert("Please select both car brand and model.");
    }
  };

  const handleOutsideClick = (e) => {
    if (firstDropdownOpen && !e.target.closest(".BrandFilter")) {
      setFirstDropdownOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [firstDropdownOpen]);

  const handleOutsideClick2 = (e) => {
    if (secondDropdownOpen && !e.target.closest(".ModelFilter")) {
      setSecondDropdownOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick2);
    return () => {
      document.removeEventListener('click', handleOutsideClick2);
    }
  }, [secondDropdownOpen]);

  useEffect(() => {
    axios
      .get("http://localhost:3011/getCars", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);


  if (!user) {
    return <SignIn />;
  }

  return (
    <div>
      <div className="mainPage container">
        <Header isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
        <div className="carFilterWrapper">
          <h2>Drive the Car of your dreams</h2>
          <div className="searchFilters ">
            <div className={`BrandFilter ${isOpen && "setIndex"}`}>
              <div
                className={`custom-selected ${firstDropdownOpen ? "open" : ""}`}
                onClick={toggleFirstDropdown}
              >
                {selectedCar}
                <img src={arrowDown} alt="" />
              </div>
              {firstDropdownOpen && (
                <div className="custom-options">
                  {carsData.map((option, index) => (
                    <div
                      key={index}
                      className="custom-option"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCarChange(option.car)}
                    >
                      {option.car}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={`ModelFilter ${isOpen && "setIndex"}`}>
              <div
                className={`custom-selected ${
                  secondDropdownOpen ? "open" : ""
                }`}
                onClick={toggleSecondDropdown}
              >
                {selectedModel}
                <img src={arrowDown} alt="" />
              </div>
              {secondDropdownOpen && (
                <div className="custom-options">
                  {modelOptions.map((option, index) => (
                    <div
                      key={index}
                      className="custom-option"
                      onClick={() => handleModel(option)}
                      style={{ cursor: "pointer" }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="searchButton" onClick={handleSearch}>
            Search
          </button>
        </div>
        <h2 className="popularCars">Popular Cars</h2>
        <div className="carDeals">
          {cars.map((car) => (
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
      <Footer />
    </div>
  );
}
