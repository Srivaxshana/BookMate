// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Hero from '../components/Hero';
// // import BookCard from '../components/BookCard';

// // const Home = () => {
// //   const [featuredBooks, setFeaturedBooks] = useState([]);

// //   useEffect(() => {
// //     fetchFeaturedBooks();
// //   }, []);

// //   const fetchFeaturedBooks = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:8080/api/books');
// //       setFeaturedBooks(response.data.slice(0, 4));
// //     } catch (error) {
// //       console.error('Error fetching books:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Hero />
      
// //       <section className="py-5">
// //         <div className="container">
// //           <h2 className="text-center mb-4">Featured Books</h2>
// //           <p className="text-center text-muted mb-5">Handpicked selections for book lovers</p>
// //           <div className="row">
// //             {featuredBooks.map(book => (
// //               <BookCard key={book.id} book={book} />
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //     </div>
// //   );
// // };

// // export default Home;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Hero from '../components/Hero';
// import BookCard from '../components/BookCard';
// import { FaBook, FaUsers, FaShippingFast, FaAward, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

// const Home = () => {
//   const [featuredBooks, setFeaturedBooks] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   useEffect(() => {
//     fetchFeaturedBooks();
//   }, []);

//   const fetchFeaturedBooks = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/books');
//       setFeaturedBooks(response.data.slice(0, 4));
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Thank you for contacting us! We will get back to you soon.');
//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: ''
//     });
//   };

//   return (
//     <div>
//       <Hero />
      
//       {/* Featured Books Section */}
//       <section className="py-5">
//         <div className="container">
//           <h2 className="text-center mb-4">Featured Books</h2>
//           <p className="text-center text-muted mb-5">Handpicked selections for book lovers</p>
//           <div className="row">
//             {featuredBooks.map(book => (
//               <BookCard key={book.id} book={book} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section id="about" className="py-5 bg-light">
//         <div className="container">
//           <h2 className="text-center mb-5">About BookMate</h2>
          
//           {/* Features */}
//           <div className="row mb-5">
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="feature-card text-center p-4">
//                 <FaBook size={50} className="mb-3 text-primary" />
//                 <h5>Vast Collection</h5>
//                 <p className="text-muted">Access thousands of books across all genres and categories</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="feature-card text-center p-4">
//                 <FaShippingFast size={50} className="mb-3 text-success" />
//                 <h5>Fast Delivery</h5>
//                 <p className="text-muted">Quick and reliable shipping to your doorstep</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="feature-card text-center p-4">
//                 <FaUsers size={50} className="mb-3 text-warning" />
//                 <h5>Community</h5>
//                 <p className="text-muted">Join a thriving community of passionate readers</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="feature-card text-center p-4">
//                 <FaAward size={50} className="mb-3 text-danger" />
//                 <h5>Quality Service</h5>
//                 <p className="text-muted">Award-winning customer support and satisfaction</p>
//               </div>
//             </div>
//           </div>

//           {/* Our Story */}
//           <div className="row align-items-center mt-5">
//             <div className="col-md-6 mb-4 mb-md-0">
//               <img 
//                 src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600" 
//                 alt="Bookstore"
//                 className="img-fluid rounded shadow"
//               />
//             </div>
//             <div className="col-md-6">
//               <h3 className="mb-4">Our Story</h3>
//               <p className="text-muted">
//                 Founded in 2020, BookMate began with a simple mission: to connect readers 
//                 with the books they love. What started as a small online bookstore has grown 
//                 into a thriving community of book lovers.
//               </p>
//               <p className="text-muted">
//                 We believe that every book has the power to change lives, spark imagination, 
//                 and bring people together. Our carefully curated collection spans all genres, 
//                 from timeless classics to contemporary bestsellers.
//               </p>
//               <p className="text-muted mb-0">
//                 Today, we serve thousands of readers worldwide, offering not just books, 
//                 but a complete reading experience with personalized recommendations, 
//                 community reviews, and exceptional customer service.
//               </p>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="row text-center mt-5">
//             <div className="col-md-3 col-6 mb-4">
//               <div className="stat-box">
//                 <h2 className="stat-number">50K+</h2>
//                 <p className="text-muted">Books Available</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-6 mb-4">
//               <div className="stat-box">
//                 <h2 className="stat-number">100K+</h2>
//                 <p className="text-muted">Happy Readers</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-6 mb-4">
//               <div className="stat-box">
//                 <h2 className="stat-number">500K+</h2>
//                 <p className="text-muted">Books Sold</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-6 mb-4">
//               <div className="stat-box">
//                 <h2 className="stat-number">4.8★</h2>
//                 <p className="text-muted">Customer Rating</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Us Section */}
//       <section id="contact" className="py-5">
//         <div className="container">
//           <h2 className="text-center mb-5">Contact Us</h2>
          
//           {/* Contact Info Cards */}
//           <div className="row mb-5">
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="contact-info-card text-center p-4">
//                 <FaPhone size={40} className="mb-3 text-primary" />
//                 <h5>Call Us</h5>
//                 <p className="text-muted mb-0">+1 (555) 123-4567</p>
//                 <p className="text-muted">Mon-Fri 9am-6pm</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="contact-info-card text-center p-4">
//                 <FaEnvelope size={40} className="mb-3 text-success" />
//                 <h5>Email Us</h5>
//                 <p className="text-muted mb-0">info@bookmate.com</p>
//                 <p className="text-muted">support@bookmate.com</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="contact-info-card text-center p-4">
//                 <FaMapMarkerAlt size={40} className="mb-3 text-danger" />
//                 <h5>Visit Us</h5>
//                 <p className="text-muted mb-0">123 Book Street</p>
//                 <p className="text-muted">New York, NY 10001</p>
//               </div>
//             </div>
//             <div className="col-md-3 col-sm-6 mb-4">
//               <div className="contact-info-card text-center p-4">
//                 <FaClock size={40} className="mb-3 text-warning" />
//                 <h5>Working Hours</h5>
//                 <p className="text-muted mb-0">Mon-Fri: 9am-6pm</p>
//                 <p className="text-muted">Sat-Sun: 10am-4pm</p>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="row">
//             <div className="col-lg-8 mx-auto">
//               <div className="card shadow-lg border-0">
//                 <div className="card-body p-5">
//                   <h3 className="text-center mb-4">Send Us a Message</h3>
//                   <form onSubmit={handleSubmit}>
//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Full Name *</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleChange}
//                           placeholder="John Doe"
//                           required
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Email Address *</label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           placeholder="john@example.com"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Subject *</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleChange}
//                         placeholder="How can we help you?"
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label className="form-label">Message *</label>
//                       <textarea
//                         className="form-control"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         rows="5"
//                         placeholder="Tell us more about your inquiry..."
//                         required
//                       ></textarea>
//                     </div>
//                     <button type="submit" className="btn btn-primary-custom btn-lg w-100">
//                       Send Message
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import { FaBook, FaUsers, FaShippingFast, FaAward, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      // Use dynamic API URL based on current host
      const apiUrl = `http://${window.location.hostname}:8081/api/books`;
      const response = await axios.get(apiUrl);
      setFeaturedBooks(response.data.slice(0, 4));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div>
      <Hero />
      
      {/* Featured Books Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Books</h2>
          <p className="text-center text-muted mb-5">Handpicked selections for book lovers</p>
          <div className="row">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">About BookMate</h2>
          
          {/* Features */}
          <div className="row mb-5">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaBook size={50} className="mb-3 text-primary" />
                <h5>Vast Collection</h5>
                <p className="text-muted">Access thousands of books across all genres and categories</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaShippingFast size={50} className="mb-3 text-success" />
                <h5>Fast Delivery</h5>
                <p className="text-muted">Quick and reliable shipping to your doorstep</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaUsers size={50} className="mb-3 text-warning" />
                <h5>Community</h5>
                <p className="text-muted">Join a thriving community of passionate readers</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaAward size={50} className="mb-3 text-danger" />
                <h5>Quality Service</h5>
                <p className="text-muted">Award-winning customer support and satisfaction</p>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="row align-items-center mt-5">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600" 
                alt="Bookstore"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h3 className="mb-4">Our Story</h3>
              <p className="text-muted">
                Founded in 2020, BookMate began with a simple mission: to connect readers 
                with the books they love. What started as a small online bookstore has grown 
                into a thriving community of book lovers.
              </p>
              <p className="text-muted">
                We believe that every book has the power to change lives, spark imagination, 
                and bring people together. Our carefully curated collection spans all genres, 
                from timeless classics to contemporary bestsellers.
              </p>
              <p className="text-muted mb-0">
                Today, we serve thousands of readers worldwide, offering not just books, 
                but a complete reading experience with personalized recommendations, 
                community reviews, and exceptional customer service.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="row text-center mt-5">
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-box">
                <h2 className="stat-number">50K+</h2>
                <p className="text-muted">Books Available</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-box">
                <h2 className="stat-number">100K+</h2>
                <p className="text-muted">Happy Readers</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-box">
                <h2 className="stat-number">500K+</h2>
                <p className="text-muted">Books Sold</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-box">
                <h2 className="stat-number">4.8★</h2>
                <p className="text-muted">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Contact Us</h2>
          
          {/* Contact Info Cards */}
          <div className="row mb-5">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="contact-info-card text-center p-4">
                <FaPhone size={40} className="mb-3 text-primary" />
                <h5>Call Us</h5>
                <p className="text-muted mb-0">+1 (555) 123-4567</p>
                <p className="text-muted">Mon-Fri 9am-6pm</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="contact-info-card text-center p-4">
                <FaEnvelope size={40} className="mb-3 text-success" />
                <h5>Email Us</h5>
                <p className="text-muted mb-0">info@bookmate.com</p>
                <p className="text-muted">support@bookmate.com</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="contact-info-card text-center p-4">
                <FaMapMarkerAlt size={40} className="mb-3 text-danger" />
                <h5>Visit Us</h5>
                <p className="text-muted mb-0">123 Book Street</p>
                <p className="text-muted">New York, NY 10001</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="contact-info-card text-center p-4">
                <FaClock size={40} className="mb-3 text-warning" />
                <h5>Working Hours</h5>
                <p className="text-muted mb-0">Mon-Fri: 9am-6pm</p>
                <p className="text-muted">Sat-Sun: 10am-4pm</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h3 className="text-center mb-4">Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Subject *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary-custom btn-lg w-100">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="row">
            <div className="col-12">
              <h3 className="text-center mb-4">Find Us Here</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BookMate Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
