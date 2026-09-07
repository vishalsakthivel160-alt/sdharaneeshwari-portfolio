const handleContactForm = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !name.trim() || !email || !email.trim() || !subject || !subject.trim() || !message || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, email, subject, message) are required.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  // Log contact form submission
  console.log('Contact form submission received:', {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    message: 'Thank you for your message, S. Dharaneeshwari will get back to you soon!'
  });
};

module.exports = {
  handleContactForm
};
