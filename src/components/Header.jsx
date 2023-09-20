import React, {useState} from 'react';
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/layout/_header.scss";
import {Link} from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };
    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/mainPage">
                        <img src={RentAcLogo} alt="" />
                    </Link>
                </div>
                <div className={`burgerBar ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"/>
                    <div className="bar"/>
                </div>
            </header>
            <div className={`menu ${isOpen ? 'open' : ''}`} onClick={closeMenu}>
                <div className="menu-content" onClick={(e) => e.stopPropagation()}>
                    <ul>
                        <li> <Link to="/mainPage">Home</Link></li>
                        <li>Contact</li>
                        <li>Car Rented</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

