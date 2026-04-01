const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');

// GET all borrowers
router.get('/', borrowerController.getAllBorrowers);

// GET a single borrower by ID
router.get('/:id', borrowerController.getBorrowerById);

// POST create a new borrower registration
router.post('/', borrowerController.createBorrower);

// PUT update a borrower
router.put('/:id', borrowerController.updateBorrower);

// DELETE a borrower
router.delete('/:id', borrowerController.deleteBorrower);

module.exports = router;
