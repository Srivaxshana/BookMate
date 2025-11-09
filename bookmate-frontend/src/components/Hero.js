import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="container">
        <h1>Discover Your Next Great Read</h1>
        <p>Explore thousands of books across all genres. From timeless classics to modern bestsellers, find your perfect story at BookMate.</p>
        <Link to="/books" className="btn btn-light btn-lg me-2">
          Browse Collection →
        </Link>
        <Link to="/about" className="btn btn-outline-light btn-lg">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Hero;
