import React, { useState, useEffect } from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_mainPage.scss";
import CarCard from "../components/CarCard";
import Header from "../components/Header";
import axios from "axios";
import arrowDown from "../assets/images/arrowDown.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SignIn from "./Users/SignIn";

export default function MainPage() {
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState("All Brands");
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios
        .get("http://localhost:3011/getCars", {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((res) => {
          const sortedCars = res.data.sort((a, b) => a.name.localeCompare(b.name));

          setAllCars(sortedCars);
          setFilteredCars(sortedCars);

          const brands = ["All Brands", ...new Set(sortedCars.map((car) => car.name))];
          setCarBrands(brands);
        })
        .catch((err) => {
          console.log("Error fetching cars", err);
        });
  }, []);

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

  const handleCarChange = (selectedCarValue) => {
    setSelectedCar(selectedCarValue);

    if (selectedCarValue === "All Brands") {
      setModelOptions(["All Models"]);
      setFilteredCars(allCars);
    } else {
      const models = ["All Models", ...new Set(allCars.filter(car => car.name === selectedCarValue).map(car => car.model))];
      setModelOptions(models);

      setFilteredCars(allCars.filter((car) => car.name === selectedCarValue));
    }

    setFirstDropdownOpen(false);
  };

  const handleModel = (option) => {
    setSelectedModel(option);
    setSecondDropdownOpen(false);
  };

  const handleSearch = () => {
    let filtered = allCars;

    if (selectedCar !== "All Brands") {
      filtered = filtered.filter((car) => car.name === selectedCar);
    }

    if (selectedModel !== "All Models" && selectedModel !== "Car Model") {
      filtered = filtered.filter((car) => car.model === selectedModel);
    }

    setFilteredCars(filtered);
  };

  const handleOutsideClick = (e) => {
    if (firstDropdownOpen && !e.target.closest(".BrandFilter")) {
      setFirstDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [firstDropdownOpen]);

  const handleOutsideClick2 = (e) => {
    if (secondDropdownOpen && !e.target.closest(".ModelFilter")) {
      setSecondDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick2);
    return () => {
      document.removeEventListener("click", handleOutsideClick2);
    };
  }, [secondDropdownOpen]);

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
                      {carBrands.map((brand, index) => (
                          <div
                              key={index}
                              className="custom-option"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleCarChange(brand)}
                          >
                            {brand}
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
            {filteredCars.map((car) => (
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
