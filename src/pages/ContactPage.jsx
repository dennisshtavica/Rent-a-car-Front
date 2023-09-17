import React from 'react';
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../scss/sections/_contactPage.scss';

export default function ContactPage() {
    function openMap(address) {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    }

    return (
        <div className="contact container">
            <Header/>
            <h2>Contact Us</h2>
            <div className="section">
                <div className="circle">
                    <FontAwesomeIcon icon={faLocationDot} className="icon" />
                </div>
                <div className="info">
                    <p className="text">Address:</p>
                    <a onClick={() => openMap('Bitch Lake, Idaho')}
                       className="dummy-text">123 Main Street, City, State, Zip</a>
                </div>
            </div>
            <div className="section">
                <div className="circle">
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                </div>
                <div>
                    <p className="text">Phone:</p>
                    <a href="tel:+15551234567" className="dummy-text">+1 (555) 123-4567</a>
                </div>
            </div>
            <div className="section">
                <div className="circle">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                </div>
                <div>
                    <p className="text">Email:</p>
                    <a href="mailto:contact@rentacarapp.com" className="dummy-text">contact@rentacarapp.com</a>
                </div>
            </div>

        </div>
    );
}

