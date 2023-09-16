import React, {useState} from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_mainPage.scss";
import CarCard from "../components/CarCard";

export default function MainPage(){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return(
        <div className="mainPage container">
            <header>
                <div className="logo">
                    <img src={RentAcLogo} alt="" />
                </div>
                <div className={`burgerBar ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"/>
                    <div className="bar"/>
                </div>
            </header>
            <div className={`menu ${isOpen ? 'open' : ''}`} onClick={closeMenu}>
                <div className="menu-content" onClick={(e) => e.stopPropagation()}>
                    <ul>
                        <li>Home</li>
                        <li>Contact</li>
                        <li>Car Rented</li>
                    </ul>
                </div>
            </div>
            <div className="carFilterWrapper">
                <h2>Drive the Car of your dreams</h2>
                <div className="searchFilters">
                    <div className="BrandFilter">
                        <select
                            id="dropdown"
                            value={selectedValue}
                        >
                            <option value="">Car Brand</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="ModelFilter">
                        <select
                            id="dropdown"
                            value={selectedValue}
                        >
                            <option value="">Car Model</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                </div>
                <button className="searchButton">Search</button>
            </div>
            <div className="carDeals">
                <h2>Popular Cars</h2>
                <CarCard />
                <CarCard />
            </div>
        </div>
    )
}