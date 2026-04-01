const mongoose = require('mongoose');

const BorrowerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  bookName: {
    type: String,
    required: true,
    trim: true
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned'],
    default: 'borrowed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
BorrowerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Borrower', BorrowerSchema);
