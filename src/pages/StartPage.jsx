import React, { useState, useEffect } from "react";
import RentAcLogo from "../assets/images/Logo.svg";
import "../scss/sections/_startPage.scss";
import "../scss/layout/_layouts.scss";
import ReusableButton from "../components/ReusableButton";
import CarImageStart from "../assets/images/CarImageStartP.svg";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from 'axios';

export default function StartPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3011/reviews');
      const reviewsArray = response.data.reviews || [];
      setReviews(reviewsArray);
      setLoading(false);
    } catch (err) {
      setError('Failed to load reviews');
      setLoading(false);
    }
  };

  const handleTransition = (e, path) => {
    e.preventDefault();
    
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    
    const logo = document.createElement('div');
    logo.className = 'transition-logo';
    logo.innerHTML = `
      <span>
        <span class="drive">Drive</span><span class="hub">hub</span>
      </span>
    `;
    overlay.appendChild(logo);
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      navigate(path);
      
      overlay.style.animation = 'pageTransitionIn 1.5s ease-in-out forwards';
      overlay.style.transformOrigin = 'top';
      
      setTimeout(() => {
        overlay.remove();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="startPage container">
      <header>
        <div className="logo">
          <img src={RentAcLogo} alt="" />
        </div>
        <nav>
          <Link to="/signup" onClick={(e) => handleTransition(e, '/signup')}>
            <ReusableButton padding="9px 18px">Sign up</ReusableButton>
          </Link>
        </nav>
      </header>
      <section className="getStarted">
        <div className="flexImgText">
          <div className="CarImageStart">
            <img src={CarImageStart} alt="" />
          </div>
          <div className="gSTexts">
            <h1>
              Need a car? <br /> Rent it quickly now!
            </h1>
            <p>You can choose your ideal car and book it easily.</p>
            <div className="gSBtn">
              <Link to="/signin" onClick={(e) => handleTransition(e, '/signin')}>
                <ReusableButton padding="9px 31px">Let's Go</ReusableButton>
              </Link>
            </div>
          </div>
        </div>

        <div className="whatDWO">
          <h2>What do we offer</h2>

          <div className="textBoxCtn">
            <div className="textBox"> 
                Discover a wide range of vehicles, from spacious SUVs to versatile sedans, perfect for any trip.
            </div>
            <div className="textBox">
                Indulge in unmatched luxury and performance with our premium high-end vehicle selection.
            </div>
          </div>
        </div>

        <div className="reviews-section animate-fade-in">
          <h2>What Our Customers Say</h2>
          {loading ? (
            <p className="loading">Loading reviews...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : reviews && reviews.length > 0 ? (
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div 
                  key={review._id} 
                  className="review-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="review-header">
                    <h3>{review.username}</h3>
                    <div className="rating">
                      {[...Array(parseInt(review.rating))].map((_, index) => (
                        <span key={index} className="star">★</span>
                      ))}
                      {[...Array(5 - parseInt(review.rating))].map((_, index) => (
                        <span key={index + parseInt(review.rating)} className="star-empty">☆</span>
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
