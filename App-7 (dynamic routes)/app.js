const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

const app = express();

const errorController = require('./controllers/error')

app.set('view engine','ejs')
app.set('views','views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)

app.listen(3001, () => {
    console.log("App started on port 3001")
});
