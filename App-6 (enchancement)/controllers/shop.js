const Product = require('../model/product')

exports.getShop =(req, res, next) => {
     Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products, 
            path: '/products', 
            pageTitle: 'All Products',
        })
     })
     
 }

 exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            path: '/', 
            pageTitle: 'Shop',
        })
    })
 }

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}