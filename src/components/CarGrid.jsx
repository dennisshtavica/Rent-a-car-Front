import React, { useState } from "react";
import CarCard from "./CarCard";
import "../scss/components/_carGrid.scss";

const carData = [
  {
    id: 1,
    model: "VW T-Roc",
    pricePerDay: "119.99",
    totalPrice: "1159.99",
    features: ["4", "Diesel", "Automatic"],
    isEarlyBird: true,
    distance: "Within 8.0 Km"
  },
  {
    id: 2,
    model: "VW T-Roc",
    pricePerDay: "129.99",
    totalPrice: "1159.99",
    features: ["4", "Petrol", "Manual"],
    isEarlyBird: true,
    distance: "Within 8.0 Km"
  },
  {
    id: 3,
    model: "VW T-Roc",
    pricePerDay: "139.99",
    totalPrice: "1159.99",
    features: ["5", "Petrol", "Manual"],
    isEarlyBird: true,
    distance: "Within 8.0 Km"
  },
  {
    id: 4,
    model: "VW T-Roc",
    pricePerDay: "149.99",
    totalPrice: "1159.99",
    features: ["5", "Petrol", "Manual"],
    distance: "Within 8.0 Km"
  },   
  {
    id: 5,
    model: "VW T-Roc",
    pricePerDay: "159.99",
    totalPrice: "1159.99",
    features: ["5", "Petrol", "Manual"],
    distance: "Within 8.0 Km"
  },
  {
    id: 6,
    model: "VW T-Roc",
    pricePerDay: "169.99",
    totalPrice: "1159.99",
    features: ["4", "Petrol", "Automatic"],
    distance: "Within 8.0 Km"
  }
];

export default function CarGrid() {
  const [sortedCars, setSortedCars] = useState(carData);

  const handleSort = (event) => {
    const sortType = event.target.value;
    let sorted;
    
    if (sortType === 'MOST POPULAR FIRST') {
      // Filter to show only early bird cars
      sorted = [...carData].filter(car => car.isEarlyBird);
    } else {
      // For other sort types, use all cars
      sorted = [...carData].sort((a, b) => {
        switch (sortType) {
          case 'price-low':
            return parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay);
          case 'price-high':
            return parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay);
          default:
            return 0;
        }
      });
    }
    setSortedCars(sorted);
  };

  return (
    <div className="gridContainer">
      <div className="gridHeader">
        <div className="leftSection">
          <h2>Choose your vehicle</h2>
          <div className="searchSection">
            <input type="text" placeholder="Search" />
            <span className="availableCars">21 AVAILABLE</span>
          </div>
        </div>
        <div className="sortSection">
          <label>SORT BY</label>
          <select defaultValue="Default" onChange={handleSort}>
            <option value="Default">Default</option>
            <option value="MOST POPULAR FIRST">MOST POPULAR FIRST</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="carGrid">
        {sortedCars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
}
