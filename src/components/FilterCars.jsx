import React, { useState } from 'react';
import '../scss/components/_filterCars.scss';

const FilterCars = ({ onFilterChange }) => {
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
    const clearedFilters = {
      priceRange: [],
      transmission: [],
      fuelType: [],
      seats: [],
      vehicleCategory: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setOpenSections([]);
  };

  const updateFilters = (filterType, value) => {
    const updatedValues = filters[filterType].includes(value)
      ? filters[filterType].filter(item => item !== value)
      : [...filters[filterType], value];
    
    const newFilters = {
      ...filters,
      [filterType]: updatedValues
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
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
                    onChange={() => updateFilters('priceRange', price.range)}
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
                    onChange={() => updateFilters('transmission', item.type)}
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
                    onChange={() => updateFilters('fuelType', item.type)}
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
                    onChange={() => updateFilters('seats', item.count)}
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
                    onChange={() => updateFilters('vehicleCategory', item.category)}
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
