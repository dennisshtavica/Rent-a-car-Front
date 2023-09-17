import React, {useState} from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_mainPage.scss";
import CarCard from "../components/CarCard";
import Header from "../components/Header";

export default function MainPage(){
    const [selectedValue, setSelectedValue] = useState("");


    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return(
        <div className="mainPage container">
            <Header/>
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