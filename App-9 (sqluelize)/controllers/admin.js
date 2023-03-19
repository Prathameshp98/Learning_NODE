const Product = require('../model/product') 

exports.getAddProduct = (req, res, next) => {

    res.render('admin/edit-product' ,{
      path: '/admin/add-product', 
      pageTitle: 'Add Product',
      editing: false
    })   
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    req.user
        .createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
        })
        .then(result => {
            console.log('RECORD CREATED')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if(!editMode){
        return res.redirect('/')
    }

    const productId = req.params.productId 
    req.user
        .getProducts({where: {id: productId}})
        // Product.findByPk(productId)
        .then(products => {
            const product = products[0]
        if(!product){
            return res.redirect('/')
        }
        res.render('admin/edit-product' ,{
            path: '/admin/edit-product', 
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        }) 
    })
      
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId
    const updatedTitle = req.body.title
    const updatedImageUrl = req.body.imageUrl
    const updatedPrice = req.body.price
    const updatedDescription = req.body.description

    Product.findByPk(productId)
        .then(product => {
            product.title = updatedTitle,
            product.price = updatedPrice,
            product.imageUrl = updatedImageUrl,
            product.description = updatedDescription;
            return product.save()
        })
        .then(result => {
            res.redirect('/admin/products')
            console.log('UPDATED PRODUCT')
        })
        .catch(err => console.log(err))
    
}

exports.getProducts = (req, res, next) => {
    req.user.
        getProducts()
        // .findAll()
        .then(products => {
            res.render('admin/product-list', {
                prods: products, 
                path: '/admin/products', 
                pageTitle: 'Admin Products',
            })
        })
        .catch(err => {
            console.log(err)
        })  
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.findByPk(productId)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            console.log('PRODUCT DELETED')
            res.redirect('/admin/products')
        })

}