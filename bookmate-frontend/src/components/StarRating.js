
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, onRate, readonly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="star-button"
          onClick={() => !readonly && onRate(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
          style={{ 
            cursor: readonly ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            padding: '2px',
            outline: 'none'
          }}
        >
          {star <= (hover || rating) ? (
            <FaStar color="#ffc107" size={24} />
          ) : (
            <FaRegStar color="#ffc107" size={24} />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
