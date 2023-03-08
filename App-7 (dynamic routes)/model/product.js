const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

const path_ = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductsFromData = callBack => { 
    fs.readFile(path_, (err, fileContent) => {
        if(err){
            callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {

    constructor (id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {  
        
        getProductsFromData(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProduct = [...products]
                updatedProduct[existingProductIndex] = this
                fs.writeFile(path_, JSON.stringify(updatedProduct), err => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString() 
                products.push(this)
                fs.writeFile(path_, JSON.stringify(products), err => {
                    console.log(err)
                })
            }
            
        })    
    }

    static deleteById(id) {
        getProductsFromData(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(prod => prod.id !== id)
            fs.writeFile(path_, JSON.stringify(updatedProducts), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price)
                }
            })
        })
    }

    static fetchAll(callBack) {
        getProductsFromData(callBack)
    }

    static findById(id, callBack) {
        getProductsFromData(products => {
            const product = products.find(p => p.id === id)
            callBack(product)
        })
    }
}