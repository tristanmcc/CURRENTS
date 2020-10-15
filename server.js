if (process.env.NODE_ENV !== 'production') {                    // Checks whether the app is running in production environment or not. 
    require('dotenv').config()
}

//  Dependencies and related
const express = require('express');                         // integrates express framework 
const app = express();                                     //invokes express to our app var
const expressLayouts = require('express-ejs-layouts');    
const mongoose = require('mongoose') // database
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { check, validationResult } = require('express-validator')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

//Imported middleware
const { requireAuth, checkUser } = require('./middleware/authMiddleware')


//Routers
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/users/users')
const homeRoutes = require('./routes/homeRoutes')



//Connect to Mongo DB
const dbURI = 'mongodb+srv://Dev_1:Currents123@cluster0.nwvcr.mongodb.net/Currents-db?retryWrites=true&w=majority';

mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))                       // on error
db.once('open', () => console.log('Connected to Database'))         // on opening



//Port number for local host
const PORT = 3000;






//middleware
app.use(express.json());
app.use (cookieParser());


// Encryption
const bcrypt = require('bcrypt')


// app

//view engine
app.set('view engine', 'ejs')


app.set('views,', __dirname + '/views')
app.set('layout', 'layouts/layout')

//Dependency implementation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressLayouts)
app.use(methodOverride('_method '))
app.use(express.static('public'))
app.use(express.json())
app.use(cors());



// routes

app.get('*', checkUser)
app.get('/', (req, res) => res.render('home_index.ejs'));
app.get('/wallet', requireAuth, (req, res) => res.render('wallet.ejs'))
app.get('/transact', requireAuth, (req, res) => res.render('transact.ejs'))
app.get('/profile', requireAuth, (req, res) => res.render('profile.ejs'))
app.get('/update_profile', requireAuth, (req, res) => res.render('update_profile.ejs'))   //unfinished


//enable routes
app.use(authRoutes);

// app.use(homeRoutes)

// app.use(userRoutes)





app.listen(process.env.PORT || 3000)
