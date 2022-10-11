const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.set('view engine','ejs')
app.set('views','views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404',{pageTitle: 'Page not Found'})
})

app.listen(3000, () => {
    console.log("App started on port 3000")
});
