import React, { useState } from 'react';
import '../scss/components/_filterCars.scss';

const FilterCars = () => {
  const [filters, setFilters] = useState({
    priceRange: [],
    transmission: [],
    fuelType: [],
    seats: [],
    vehicleCategory: []
  });

  const [openSections, setOpenSections] = useState([]);

  const priceRanges = [
    { id: 1, range: '€0 - €50' },
    { id: 2, range: '€51 - €100' },
    { id: 3, range: '€101 - €150' },
    { id: 4, range: '€151 - €200' },
    { id: 5, range: '€201+' }
  ];

  const transmissionTypes = [
    { id: 1, type: 'Automatic' },
    { id: 2, type: 'Manual' },
  ];

  const fuelTypes = [
    { id: 1, type: 'Petrol' },
    { id: 2, type: 'Diesel' },
    { id: 3, type: 'Electric' },
    { id: 4, type: 'Hybrid' },
  ];

  const seatOptions = [
    { id: 1, count: '2 Seats' },
    { id: 2, count: '4 Seats' },
    { id: 3, count: '5 Seats' },
    { id: 5, count: '7 Seats' },
  ];

  const vehicleCategories = [
    { id: 1, category: 'Sedan' },
    { id: 2, category: 'SUV' },
    { id: 3, category: 'Hatchback' },
    { id: 4, category: 'Coupe' },
    { id: 5, category: 'Wagon' },
    { id: 7, category: 'Convertible' },
  ];

  const handleClearFilters = () => {
    setFilters({
      priceRange: [],
      transmission: [],
      fuelType: [],
      seats: [],
      vehicleCategory: []
    });
    setOpenSections([]);
  };

  const toggleSection = (section) => {
    setOpenSections(prevSections => 
      prevSections.includes(section)
        ? prevSections.filter(s => s !== section)
        : [...prevSections, section]
    );
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>Filter</h2>
        <button onClick={handleClearFilters} className="clear-filters">
          CLEAR ALL FILTERS
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <div className="filter-title" onClick={() => toggleSection('price')}>
            <h3>PRICE RANGE</h3>
            <span className={`chevron ${openSections.includes('price') ? 'open' : ''}`}>▼</span>
          </div>
          {openSections.includes('price') && (
            <div className="filter-options">
              {priceRanges.map((price) => (
                <label key={price.id} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={filters.priceRange.includes(price.range)}
                    onChange={() => {
                      const updatedPrices = filters.priceRange.includes(price.range)
                        ? filters.priceRange.filter(p => p !== price.range)
                        : [...filters.priceRange, price.range];
                      setFilters({ ...filters, priceRange: updatedPrices });
                    }}
                  />
                  <span className="checkbox-label">{price.range}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="filter-group">
          <div className="filter-title" onClick={() => toggleSection('transmission')}>
            <h3>TRANSMISSION</h3>
            <span className={`chevron ${openSections.includes('transmission') ? 'open' : ''}`}>▼</span>
          </div>
          {openSections.includes('transmission') && (
            <div className="filter-options">
              {transmissionTypes.map((item) => (
                <label key={item.id} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={filters.transmission.includes(item.type)}
                    onChange={() => {
                      const updatedTransmission = filters.transmission.includes(item.type)
                        ? filters.transmission.filter(t => t !== item.type)
                        : [...filters.transmission, item.type];
                      setFilters({ ...filters, transmission: updatedTransmission });
                    }}
                  />
                  <span className="checkbox-label">{item.type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="filter-group">
          <div className="filter-title" onClick={() => toggleSection('fuel')}>
            <h3>FUEL TYPE</h3>
            <span className={`chevron ${openSections.includes('fuel') ? 'open' : ''}`}>▼</span>
          </div>
          {openSections.includes('fuel') && (
            <div className="filter-options">
              {fuelTypes.map((item) => (
                <label key={item.id} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={filters.fuelType.includes(item.type)}
                    onChange={() => {
                      const updatedFuelType = filters.fuelType.includes(item.type)
                        ? filters.fuelType.filter(f => f !== item.type)
                        : [...filters.fuelType, item.type];
                      setFilters({ ...filters, fuelType: updatedFuelType });
                    }}
                  />
                  <span className="checkbox-label">{item.type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="filter-group">
          <div className="filter-title" onClick={() => toggleSection('seats')}>
            <h3>SEATS</h3>
            <span className={`chevron ${openSections.includes('seats') ? 'open' : ''}`}>▼</span>
          </div>
          {openSections.includes('seats') && (
            <div className="filter-options">
              {seatOptions.map((item) => (
                <label key={item.id} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={filters.seats.includes(item.count)}
                    onChange={() => {
                      const updatedSeats = filters.seats.includes(item.count)
                        ? filters.seats.filter(s => s !== item.count)
                        : [...filters.seats, item.count];
                      setFilters({ ...filters, seats: updatedSeats });
                    }}
                  />
                  <span className="checkbox-label">{item.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="filter-group">
          <div className="filter-title" onClick={() => toggleSection('category')}>
            <h3>VEHICLE CATEGORY</h3>
            <span className={`chevron ${openSections.includes('category') ? 'open' : ''}`}>▼</span>
          </div>
          {openSections.includes('category') && (
            <div className="filter-options">
              {vehicleCategories.map((item) => (
                <label key={item.id} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={filters.vehicleCategory.includes(item.category)}
                    onChange={() => {
                      const updatedCategory = filters.vehicleCategory.includes(item.category)
                        ? filters.vehicleCategory.filter(c => c !== item.category)
                        : [...filters.vehicleCategory, item.category];
                      setFilters({ ...filters, vehicleCategory: updatedCategory });
                    }}
                  />
                  <span className="checkbox-label">{item.category}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterCars;
