import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../scss/sections/_contactPage.scss';
import Footer from '../components/Footer';

export default function ContactPage() {
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <SignIn />;
    }

    function openMap(address) {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
      const closeMenu = () => {
        setIsOpen(false);
      };
    


    return (
        <>
            <div className="mainPage container">
                <Header isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} closeMenu={() => setIsOpen(false)} />
            </div>
            <div className="contact container">
                <h2 className="animate-fade-in">Contact Us</h2>
                <div className="section animate-slide-in">
                    <div className="circle pulse">
                        <FontAwesomeIcon icon={faLocationDot} className="icon bounce" />
                    </div>
                    <div className="info">
                        <p className="text">Address:</p>
                        <a onClick={() => openMap('123 Main Street, City, State, Zip')}
                           className="dummy-text hover-effect">123 Main Street, City, State, Zip</a>
                    </div>
                </div>
                <div className="section animate-slide-in" style={{animationDelay: '0.2s'}}>
                    <div className="circle pulse">
                        <FontAwesomeIcon icon={faPhone} className="icon bounce" />
                    </div>
                    <div className="info">
                        <p className="text">Phone:</p>
                        <a href="tel:+15551234567" className="dummy-text hover-effect">+1 (555) 123-4567</a>
                    </div>
                </div>
                <div className="section animate-slide-in" style={{animationDelay: '0.4s'}}>
                    <div className="circle pulse">
                        <FontAwesomeIcon icon={faEnvelope} className="icon bounce" />
                    </div>
                    <div className="info">
                        <p className="text">Email:</p>
                        <a href="mailto:contact@rentacarapp.com" className="dummy-text hover-effect">contact@rentacarapp.com</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

