const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();

const homeRoute = require('./routes/homeRoute')
const bookRoute = require('./routes/bookRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const newsRoute = require('./routes/newsRoute')
const logoutRoute = require("./routes/logoutRoute.js");
const profileRoute = require('./routes/profileRoute.js')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(session({
    secret: 'f7zNqEMNrtwFH',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 123456789
    },
}));

app.use((req, res, next) => {
    if (!req.session.language) {
      req.session.language = 'en'; // Default language
    }
    next();
  });

app.use(methodOverride('_method'));

app.get('/', function (req, res) {
    res.redirect('./home');
});
app.use('/home', homeRoute);
app.use('/', userRoute);
app.use('/', bookRoute);
app.use('/admin', adminRoute);
app.use('/news', newsRoute);
app.use('/', logoutRoute);
app.use('/',profileRoute)

mongoose.connect(process.env.dbURL).then(async () => {
    app.listen(3000, () => {
        console.log("Connected to database and listening on port 3000");
    });
}).catch((err) => console.error('Error connecting to database:', err));
