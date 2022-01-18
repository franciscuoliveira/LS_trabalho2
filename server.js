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
const Veiculo = require('./models/Veiculo');
const { findOneAndUpdate } = require('./models/Veiculo');

const VeiculoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    marca: {
        type: String,
        require: true
    },
    modelo: {
        type: String,
        require: true
    },
    ano: {
        type: Number,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    precoCompra: {
        type: Number,
        require: true
    },
    dataCompra: {
        type: String,
        require: true
    },
    precoRestauro: {
        type: Number,
        require: true
    },
})

const VendaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    precoVenda: {
        type: Number,
        require: true
    },
    dataVenda: {
        type: String,
        require: true
    },
})

const VehicleModel = mongoose.model('veiculos', VeiculoSchema);
const VendaModel = mongoose.model('vendas', VendaSchema);
//Conects to DB
mongoose.connect('mongodb+srv://filipa:filipa@cluster0.l8mq2.mongodb.net/CarDealer?retryWrites=true&w=majority', () =>
    console.log('Conected to DB!')
);

app.post("/compra", urlencodedParser, async function(req, res) {
    let veiculo = {
      _id: req.body._id,
      marca: req.body.marca,
      modelo: req.body.modelo,
      ano: req.body.ano,
      tipo: req.body.tipo,
      precoCompra: req.body.precoCompra,
      dataCompra: req.body.dataCompra,
      precoRestauro: req.body.precoRestauro
    };
   
VehicleModel.findOne(veiculo, function(err, result) {
  if (err) {
    return res.send(err)
  }

  if (result) {
    return res.send("Este veículo já existe!")
  }

  VehicleModel.create(veiculo, function(err, result) {
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
    let venda = {
        _id: req.body._id,
        precoVenda: req.body.precoCompra,
        dataVenda: req.body.dataCompra,
      };
    
      const existe = await VendaModel.findOne({_id: req.body._id});

      if(existe){
        VendaModel.create(venda, function(err, result) {
            if(err){
                return res.send(err)
            }

            if(result){
                return res.send("Venda efetuada")
            }
        })
      }
});

app.get('/list', async function(req, res) {
    try{
        const posts = await Veiculo.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

app.get('/vendidos', async function(req, res) {
    const vendido = await VendaModel.find();

    if(vendido){
        for(let i = 0; i < sold.length; i++) {

            console.log(sold[i]._id);
            stock = await VehicleModel.findOne({_id: sold[i]._id});
        if(stock){
            string += "<li> <b>Matrícula: " + sold[i]._id +
            <ul>
                <li>Marca: " + stock.brand + "</li>
                <li>Modelo: " + stock.model + "</li>
                <li>Ano: " + stock.year + "</li>
                <li>Tipo: " + stock.type + "</li>
                <li>Preço de compra: " + stock.purchasePrice + "</li>
                <li>Data de compra:" + stock.purchaseDate + "</li>
                <li>Preço de restauro: " + stock.restorationCost + "</li>
            </ul>
            
            }
            else{
                return
            }
        }
    }
});

app.listen(3003, ()=> console.log('server ok http://localhost:3000'));


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
app.get('/alterarMatricula', (req,res)=>{
  res.render('pages/alterarMatricula')
})


app.put('/alterarMatricula', (req, res)=>{

  let veiculo = {

    "matricula" : req.body.matricula
    
  }
  let newMatricula ={
    $push: {
    "matricula" : req.body.novaMatricula

    }
  }

  Veiculo.findByIdAndUpdate(veiculo, newMatricula, (err, res)=>{
    console.log(err);
    console.log(res);
  });





  /* let doc = await veiculo.findOne(oldMatricula, newMatricula, {
    new: true
  });

  Veiculo.findOneAndUpdate(veiculo, req.body)
  .exec(function(err, result){ 
    if(err){
      return res.send(err)
    }
    if(result){
      res.json({result, message: 'Successfully updated'})
    }
  }) */
})










