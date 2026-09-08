require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for production deployment (supports Vercel frontend domain via FRONTEND_URL/ALLOWED_ORIGINS or allows all)
const allowedOrigins = process.env.FRONTEND_URL || process.env.ALLOWED_ORIGINS;
const corsOptions = {
  origin: allowedOrigins && allowedOrigins !== '*'
    ? allowedOrigins.split(',').map(url => url.trim())
    : '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


