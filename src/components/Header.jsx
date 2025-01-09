import React, {useState} from 'react';
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/layout/_header.scss";
import {Link} from "react-router-dom";
import manageBCar from "../assets/images/managebookingscar.svg"
import closeIcon from "../assets/images/close.png";
import userLogout from "../assets/images/userlogout.svg";

export default function Header({isOpen, toggleMenu, closeMenu}) {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/mainPage" className='logoLink'>
                        <img src={RentAcLogo} alt="" />
                        <span>Rentify</span>
                    </Link>
                </div>
                <div className={`burgerBar ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"/>
                    <div className="bar"/>
                </div>
                <div className={`menu ${isOpen ? 'open' : ''}`} >
                <div className="menu-content" onClick={(e) => e.stopPropagation()}>
                    <div className='closeIcon' onClick={closeMenu}>
                        <img src={closeIcon} alt="" />
                    </div>
                    <ul>
                        <li>
                            <Link to="/" className='manageBCar'>
                                <img src={manageBCar} alt="" />
                                <p>Manage bookings</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contactPage">Contact</Link>
                        </li>
                        <li>
                            <Link to="/carsRented">Car Rented</Link>
                        </li>
                        <li>
                            {user ? 
                                <Link className='profile' to="/profile">{user.username}</Link>
                                : (
                                    <div className='loginLink'>
                                        <img src={userLogout} alt="" />
                                        <Link to="/signIn">Login</Link>
                                    </div>
                            )
                            }
                        </li>
                    </ul>
                </div>
            </div>
            </header>
           
        </>
    );
}

