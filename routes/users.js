const router = require('express').Router();
const validation = require('../middlewares/validation');
const {
  getUserById,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserById);

router.patch('/users/me', validation.updateUser, updateUser);

module.exports = router;
