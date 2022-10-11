const express = require('express');
const path = require('path')

const rootDirectory = require('../util/path')

const router = express.Router()

const products = []

router.get('/add-product', (req, res, next) => {
    // console.log('In another middleware!');
    // res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'))
    res.render('add-product' ,{
      path: '/admin/add-product', 
      pageTitle: 'Add Product'
    })
    
  });
  
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect("/")
})

exports.routes = router
exports.products = products