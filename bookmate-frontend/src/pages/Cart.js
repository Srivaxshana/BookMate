// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Cart = ({ user }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [books, setBooks] = useState({});

//   useEffect(() => {
//     if (user) {
//       fetchCartItems();
//     }
//   }, [user]);

//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/cart/${user.id}`);
//       setCartItems(response.data);
      
//       // Fetch book details for each cart item
//       response.data.forEach(item => fetchBookDetails(item.bookId));
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//     }
//   };

//   const fetchBookDetails = async (bookId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
//       setBooks(prev => ({ ...prev, [bookId]: response.data }));
//     } catch (error) {
//       console.error('Error fetching book details:', error);
//     }
//   };

//   const handleRemoveFromCart = async (cartItemId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`);
//       fetchCartItems();
//       alert('Item removed from cart');
//     } catch (error) {
//       console.error('Error removing from cart:', error);
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const book = books[item.bookId];
//       return total + (book ? book.price * item.quantity : 0);
//     }, 0).toFixed(2);
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4">Shopping Cart</h2>
      
//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <h4>Your cart is empty</h4>
//           <p>Start browsing to add books!</p>
//         </div>
//       ) : (
//         <>
//           {cartItems.map(item => {
//             const book = books[item.bookId];
//             return book ? (
//               <div key={item.id} className="cart-item">
//                 <div className="row align-items-center">
//                   <div className="col-md-2">
//                     <img 
//                       src={book.coverImageUrl || 'https://via.placeholder.com/150'} 
//                       alt={book.title}
//                       className="img-fluid"
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <h5>{book.title}</h5>
//                     <p className="text-muted">{book.author}</p>
//                   </div>
//                   <div className="col-md-2">
//                     <p className="mb-0">${book.price}</p>
//                   </div>
//                   <div className="col-md-2">
//                     <p className="mb-0">Qty: {item.quantity}</p>
//                   </div>
//                   <div className="col-md-2 text-end">
//                     <button 
//                       className="btn btn-danger-custom btn-sm"
//                       onClick={() => handleRemoveFromCart(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : null;
//           })}
          
//           <div className="mt-4 text-end">
//             <h4>Total: ${calculateTotal()}</h4>
//             <button className="btn btn-primary-custom btn-lg mt-3">
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [books, setBooks] = useState({});

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart/${user.id}`);
      setCartItems(response.data);
      
      // Fetch book details for each cart item
      response.data.forEach(item => fetchBookDetails(item.bookId));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`/api/books/${bookId}`);
      setBooks(prev => ({ ...prev, [bookId]: response.data }));
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleQuantityChange = async (cartItem, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.put(`/api/cart/${cartItem.id}`, {
        ...cartItem,
        quantity: newQuantity
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`);
      fetchCartItems();
      alert('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const book = books[item.bookId];
      return total + (book ? book.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h4>Your cart is empty</h4>
          <p>Start browsing to add books!</p>
        </div>
      ) : (
        <>
          {cartItems.map(item => {
            const book = books[item.bookId];
            return book ? (
              <div key={item.id} className="cart-item">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={book.coverImageUrl || 'https://via.placeholder.com/150'} 
                      alt={book.title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-3">
                    <h5>{book.title}</h5>
                    <p className="text-muted">{book.author}</p>
                  </div>
                  <div className="col-md-2">
                    <p className="mb-0">${book.price}</p>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <p className="mb-2 fw-bold">${(book.price * item.quantity).toFixed(2)}</p>
                    <button 
                      className="btn btn-danger-custom btn-sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : null;
          })}
          
          <div className="mt-4 text-end">
            <h4>Total: ${calculateTotal()}</h4>
            <button className="btn btn-primary-custom btn-lg mt-3">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
