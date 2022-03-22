const express = require('express');
const router = express.Router();

const { getAllUser, getCurrentUser } = require('../controllers/userController');

router.get('/', getAllUser);
router.get('/current-user', getCurrentUser);

module.exports = router;
