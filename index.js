const path = require('path');
//const bootstrap = require('bootstrap');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

//Carrega config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express();

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Handlerbars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Session

app.use(session({
    secret: 'crawler',
    resave: false,
    saveUninitialized: false,
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Servidor rodando em ${process.env.NODE_ENV}`)
)
