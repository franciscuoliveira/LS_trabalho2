const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config');
let app = express()
app.use('/public', express.static('files'));
var formDataParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

//Imports Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Conects to DB
mongoose.connect('mongodb+srv://FFL:<FFL4s>@cluster0.l8mq2.mongodb.net/CarDealer?retryWrites=true&w=majority', () =>
    console.log('Conected to DB!')
);


app.listen(3000, ()=> console.log('server ok http://localhost:3000'));

//express
app.get('/', (req, res) => {
    res.render('pages/index')
})
app.set('view engine', 'ejs')

 
