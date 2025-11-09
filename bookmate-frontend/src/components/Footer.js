// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="footer-custom">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4 mb-3">
//             <h5>BookMate</h5>
//             <p>Your trusted destination for quality books and literature.</p>
//           </div>
//           <div className="col-md-4 mb-3">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="/">Home</a></li>
//               <li><a href="/books">Books</a></li>
//               <li><a href="/about">About Us</a></li>
//               <li><a href="/contact">Contact</a></li>
//             </ul>
//           </div>
//           <div className="col-md-4 mb-3">
//             <h5>Contact</h5>
//             <p>info@bookmate.com</p>
//             <p>+1 (555) 123-4567</p>
//             <p>123 Book Street, NYC</p>
//           </div>
//         </div>
//         <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
//         <div className="text-center">
//           <p>&copy; 2025 BookMate. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>BookMate</h5>
            <p>Your trusted destination for quality books and literature.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/books">Books</Link></li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>info@bookmate.com</p>
            <p>+1 (555) 123-4567</p>
            <p>123 Book Street, NYC</p>
          </div>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
        <div className="text-center">
          <p>&copy; 2025 BookMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

