const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/itemController');

router.get('/', c.getAll);
router.get('/:id', c.getOne);
router.post('/', auth, c.createItem);
router.put('/:id', auth, c.updateItem);
router.delete('/:id', auth, c.removeItem);

module.exports = router;
