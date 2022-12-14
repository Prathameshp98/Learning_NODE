const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const expressHbs = require('express-handlebars')

const app = express();


app.set('view engine','ejs')
// app.engine('handlebars',expressHbs.engine(
//     {
//       layoutsDir: 'views/layouts/',
//       defaultLayout: 'main-layout'
//     }
// ))
// app.set('view engine','handlebars')
// app.set('view engine','pug')
app.set('views','views')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', (req, res, next) => {
//     console.log('This always runs!');
//     next();   // helps to move to next middleware
// });

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  res.status(404).render('404',{pageTitle: 'Page not Found'})
})

app.listen(3000, () => {
    console.log("App started on port 3000")
});
