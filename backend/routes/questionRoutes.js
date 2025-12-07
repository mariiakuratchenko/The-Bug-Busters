//The-Bug-Busters/backend/routes/questionRoutes.js

const router = require('express').Router();
const ctrl = require('../controllers/questionController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Create question (authenticated users)
router.post('/', auth, ctrl.createQuestion);

// Get all questions (admin only)
router.get('/', adminAuth, ctrl.getAllQuestions);

// Get questions for a specific product
router.get('/product/:productId', ctrl.getProductQuestions);

// Delete question (admin only)
router.delete('/:id', adminAuth, ctrl.deleteQuestion);

module.exports = router;
