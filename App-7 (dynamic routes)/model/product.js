const fs = require('fs')
const path = require('path')

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

    constructor (title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {      
        getProductsFromData(products => {
            products.push(this)
            fs.writeFile(path_, JSON.stringify(products), err => {
                console.log(err)
            })
        })    
    }

    static fetchAll(callBack) {
        getProductsFromData(callBack)
    }
}