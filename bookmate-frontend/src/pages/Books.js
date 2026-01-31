import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Books = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchQuery, books]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const filterBooks = () => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

//   const handleAddToCart = async (book) => {
    // if (!user) {
    //   alert('Please login to add items to cart');
    //   return;
    // }

    // try {
    //   await axios.post('http://localhost:8080/api/cart', {
        // userId: user.id,
        // bookId: book.id,
        // quantity: 1
    //   });
    //   alert('Book added to cart!');
    // } catch (error) {
    //   console.error('Error adding to cart:', error);
    //   alert('Failed to add book to cart');
    // }
//   };

  const handleAddToCart = async (book) => {
  if (!user) {
    alert('Please login to add items to cart');
    return;
  }

  try {
    await axios.post('/api/cart', {
      userId: user.id,
      bookId: book.id,
      quantity: 1
    });
    alert('Book added to cart! (If already in cart, quantity increased)');
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Failed to add book to cart');
  }
};


  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1>Our Collection</h1>
          <p className="text-muted">Browse through our extensive catalog of books</p>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onAddToCart={handleAddToCart}
                user={user}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">No books found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
