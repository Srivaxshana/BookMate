import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
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
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="container text-center text-white py-5">
          <h1 className="display-4 fw-bold mb-3">Get In Touch</h1>
          <p className="lead">We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      {/* Contact Info Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="contact-info-card text-center p-4">
                <FaPhone size={40} className="mb-3 text-primary" />
                <h5>Call Us</h5>
                <p className="text-muted mb-0">+94 (77) 123-4567</p>
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
                <p className="text-muted mb-0">24 Brown Road</p>
                <p className="text-muted">Jaffna, Sri Lanka</p>
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
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h2 className="text-center mb-4">Send Us a Message</h2>
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
                          placeholder="Sri Vaxshana"
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
                          placeholder="sri@gmail.com"
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
                        rows="6"
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
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Find Us Here</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How long does shipping take?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.
                    </div>
                  </div>
                </div>

                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      What is your return policy?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We offer a 30-day return policy for all books in original condition. Simply contact our support team to initiate a return.
                    </div>
                  </div>
                </div>

                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Do you offer international shipping?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes! We ship to over 100 countries worldwide. International shipping times vary by location.
                    </div>
                  </div>
                </div>

                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      How can I track my order?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Once your order ships, you'll receive a tracking number via email. You can track your order in your account dashboard.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-5">
        <div className="container text-center">
          <h3 className="mb-4">Follow Us On Social Media</h3>
          <div className="social-icons">
            <a href="#" className="social-icon facebook">
              <FaFacebook size={30} />
            </a>
            <a href="#" className="social-icon twitter">
              <FaTwitter size={30} />
            </a>
            <a href="#" className="social-icon instagram">
              <FaInstagram size={30} />
            </a>
            <a href="#" className="social-icon linkedin">
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
