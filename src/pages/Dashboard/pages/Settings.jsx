import React, { useState, useEffect } from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import "../scss/_pages.scss";

// Move DeleteConfirmation outside of Reviews component
const DeleteConfirmation = ({ showDeleteConfirm, setShowDeleteConfirm, selectedReview, onDelete }) => {
  if (!showDeleteConfirm) return null;
  
  return (
    <div className="modal-overlay-delete">
      <div className="modal-content-delete">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review? This action cannot be undone.</p>
        <div className="delete-form-actions">
          <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={() => onDelete(selectedReview._id)} 
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3011/reviews');
        const reviewsData = response.data.reviews || [];
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteClick = (review) => {
    // Reset states before setting new ones
    setShowDeleteConfirm(false);
    setSelectedReview(null);
    
    // Use setTimeout to ensure state is reset before setting new values
    setTimeout(() => {
      setSelectedReview(review);
      setShowDeleteConfirm(true);
    }, 0);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!user || !user.token) {
        console.error("No authentication token found. Please login again.");
        return;
      }

      await axios.delete(`http://localhost:3011/reviews/${reviewId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      setReviews(reviews.filter(review => review._id !== reviewId));
      setShowDeleteConfirm(false);
      setSelectedReview(null);
      
    } catch (error) {
      console.error('Error deleting review:', error);
      alert(error.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaStar className="page-icon" /> Customer Reviews</h1>
      </div>

      <DeleteConfirmation 
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        selectedReview={selectedReview}
        onDelete={handleDeleteReview}
      />

      <div className="reviews-container">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="review-info">
                  <h3>{review.username}</h3>
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, index) => (
                      <FaStar key={index} className="star-icon" />
                    ))}
                  </div>
                  <span className="review-date">{review.createdAt}</span>
                </div>
                <button 
                  type="button"
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent event bubbling
                    handleDeleteClick(review);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
