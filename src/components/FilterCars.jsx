import React, { useState } from 'react';
import '../scss/components/_filterCars.scss';
import rightArrow from '../assets/images/right-arrow.svg';
import filterLogo from '../assets/images/filterLogo.svg';

const FilterCars = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: [],
    transmission: [],
    fuelType: [],
    seats: [],
    vehicleCategory: []
  });

  const [openSections, setOpenSections] = useState(['price', 'transmission', 'fuel', 'seats', 'category']);

  const priceRanges = [
    { id: 1, range: '€100 - €200' },
    { id: 2, range: '€201 - €300' },
    { id: 3, range: '€301 - €350' },
    { id: 4, range: '€351 - €400' },
    { id: 5, range: '€401 - €1000' }
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
    { id: "67937323f91c5f7f64c8017f", category: 'Sedan' },
    { id: "67937323f91c5f7f64c80180", category: 'SUV' },
    { id: "67937323f91c5f7f64c80181", category: 'Hatchback' },
    { id: "67937323f91c5f7f64c80182", category: 'Coupe' },
    { id: "67937323f91c5f7f64c80183", category: 'Wagon' },
    { id: "67937323f91c5f7f64c80184", category: 'Convertible' },
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
    const valueToStore = filterType === 'vehicleCategory' 
      ? vehicleCategories.find(vc => vc.category === value)?.id
      : value;
    
    const updatedValues = filters[filterType].includes(valueToStore)
      ? filters[filterType].filter(item => item !== valueToStore)
      : [...filters[filterType], valueToStore];
    
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
        <div className='filter-title'>
          <img src={filterLogo} alt="" />
          <h2>Filters</h2>
        </div>
        <button onClick={handleClearFilters} className="clear-filters">
          CLEAR ALL FILTERS
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <div className="filter-title" onClick={() => toggleSection('price')}>
            <h3>PRICE RANGE</h3>
            <span className={`chevron ${openSections.includes('price') ? 'open' : ''}`}>
              <img src={rightArrow}/>
            </span>
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
            <span className={`chevron ${openSections.includes('transmission') ? 'open' : ''}`}>
              <img src={rightArrow}/>
            </span>
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
            <span className={`chevron ${openSections.includes('fuel') ? 'open' : ''}`}>
              <img src={rightArrow}/>
            </span>
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
            <span className={`chevron ${openSections.includes('seats') ? 'open' : ''}`}>
              <img src={rightArrow}/>
            </span>
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
            <span className={`chevron ${openSections.includes('category') ? 'open' : ''}`}>
            <img src={rightArrow}/>
              
            </span>
          </div>
          {openSections.includes('category') && (
            <div className="filter-options">
              {vehicleCategories.map((item) => (
                <label key={item.id} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={filters.vehicleCategory.includes(item.id)}
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
