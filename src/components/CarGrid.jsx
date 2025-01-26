import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import "../scss/components/_carGrid.scss";
import axios from "axios";

const CarGrid = ({ filters }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('Default');
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [bookings, setBookings] = useState({});

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  console.log('bookings:', bookings);

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

        const bookingsResponse = await axios.get("http://localhost:3011/bookings", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

          const bookingsMap = {};
      bookingsResponse.data.forEach(booking => {
        if (!bookingsMap[booking.carId] || 
            new Date(booking.rentalDate.to) > new Date(bookingsMap[booking.carId].rentalDate.to)) {
          bookingsMap[booking.carId] = {
            ...booking,
            formattedDate: formatDate(booking.rentalDate.to)
          };
        }
      });

        if (response.data && Array.isArray(response.data)) {
          console.log("First car object:", response.data[0]);
          setCars(response.data);
        } else {
          setError("Invalid data format received from server");
        }
        setBookings(bookingsMap);
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
      const priceMatch = filters.priceRange.length === 0 || 
        filters.priceRange.some(range => {
          if (range === '€201+') {
            return car.price >= 201;
          }
          
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
        filters.vehicleCategory.includes(car.car_category._id);

      const searchMatch =
        car.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      return priceMatch && transmissionMatch && fuelMatch && 
             seatsMatch && categoryMatch && searchMatch;
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
            bookingDate={bookings[car._id]?.formattedDate}
            features={[
              `${car.seats} Seats`,
              car.transmission,
              car.year.toString(),
              car.fuelType || 'N/A'
            ]}
            isEarlyBird={car.available}
            image={`http://localhost:3011/${car.image}`}
            car={car}
          />
        ))}
      </div>
    </div>
  );
};

export default CarGrid;
