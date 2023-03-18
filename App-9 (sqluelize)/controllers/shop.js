const Product = require('../model/product')

exports.getShop =(req, res, next) => {

    Product
        .findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products, 
                path: '/products', 
                pageTitle: 'All Products',
            })
        })
        .catch(err => {
            console.log(err)
        })  
    
     
 }

 exports.getProduct = (req, res, next) => {
    const productId = req.params.productId

    // Product.findAll({where: {id: productId}})
    //     .then(product => {
    //         res.render('shop/product-detail', {
    //             product: product[0], 
    //             pageTitle: product[0].title,
    //             path: '/products'
    //         })  
    //     })
    //     .catch(err => console.log(err))

    Product.findByPk(productId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product, 
                pageTitle: product.title,
                path: '/products'
            })   
        })
        .catch(err => console.log(err))
    
 }

 exports.getIndex = (req, res, next) => {
    Product
        .findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products, 
                path: '/', 
                pageTitle: 'Shop',
            })
        })
        .catch(err => {
            console.log(err)
        })    
 }

exports.getCart = (req, res, next) => {
 
    req.user
        .getCart()
        .then(cart => {
        return cart
            .getProducts()
            .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));                             

}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    let fetchCart;
    let newQuantity = 1

    req.user
        .getCart()
        .then(cart => {
            fetchCart = cart
            return cart.getProducts({ where: {id: productId}})
        })
        .then(products => {
            let product
            if(products.length > 0){
                product = products[0]
            }

            if(product){
                const oldQuantity = product.cartItem.quantity
                newQuantity = oldQuantity + 1
                return product
            }
            return Product.findByPk(productId)           
        })
        .then(product => {
            return fetchCart.addProduct(product, {
                through: { quantity: newQuantity}
            })
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where : { id: productId}})
        })
        .then(products => {
            const product = products[0]
            product.cartItem.destroy()
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
    
}

exports.postOrders = (req, res, next) => {
    let fetchCart

    req.user
        .getCart()
        .then(cart => {
            fetchCart = cart
            return cart.getProducts()
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    return order.addProduct(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity }
                        return product
                    }))
                })
                .catch(err => console.log(err))
        })
        .then(result => {
            fetchCart.setProducts(null)
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {

    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            })
        })
        .catch(err => {
            console.log(err)
        })

    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}
