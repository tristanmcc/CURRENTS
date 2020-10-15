const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')

router.get('/register', authController.register_get);

router.post('/register', authController.register_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

// router.post('/update_profile', authController.update_patch);   //unfinished

router.get('/transact', authController.transact_get);

router.post('/transact', authController.transact_patch);

router.get('/update_profile', authController.update_get)

router.patch('/update_profile', authController.update_patch);


module.exports = router;