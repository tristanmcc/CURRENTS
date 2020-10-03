if (process.env.NODE_ENV !== 'production') {                    // Checks whether the app is running in production environment or not. 
    require('dotenv').config()
}


const express = require('express');                         // integrates express framework 
const app = express();                                     //invokes express to our app var
const expressLayouts = require('express-ejs-layouts');    
const indexRouter = require('./routes/index')               //creates a router for index file
const PORT = 3000;

app.set('view engine', 'ejs')
app.set('views,', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))                       // on error
db.once('open', () => console.log('Connected to Mongoose'))         // on opening


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
