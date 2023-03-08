const fs = require('fs')
const path = require('path')

const path_ = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {
        fs.readFile(path_, (err, fileContent) => {
            if (err) {
              return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
      
            fs.writeFile(path, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(path_, (err, fileContent) => {
            if(err){
                return
            }
            const updatedCart = { ...JSON.parse(fileContent) }
            const product = updatedCart.products.findIndex(prod => prod.id === id)
            if(!product){
                return
            }
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice = productPrice * productQty

            fs.writeFile(path_, JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }

    static getCart(callBack) {
        fs.readFile(path_, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if(err){
                callBack(null)
            } else {
                callBack(cart)
            }
        })
    }

}