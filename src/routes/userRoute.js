const express = require('express');
const userController=require('../controllers/userController');

const router = express.Router();

router.get('/user/:user', userController.getUser);
router.get('/save-user/:user', userController.saveUser);



module.exports = router;