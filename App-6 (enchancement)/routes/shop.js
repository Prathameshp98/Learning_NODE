const express = require('express');
const path = require('path')

const router = express.Router();

const productController = require('../controllers/products')

router.get('/', productController.getShop);
 
module.exports = router;