const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
let app = express();
app.use('/public', express.static('files'));
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

//Imports Routes
const postsRoute = require('./routes/posts');
const { stringify } = require('nodemon/lib/utils');
const { post } = require('./routes/posts')
const Veiculo = require('./models/Veiculo')

//Conects to DB
mongoose.connect('mongodb+srv://filipa:filipa@cluster0.l8mq2.mongodb.net/CarDealer?retryWrites=true&w=majority', () =>
    console.log('Conected to DB!')
);

app.post("/veiculo/adicionar", urlencodedParser, async function(req, res) {
    let veiculo = {
      matricula: req.body.matricula,
      marca: req.body.marca,
      modelo: req.body.modelo,
      ano: req.body.ano,
      tipo: req.body.tipo,
      precoCompra: req.body.precoCompra,
      dataCompra: req.body.dataCompra,
     precoRestauro: req.body.precoRestauro
    };
   
Veiculo.findOne(veiculo, function(err, result) {
  if (err) {
    return res.send(err)
  }

  if (result) {
    return res.send("Este veículo já existe!")
  }

  Veiculo.create(veiculo, function(err, result) {
    if (err) {
      return res.send(err)
    }

    if (result) {
      return res.send("Veículo adicionado com sucesso!")
    }
  });
});
});

app.post("/veiculo/vender", urlencodedParser, async function(req, res){
     
});

app.get('/', async function(req, res) {
    try{
        const posts = await Veiculo.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

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