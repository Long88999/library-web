const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/library_db';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/borrowers', require('./routes/borrowerRoutes'));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Student Info Page
app.get('/about', (req, res) => {
  res.status(200).json({
    fullName: 'Nguyễn Văn A',
    studentId: 'MSV20001',
    class: 'KKDL20',
    school: 'Trường Đại học Bách Khoa',
    appName: process.env.APP_NAME,
    message: 'Library Book Borrowing Registration System'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`App Name: ${process.env.APP_NAME}`);
});

module.exports = app;
