import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import "../scss/components/_carGrid.scss";
import axios from "axios";

const CarGrid = ({ filters }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('Default');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3011/getCars", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          setError("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const getFilteredCars = () => {
    return cars.filter(car => {
      // Price Range Filter
      const priceMatch = filters.priceRange.length === 0 || 
        filters.priceRange.some(range => {
          // Handle the "€201+" case separately
          if (range === '€201+') {
            return car.price >= 201;
          }
          
          // For other ranges, parse the numbers
          const [minStr, maxStr] = range.split(' - ');
          const min = parseInt(minStr.replace('€', ''));
          const max = parseInt(maxStr.replace('€', ''));
          
          return car.price >= min && car.price <= max;
        });

      const transmissionMatch = filters.transmission.length === 0 ||
        filters.transmission.includes(car.transmission);

      const fuelMatch = filters.fuelType.length === 0 ||
        filters.fuelType.includes(car.fuelType);

      const seatsMatch = filters.seats.length === 0 ||
        filters.seats.includes(`${car.seats} Seats`);

      const categoryMatch = filters.vehicleCategory.length === 0 ||
        filters.vehicleCategory.includes(car.category);

      return priceMatch && transmissionMatch && fuelMatch && 
             seatsMatch && categoryMatch;
    });
  };

  const getSortedCars = (filteredCars) => {
    let sortedCars = [...filteredCars];
    
    switch (sortType) {
      case 'MOST POPULAR FIRST':
        return sortedCars.filter(car => car.available);
      case 'price-low':
        return sortedCars.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedCars.sort((a, b) => b.price - a.price);
      default:
        return sortedCars;
    }
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredCars = getFilteredCars();
  const sortedAndFilteredCars = getSortedCars(filteredCars);

  return (
    <div className="gridContainer">
      <div className="gridHeader">
        <div className="leftSection">
          <h2>Choose your vehicle</h2>
          <div className="searchSection">
            <input type="text" placeholder="Search" />
            <span className="availableCars">{sortedAndFilteredCars.length} AVAILABLE</span>
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
        {sortedAndFilteredCars.map((car) => (
          <CarCard 
            key={car._id}
            model={`${car.brand} ${car.model}`}
            pricePerDay={car.price}
            totalPrice={car.price * 7}
            features={[
              `${car.seats} Seats`,
              car.transmission,
              car.year.toString(),
              car.fuelType || 'N/A'
            ]}
            isEarlyBird={car.available}
            image={`http://localhost:3011/${car.image}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarGrid;
