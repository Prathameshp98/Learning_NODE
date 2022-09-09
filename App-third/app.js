const express = require('express');
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

// app.use('/', (req, res, next) => {
//     console.log('This always runs!');
//     next();   // helps to move to next middleware
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>')
})

app.listen(3000, () => {
    console.log("App started on port 3000")
});
