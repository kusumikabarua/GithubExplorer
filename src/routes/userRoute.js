const express = require('express');
const userController=require('../controllers/userController');

const router = express.Router();


router.get('/save-user/:user', userController.saveUser);
router.get('/find-mutual-followers/:user', userController.findMutualFollowers);
router.delete('/delete-user/:user', userController.deleteUser);
router.patch('/update-user/:user', userController.updateUser);



module.exports = router;