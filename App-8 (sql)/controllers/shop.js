const Product = require('../model/product')
const Cart = require('../model/cart')

exports.getShop =(req, res, next) => {
    Product.fetchAll()
    .then(([rows]) => {
        res.render('shop/index', {
            prods: rows, 
            path: '/products', 
            pageTitle: 'All Products',
        })
    })
    .catch(err => console.log(err))
    
     
 }

 exports.getProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0], 
                pageTitle: product.title,
                path: '/products'
            })   
        })
        .catch(err => console.log(err))
    
 }

 exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows, 
                path: '/', 
                pageTitle: 'Shop',
            })
        })
        .catch(err => console.log(err))
    
 }

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cart.products.find(prod => prod.id === product.id)){
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })
    })
    
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
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