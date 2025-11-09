import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    isbn: '',
    genre: '',
    description: '',
    coverImageUrl: '',
    rating: 0
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axios.put(`http://localhost:8081/api/books/${editingBook.id}`, formData);
        alert('Book updated successfully!');
      } else {
        await axios.post('http://localhost:8081/api/books', formData);
        alert('Book added successfully!');
      }
      setShowModal(false);
      setEditingBook(null);
      resetForm();
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save book');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData(book);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:8081/api/books/${id}`);
        alert('Book deleted successfully!');
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      price: '',
      stock: '',
      isbn: '',
      genre: '',
      description: '',
      coverImageUrl: '',
      rating: 0
    });
  };

  const handleAddNew = () => {
    resetForm();
    setEditingBook(null);
    setShowModal(true);
  };

  const stats = {
    totalBooks: books.length,
    totalSales: 12345,
    lowStock: books.filter(b => b.stock < 10).length
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <p className="text-muted mb-4">Manage your bookstore inventory</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card dashboard-card stat-card">
            <div className="stat-value">{stats.totalBooks}</div>
            <div className="stat-label">Total Books</div>
            <small>In inventory</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card stat-card">
            <div className="stat-value">${stats.totalSales}</div>
            <div className="stat-label">Total Sales</div>
            <small>This month</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card stat-card">
            <div className="stat-value">{stats.lowStock}</div>
            <div className="stat-label">Low Stock</div>
            <small>Items below 10</small>
          </div>
        </div>
      </div>

      <div className="card dashboard-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Book Inventory</h4>
            <button className="btn btn-primary-custom" onClick={handleAddNew}>
              + Add Book
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>${book.price}</td>
                    <td>{book.stock}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(book)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBook ? 'Edit Book' : 'Add New Book'}
                </h5>
                <button 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Author</label>
                      <input
                        type="text"
                        className="form-control"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">ISBN</label>
                      <input
                        type="text"
                        className="form-control"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Genre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cover Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="coverImageUrl"
                      value={formData.coverImageUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary-custom">
                      Save Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
