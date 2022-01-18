const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
let app = express();
app.use('/public', express.static('files'));
var formDataParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

//Imports Routes
const postsRoute = require('./routes/posts');
const { stringify } = require('nodemon/lib/utils');

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

 
app.get('/compra', (req, res) => {
    res.render('pages/compra')
})

app.get('/venda', (req, res) => {
    res.render('pages/venda')
})
app.get('/atualizarRestauro', (req, res) => {
    res.render('pages/atualizarRestauro')
})
app.get('/visualizar', (req, res) => {
    res.render('pages/visualizar')
})
app.get('/gestaoBD', (req, res) => {
    res.render('pages/gestaoBD')
})
app.get('/alterarDados', (req, res) => {
    res.render('pages/alterarDados')
})
app.get('/relatorios', (req, res) => {
    res.render('pages/relatorios')
})

//compra
//create data schema
const compraSchema = {
    matricula: String,
    marca: String, 
    modelo: String,
    tipo: String,
    ano: String,
    preco: String
}
const Compra = mongoose.model("Car", compraSchema);

app.post("/compra", function(req,res){
    let newcompra = new Compra({
        matricula: req.body.matricula,
        marca: req.body.marca, 
        modelo: req.body.modelo,
        tipo: req.body.tipo,
        ano: req.body.ano,
        preco: req.body.precoCompra
    })
    newcompra.save();
    res.redirect('/compra');
})
