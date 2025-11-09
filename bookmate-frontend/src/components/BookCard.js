// // // import React from 'react';
// // // import { FaStar } from 'react-icons/fa';

// // // const BookCard = ({ book, onAddToCart, user }) => {
// // //   return (
// // //     <div className="col-md-3 col-sm-6 mb-4">
// // //       <div className="card book-card">
// // //         <img 
// // //           src={book.coverImageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} 
// // //           className="card-img-top" 
// // //           alt={book.title} 
// // //         />
// // //         <div className="card-body book-card-body">
// // //           <h5 className="book-title">{book.title}</h5>
// // //           <p className="book-author">{book.author}</p>
// // //           <div className="rating mb-2">
// // //             <FaStar /> {book.rating} ({book.stock} in stock)
// // //           </div>
// // //           <p className="book-price">${book.price}</p>
// // //           {user && (
// // //             <button 
// // //               className="btn btn-primary-custom w-100"
// // //               onClick={() => onAddToCart(book)}
// // //               disabled={book.stock === 0}
// // //             >
// // //               {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BookCard;


// // import React, { useState } from 'react';
// // import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';

// // const BookCard = ({ book, onAddToCart, user }) => {
// //   const [isAdded, setIsAdded] = useState(false);

// //   const handleAddToCart = (book) => {
// //     onAddToCart(book);
// //     setIsAdded(true);
// //   };

// //   return (
// //     <div className="col-md-3 col-sm-6 mb-4">
// //       <div className="card book-card">
// //         <img 
// //           src={book.coverImageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} 
// //           className="card-img-top" 
// //           alt={book.title} 
// //         />
// //         <div className="card-body book-card-body">
// //           <h5 className="book-title">{book.title}</h5>
// //           <p className="book-author">{book.author}</p>
// //           <div className="rating mb-2">
// //             <FaStar /> {book.rating} ({book.stock} in stock)
// //           </div>
// //           <p className="book-price">${book.price}</p>
// //           {user && (
// //             <button 
// //               className="btn btn-primary-custom w-100"
// //               onClick={() => handleAddToCart(book)}
// //               disabled={book.stock === 0}
// //             >
// //               {isAdded ? <FaHeart className="me-2" /> : <FaRegHeart className="me-2" />}
// //               {book.stock === 0 ? 'Out of Stock' : isAdded ? 'Added' : 'Add to Cart'}
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookCard;


// import React, { useState, useEffect } from 'react';
// import { FaStar, FaHeart } from 'react-icons/fa';
// import StarRating from './StarRating';
// import axios from 'axios';

// const BookCard = ({ book, onAddToCart, user }) => {
//   const [showRating, setShowRating] = useState(false);
//   const [userRating, setUserRating] = useState(0);

//   useEffect(() => {
//     if (user) {
//       fetchUserRating();
//     }
//   }, [user, book.id]);

//   const fetchUserRating = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/ratings/user/${user.id}/book/${book.id}`
//       );
//       setUserRating(response.data.rating);
//     } catch (error) {
//       // User hasn't rated this book yet
//       setUserRating(0);
//     }
//   };

//   const handleRate = async (rating) => {
//     if (!user) {
//       alert('Please login to rate books');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:8080/api/ratings', {
//         userId: user.id,
//         bookId: book.id,
//         rating: rating,
//         review: ''
//       });
//       setUserRating(rating);
//       alert('Thank you for rating!');
//       setShowRating(false);
//       // Refresh page to show updated rating
//       window.location.reload();
//     } catch (error) {
//       console.error('Error rating book:', error);
//       alert('Failed to submit rating');
//     }
//   };

//   return (
//     <div className="col-md-3 col-sm-6 mb-4">
//       <div className="card book-card">
//         <img 
//           src={book.coverImageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} 
//           className="card-img-top" 
//           alt={book.title} 
//         />
//         <div className="card-body book-card-body">
//           <h5 className="book-title">{book.title}</h5>
//           <p className="book-author">{book.author}</p>
          
//           <div className="rating mb-2">
//             <FaStar /> {book.rating.toFixed(1)} ({book.stock} in stock)
//           </div>

//           {user && (
//             <div className="mb-2">
//               {userRating > 0 ? (
//                 <small className="text-success">Your rating: {userRating} ⭐</small>
//               ) : (
//                 <button 
//                   className="btn btn-sm btn-outline-warning w-100 mb-2"
//                   onClick={() => setShowRating(!showRating)}
//                 >
//                   Rate this book
//                 </button>
//               )}
              
//               {showRating && (
//                 <div className="text-center mt-2">
//                   <StarRating rating={userRating} onRate={handleRate} />
//                 </div>
//               )}
//             </div>
//           )}

//           <p className="book-price">${book.price}</p>
          
//           {user && (
//             <button 
//               className="btn btn-primary-custom w-100"
//               onClick={() => onAddToCart(book)}
//               disabled={book.stock === 0}
//             >
//               <FaHeart className="me-2" />
//               {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import StarRating from './StarRating';
import axios from 'axios';

const BookCard = ({ book, onAddToCart, user }) => {
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserRating();
    }
  }, [user, book.id]);

  const fetchUserRating = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/ratings/user/${user.id}/book/${book.id}`
      );
      setUserRating(response.data.rating);
    } catch (error) {
      setUserRating(0);
    }
  };

  const handleRate = async (rating) => {
    if (!user) {
      alert('Please login to rate books');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/ratings', {
        userId: user.id,
        bookId: book.id,
        rating: rating,
        review: ''
      });
      setUserRating(rating);
      alert('Thank you for rating!');
      setShowRating(false);
      window.location.reload();
    } catch (error) {
      console.error('Error rating book:', error);
      alert('Failed to submit rating');
    }
  };

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking buttons
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card book-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img 
          src={book.coverImageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} 
          className="card-img-top" 
          alt={book.title} 
        />
        <div className="card-body book-card-body">
          <h5 className="book-title">{book.title}</h5>
          <p className="book-author">{book.author}</p>
          
          <div className="rating mb-2">
            <FaStar /> {book.rating.toFixed(1)} ({book.stock} in stock)
          </div>

          {user && (
            <div className="mb-2" onClick={handleButtonClick}>
              {userRating > 0 ? (
                <small className="text-success">Your rating: {userRating} ⭐</small>
              ) : (
                <button 
                  className="btn btn-sm btn-outline-warning w-100 mb-2"
                  onClick={() => setShowRating(!showRating)}
                >
                  Rate this book
                </button>
              )}
              
              {showRating && (
                <div className="text-center mt-2">
                  <StarRating rating={userRating} onRate={handleRate} />
                </div>
              )}
            </div>
          )}

          <p className="book-price">${book.price}</p>
          
          {user && (
            <button 
              className="btn btn-primary-custom w-100"
              onClick={(e) => {
                handleButtonClick(e);
                onAddToCart(book);
              }}
              disabled={book.stock === 0}
            >
              <FaHeart className="me-2" />
              {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;



