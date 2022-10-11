const products = [];

exports.getAddProduct = (req, res, next) => {

    res.render('add-product' ,{
      path: '/admin/add-product', 
      pageTitle: 'Add Product',
      isAddproductActive: true,
      productCSS: true,
      formCSS: true
    })
    
}

exports.postAddProduct = (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect("/")
}


exports.getShop =(req, res, next) => {

    res.render('shop', {
         prods: products, 
         path: '/', 
         pageTitle: 'Shop',
     })
     
 }