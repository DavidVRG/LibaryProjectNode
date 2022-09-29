if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expessLayout = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

/* BASIC SET */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expessLayout)
app.set(express.static('public'))

/* MONGOOSE/MONGODB */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', error => (console.log(error)))
db.once('open', () => {console.log('MongoDB connected')})

/* ROUTES */
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)