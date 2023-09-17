import React, { useState, useEffect } from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_mainPage.scss";
import CarCard from "../components/CarCard";
import Header from "../components/Header";
import axios from "axios";
import arrowDown from "../assets/images/arrowDown.svg"

export default function MainPage() {
  //   const [selectedValue, setSelectedValue] = useState("");
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState("Car Brand");
  const [selectedModel, setSelectedModel] = useState("Car Model");
  const [cars, setCars] = useState([]);


  const carBrandOptions = ["Audi", "BMW", "Porsche"];

  const audiModels = ["Q7", "Q8"];
  const bmwModels = ["3", "M3"];

  const toggleFirstDropdown = () => {
    setFirstDropdownOpen(!firstDropdownOpen);
  };

  const toggleSecondDropdown = () => {
    setSecondDropdownOpen(!secondDropdownOpen);
  };

  const handleCarBrand = (option) => {
    setSelectedCar(option)
    setFirstDropdownOpen(false)
  }

  const handleModel = (option) => {
    setSelectedModel(option)
    setSecondDropdownOpen(false)
  }
  
  useEffect(() => {
    axios
      .get("http://localhost:3011/getCars")
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div className="mainPage container">
      <Header />
      <div className="carFilterWrapper">
        <h2>Drive the Car of your dreams</h2>
        <div className="searchFilters">
          <div className="BrandFilter">
            <div
              className={`custom-selected ${firstDropdownOpen ? "open" : ""}`}
              onClick={toggleFirstDropdown}
            >
              {selectedCar}
              <img src={arrowDown} alt="" />

            </div>
            {firstDropdownOpen && (
              <div className="custom-options">
                {carBrandOptions.map((option, index) => (
                  <div
                    key={index}
                    className="custom-option"
                    onClick={() => handleCarBrand(option)}
                  >
                    {option}
                  </div>
                ))}

              </div>
            )}
           
          </div>
          <div className="ModelFilter">
          <div
              className={`custom-selected ${secondDropdownOpen ? "open" : ""}`}
              onClick={toggleSecondDropdown}
            >
              {selectedModel}
              <img src={arrowDown} alt="" />

            </div>
            {secondDropdownOpen && (
              <div className="custom-options">
                {carBrandOptions.map((option, index) => (
                  <div
                    key={index}
                    className="custom-option"
                    onClick={() => handleModel(option)}
                  >
                    {option}
                  </div>
                ))}

              </div>
            )}
           
          </div>
        </div>
        <button className="searchButton">Search</button>
      </div>
      <div className="carDeals">
        <h2>Popular Cars</h2>

        {cars.map((car) => (
          <CarCard
            key={car._id}
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
