const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController')

router.get('/wallet', homeController.wallet_get);






module.exports = router;