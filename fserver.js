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
const { post } = require('./routes/posts')
const Veiculo = require('./models/Veiculo')


//Conects to DB
mongoose.connect('mongodb+srv://FFL:<FFL4s>@cluster0.l8mq2.mongodb.net/CarDealer?retryWrites=true&w=majority', () =>
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
      restorationCost: req.body.restorationCost
    };
   
    VeiculoSchema.findOne(veiculo, function(err, result) {
      if (err) {
        return res.send(err)
      }
      if (result) {
        return res.send("Este veículo já existe!")
      }
      VeiculoSchema.create(veiculo, function(err, result) {
        if (err) {
          return res.send(err)
        }
        if (result) {
          return res.send("Veículo adicionado com sucesso!")
        }
      });
    });
  });

app.get('/', async (req, res) => {
    try{
        const posts = await Veiculo.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

app.delete()
app.listen(2000, ()=> console.log('server ok'))