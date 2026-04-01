const Borrower = require('../models/Borrower');

// Get all borrowers
exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find().sort({ borrowDate: -1 });
    res.status(200).json(borrowers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrowers', error: error.message });
  }
};

// Get a single borrower by ID
exports.getBorrowerById = async (req, res) => {
  try {
    const borrower = await Borrower.findById(req.params.id);
    if (!borrower) {
      return res.status(404).json({ message: 'Borrower not found' });
    }
    res.status(200).json(borrower);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrower', error: error.message });
  }
};

// Create a new borrower registration
exports.createBorrower = async (req, res) => {
  try {
    const { fullName, studentId, bookName } = req.body;

    // Validation
    if (!fullName || !studentId || !bookName) {
      return res.status(400).json({ 
        message: 'Missing required fields: fullName, studentId, bookName' 
      });
    }

    // Check if student already borrowed a book (optional - can register multiple)
    const newBorrower = new Borrower({
      fullName,
      studentId,
      bookName
    });

    const savedBorrower = await newBorrower.save();
    res.status(201).json({
      message: 'Borrower registered successfully',
      data: savedBorrower
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Student ID already registered. Please check your registration.' 
      });
    }
    res.status(500).json({ message: 'Error creating borrower', error: error.message });
  }
};

// Update a borrower
exports.updateBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBorrower = await Borrower.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBorrower) {
      return res.status(404).json({ message: 'Borrower not found' });
    }

    res.status(200).json({
      message: 'Borrower updated successfully',
      data: updatedBorrower
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating borrower', error: error.message });
  }
};

// Delete a borrower
exports.deleteBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBorrower = await Borrower.findByIdAndDelete(id);

    if (!deletedBorrower) {
      return res.status(404).json({ message: 'Borrower not found' });
    }

    res.status(200).json({
      message: 'Borrower deleted successfully',
      data: deletedBorrower
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting borrower', error: error.message });
  }
};
