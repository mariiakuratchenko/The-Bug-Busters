// backend/routes/itemRoutes.js
const router = require('express').Router();
const ctrl = require('../controllers/itemController');
const auth = require('../middleware/auth');


router.get('/', ctrl.getItems);
router.get('/:id', ctrl.getItem);
router.post('/', auth, ctrl.createItem);
router.put('/:id', auth, ctrl.updateItem);
router.delete('/:id', auth, ctrl.deleteItem);

module.exports = router;
