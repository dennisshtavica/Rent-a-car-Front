import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import filterImg from "../assets/images/settings-sliders.png";
import "../scss/sections/_searchResults.scss";
import CarCard from "../components/CarCard";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SearchResults() {
  const { carBrand, carModel } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:3011/search-results/${carBrand}/${carModel}`, 
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((res) => {
        setSearchResults(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
      });
  }, [carBrand, carModel]);

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
    <div className="container">
      <div>
        <Header isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
      </div>
      <div className="flexSHeader">
        <div>
          <p>Search results</p>
        </div>
        <div>
          <img src={filterImg} alt="" />
        </div>
      </div>
      <div>
        {searchResults.map((car) => (
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
