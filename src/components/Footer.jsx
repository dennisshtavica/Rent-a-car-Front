import React, { useState } from 'react'
import "../scss/layout/_footer.scss"
import RentAcLogoWhite from "../assets/images/RentAcLogoWhite.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Footer() {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('Please log in to submit a review');
            return;
        }

        const user = JSON.parse(userStr);
        
        const formattedReview = {
            userId: user.id.toString(),
            username: user.username,
            rating: parseInt(reviewData.rating), 
            comment: reviewData.comment.trim()
        };

        const response = await axios.post('http://localhost:3011/reviews/add', formattedReview, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            alert('Review submitted successfully!');
            setReviewData({ rating: 5, comment: '' });
        }
    } catch (error) {
        console.error('Error details:', error.response?.data || error);
        alert('Failed to submit review. Please try again.');
    }
};

  return (
    <footer>
        <div>
            <div className='footerlinks'>
                <img src={RentAcLogoWhite} alt="" />
                <Link>Home</Link>
                <Link>Contact</Link>
                <Link>Rented</Link>
            </div>
            <div className='terms'>
              <p>Privacy</p>
              <p>Terms of use</p>
              <p>Acceptable Use Policy</p>
              <p>Software Lifecycle Policy</p>
            </div>
            
            <div className='review-form'>
              <h3>Submit a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="rating-input">
                  <label>Rating:</label>
                  <select
                    value={reviewData.rating}
                    onChange={(e) => setReviewData({
                      ...reviewData,
                      rating: Number(e.target.value)
                    })}
                    required
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
                
                <div className="comment-input">
                  <label>Comment:</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({
                      ...reviewData,
                      comment: e.target.value
                    })}
                    placeholder="Write your review here..."
                    required
                  />
                </div>
                
                <button type="submit">Submit Review</button>
              </form>
            </div>
        </div>
    </footer>
  )
}
