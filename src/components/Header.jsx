import React, { useState, useEffect } from 'react';
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/layout/_header.scss";
import {Link} from "react-router-dom";
import manageBCar from "../assets/images/managebookingscar.svg"
import closeIcon from "../assets/images/close.png";
import userLogout from "../assets/images/userlogout.svg";
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

export default function Header({isOpen, toggleMenu, closeMenu}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const checkVerificationStatus = async () => {
            if (!user) return;
            
            try {
                const response = await axios.get(
                    'http://localhost:3011/driver-verification/status',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    }
                );
                
                if (response.data.verification && response.data.verification.is_verified) {
                    setIsVerified(true);
                }
            } catch (error) {
                // Don't show error for 404 (no verification found)
                if (error.response?.status !== 404) {
                    console.error('Error checking verification:', error);
                }
            }
        };

        checkVerificationStatus();
    }, [user]);

    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/mainPage" className='logoLink'>
                        <img src={RentAcLogo} alt="" />
                        <span><span className="drive">Drive</span><span className="hub">hub</span></span>
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
                            {user?.role_id === 1 && (
                                <Link to="/dashboard" className='manageBCar'>
                                    <img src={manageBCar} alt="" />
                                    <p>Manage bookings</p>
                                </Link>
                            )}
                            
                        </li>
                        <li>
                            <Link to="/contactPage">Contact</Link>
                        </li>
                        <li>
                            <Link to="/carsRented">Car Rented</Link>
                        </li>
                        <li>
                            {user ? 
                                <Link className='profile' to="/profile">
                                    {user.username}
                                    {isVerified && (
                                        <FaCheckCircle className="header-verified-badge" />
                                    )}
                                </Link>
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

