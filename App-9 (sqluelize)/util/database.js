const Sequilize = require('sequelize')

const sequelize = new Sequilize('node_schema','root','2812@Nanu',{
    dialect: 'mysql', 
    host: 'localhost'
})

module.exports = sequelize