import React from 'react';
import { FaBook, FaUsers, FaShippingFast, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container text-center text-white py-5">
          <h1 className="display-4 fw-bold mb-3">About BookMate</h1>
          <p className="lead">Your trusted partner in discovering great reads</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600" 
                alt="Bookstore"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">Our Story</h2>
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
              <p className="text-muted">
                Today, we serve thousands of readers worldwide, offering not just books, 
                but a complete reading experience with personalized recommendations, 
                community reviews, and exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose BookMate?</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaBook size={50} className="mb-3 text-primary" />
                <h5>Vast Collection</h5>
                <p className="text-muted">
                  Access thousands of books across all genres and categories
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaShippingFast size={50} className="mb-3 text-success" />
                <h5>Fast Delivery</h5>
                <p className="text-muted">
                  Quick and reliable shipping to your doorstep
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaUsers size={50} className="mb-3 text-warning" />
                <h5>Community</h5>
                <p className="text-muted">
                  Join a thriving community of passionate readers
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card text-center p-4">
                <FaAward size={50} className="mb-3 text-danger" />
                <h5>Quality Service</h5>
                <p className="text-muted">
                  Award-winning customer support and satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="mb-3">Our Mission</h3>
                  <p className="text-muted">
                    To inspire and empower readers by providing easy access to quality books 
                    and fostering a love for reading in communities around the world. We strive 
                    to make every book purchase an enjoyable and enriching experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="mb-3">Our Vision</h3>
                  <p className="text-muted">
                    To become the world's most trusted and beloved online bookstore, where 
                    readers discover their next favorite book and authors connect with their 
                    audience. We envision a world where everyone has access to the transformative 
                    power of books.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card team-card text-center">
                <img 
                  src="https://i.pravatar.cc/200?img=12" 
                  alt="Team Member"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5>Sarah Johnson</h5>
                  <p className="text-muted mb-0">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card team-card text-center">
                <img 
                  src="https://i.pravatar.cc/200?img=33" 
                  alt="Team Member"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5>Michael Chen</h5>
                  <p className="text-muted mb-0">Head of Operations</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card team-card text-center">
                <img 
                  src="https://i.pravatar.cc/200?img=45" 
                  alt="Team Member"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5>Emily Rodriguez</h5>
                  <p className="text-muted mb-0">Chief Curator</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="card team-card text-center">
                <img 
                  src="https://i.pravatar.cc/200?img=68" 
                  alt="Team Member"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5>David Kim</h5>
                  <p className="text-muted mb-0">Customer Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
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
    </div>
  );
};

export default About;
