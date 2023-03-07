const Product = require('../model/product') 

exports.getAddProduct = (req, res, next) => {

    res.render('admin/add-product' ,{
      path: '/admin/add-product', 
      pageTitle: 'Add Product',
      isAddproductActive: true,
      productCSS: true,
      formCSS: true
    })
    
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, imageUrl, description, price)
    product.save();
    res.redirect("/")
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    })
}