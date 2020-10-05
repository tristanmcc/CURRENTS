if (process.env.NODE_ENV !== 'production') {                    // Checks whether the app is running in production environment or not. 
    require('dotenv').config()
}


const express = require('express');                         // integrates express framework 
const app = express();                                     //invokes express to our app var
const expressLayouts = require('express-ejs-layouts');    
const indexRouter = require('./routes/index')               //creates a router for index file
const userRouter = require('./routes/users')

const mongoose = require('mongoose')
var bodyParser = require('body-parser');


//Connect to Mongo DB
const dbURI = 'mongodb+srv://Dev_1:Currents123 @cluster0.nwvcr.mongodb.net/Currents-db?retryWrites=true&w=majority';

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))                       // on error
db.once('open', () => console.log('Connected to Database'))         // on opening


const PORT = 3000;

// Encryption
const bcrypt = require('bcrypt')


// app
app.set('view engine', 'ejs')
app.set('views,', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())

//Create User




app.use('/users', userRouter)


app.use('/', indexRouter)



app.listen(process.env.PORT || 3000)
