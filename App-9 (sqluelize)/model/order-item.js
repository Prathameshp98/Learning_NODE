const Sequilize = require('sequelize')

const sequelize = require('../util/database')

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequilize.INTEGER
})

module.exports = OrderItem