const express = require('express');
const path = require('path')

const rootDirectory = require('../util/path')
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminData.products)
    // console.log('In another middleware!');
//    res.sendFile(path.join(rootDirectory, 'views', 'shop.html'))
   res.render('shop', {
        prods: adminData.products, 
        path: '/', 
        pageTitle: 'Shop',
        hasProducts: adminData.products.length > 0
    })
    
});
 
module.exports = router;