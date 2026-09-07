import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      // Backend API URL (supports VITE_API_URL, REACT_APP_BACKEND_URL, or relative /api/contact)
      const backendUrl = (typeof process !== 'undefined' && process.env && (process.env.VITE_API_URL || process.env.REACT_APP_BACKEND_URL)) || '';

      
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatusMsg({ 
        type: 'error', 
        text: 'Unable to connect to the backend server. Please make sure the backend is running.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">Get in touch for freelancing opportunities or inquiries</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-card">
          <div>
            <h3 className="contact-person-name">S. Dharaneeshwari</h3>
            <p className="contact-person-role">Computer Science Engineering Student</p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-detail-label">Phone</div>
                  <a href="tel:9894964401" className="contact-detail-value">
                    9894964401
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <a href="mailto:sdharaneeshwari8@gmail.com" className="contact-detail-value">
                    sdharaneeshwari8@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-detail-label">Location</div>
                  <div className="contact-detail-value">
                    Dindigul, Tamil Nadu, India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          {statusMsg && (
            <div className={`toast-msg ${statusMsg.type}`}>
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject *</label>
              <input
                id="subject"
                type="text"
                name="subject"
                className="form-input"
                placeholder="Subject of your message"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
