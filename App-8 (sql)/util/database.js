const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_schema',
    password: '2812@Nanu'
})

module.exports = pool.promise()