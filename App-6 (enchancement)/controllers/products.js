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
    const product = new Product(req.body.title)
    product.save();
    res.redirect("/")
}


exports.getShop =(req, res, next) => {
     Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            path: '/', 
            pageTitle: 'Shop',
        })
     })
    
     
 }