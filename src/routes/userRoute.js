const express = require('express');
const userController=require('../controllers/userController');

const router = express.Router();


router.get('/save-user/:user', userController.saveUser);
router.get('/find-mutual-followers/:user', userController.findMutualFollowers);



module.exports = router;