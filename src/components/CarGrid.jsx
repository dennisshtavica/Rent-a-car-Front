import React, { useState, useEffect, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Default');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };


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
        <h2 className="title">Choose your vehicle</h2>
        <div className="searchBar">
          <svg 
            className="searchIcon" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" 
              stroke="#666666" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M14 14L11.1 11.1" 
              stroke="#666666" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <span className="availableCars">{sortedAndFilteredCars.length} AVAILABLE</span>
        <div className="sortSection">
          <span className="sortLabel">SORT BY</span>
          <div className="customSelect" ref={dropdownRef}>
            <div 
              className="selectedOption" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedOption}
              <svg 
                className={`arrow ${isOpen ? 'open' : ''}`}
                width="10" 
                height="6" 
                viewBox="0 0 10 6" 
                fill="none"
              >
                <path d="M1 1L5 5L9 1" stroke="#007bff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {isOpen && (
              <div className="optionsList">
                <div 
                  className="option" 
                  onClick={() => { setSelectedOption('Default'); setIsOpen(false); handleSort({ target: { value: 'Default' } }); }}
                >
                  Default
                </div>
                <div 
                  className="option" 
                  onClick={() => { setSelectedOption('MOST POPULAR FIRST'); setIsOpen(false); handleSort({ target: { value: 'MOST POPULAR FIRST' } }); }}
                >
                  MOST POPULAR FIRST
                </div>
                <div 
                  className="option" 
                  onClick={() => { setSelectedOption('Price: Low to High'); setIsOpen(false); handleSort({ target: { value: 'price-low' } }); }}
                >
                  Price: Low to High
                </div>
                <div 
                  className="option" 
                  onClick={() => { setSelectedOption('Price: High to Low'); setIsOpen(false); handleSort({ target: { value: 'price-high' } }); }}
                >
                  Price: High to Low
                </div>
              </div>
            )}
          </div>
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
