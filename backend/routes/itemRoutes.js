//The-Bug-Busters/backend/routes/itemRoutes.js

const router = require('express').Router();
const ctrl = require('../controllers/itemController');
const adminAuth = require('../middleware/adminAuth');


router.get('/', ctrl.getItems);
router.get('/:id', ctrl.getItem);
router.post('/', adminAuth, ctrl.createItem);
router.put('/:id', adminAuth, ctrl.updateItem);
router.delete('/:id', adminAuth, ctrl.deleteItem);

module.exports = router;
