const express = require('express');
const router = express.Router();

const authController = require('../Controller/authController')

router.post('/register' , authController.register)
router.post('/signin' , authController.signin)


module.exports = router;