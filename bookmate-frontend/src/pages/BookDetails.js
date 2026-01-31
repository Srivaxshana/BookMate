import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaHeart, FaArrowLeft } from 'react-icons/fa';
import StarRating from '../components/StarRating';

const BookDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
    if (user) {
      fetchUserRating();
    }
  }, [id, user]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      setBook(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/ratings/book/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await axios.get(
        `/api/ratings/user/${user.id}/book/${id}`
      );
      setUserRating(response.data.rating);
      setReviewText(response.data.review || '');
    } catch (error) {
      setUserRating(0);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/cart', {
        userId: user.id,
        bookId: book.id,
        quantity: 1
      });
      alert('Book added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add book to cart');
    }
  };

  const handleSubmitRating = async (rating) => {
    if (!user) {
      alert('Please login to rate books');
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/ratings', {
        userId: user.id,
        bookId: book.id,
        rating: rating,
        review: reviewText
      });
      setUserRating(rating);
      alert('Thank you for your rating!');
      fetchBookDetails();
      fetchReviews();
      setShowRating(false);
    } catch (error) {
      console.error('Error rating book:', error);
      alert('Failed to submit rating');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <h3>Book not found</h3>
        <button className="btn btn-primary-custom mt-3" onClick={() => navigate('/books')}>
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('/books')}>
        <FaArrowLeft /> Back to Books
      </button>

      <div className="row">
        <div className="col-md-4">
          <img 
            src={book.coverImageUrl || 'https://via.placeholder.com/400x600?text=No+Image'} 
            alt={book.title}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-8">
          <h1 className="mb-3">{book.title}</h1>
          <h4 className="text-muted mb-4">by {book.author}</h4>

          <div className="mb-3">
            <span className="badge bg-primary me-2">{book.genre}</span>
            <span className="badge bg-secondary">ISBN: {book.isbn}</span>
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <FaStar color="#ffc107" size={24} />
              <span className="ms-2 fs-5">{book.rating.toFixed(1)}</span>
              <span className="ms-2 text-muted">({reviews.length} reviews)</span>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-danger">${book.price}</h2>
            <p className="text-muted">
              {book.stock > 0 ? (
                <span className="text-success fw-bold">{book.stock} in stock</span>
              ) : (
                <span className="text-danger fw-bold">Out of stock</span>
              )}
            </p>
          </div>

          <div className="mb-4">
            <h5>Description</h5>
            <p>{book.description || 'No description available.'}</p>
          </div>

          <div className="mb-4">
            <button 
              className="btn btn-primary-custom btn-lg me-3"
              onClick={handleAddToCart}
              disabled={book.stock === 0}
            >
              <FaHeart className="me-2" />
              {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {user && (
              <button 
                className="btn btn-outline-warning btn-lg"
                onClick={() => setShowRating(!showRating)}
              >
                <FaStar className="me-2" />
                {userRating > 0 ? 'Update Rating' : 'Rate this Book'}
              </button>
            )}
          </div>

          {showRating && user && (
            <div className="card p-4 mb-4">
              <h5 className="mb-3">Rate & Review</h5>
              <div className="mb-3">
                <label className="form-label">Your Rating</label>
                <StarRating rating={userRating} onRate={handleSubmitRating} />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Review (Optional)</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                ></textarea>
              </div>
              <button 
                className="btn btn-primary-custom"
                onClick={() => handleSubmitRating(userRating)}
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">Customer Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first to review this book!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <StarRating rating={review.rating} readonly={true} />
                    <span className="ms-3 text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.review && (
                    <p className="mb-0">{review.review}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
