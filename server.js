const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
//const res = require('express/lib/response')
let app = express()
app.use('/public', express.static('files'));
var formDataParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

automoveis = []
automoveis = [{matricula:"AA-65-AB", preco:1000, tipo: "sedan", ano: "2001"},
{matricula:"AB-53-AB", preco:1000, tipo: "sedan", ano:"2021"}]

const fs = require('fs');

app.get('/automoveisReadFile', (req, res) => {
    fs.readFile('./automoveis.json', 'utf-8', (err,data) =>{
    if(err)
        res.status(400).send('Read Failed')
    else{
        const fileAutomoveis = JSON.parse(data.toString());
        automoveis = automoveis.concat(fileAutomoveis);
        res.status(200).send('JSON data read.')
    }
    })
})

app.get('/automoveisSaveFile', (req,res) => {
    if(automoveis.length===0)
        res.status(400).send('Não há automóveis')
    else{
        const data = JSON.stringify(automoveis);
        fs.writeFile('./automoveis.json', data, (err) => {
            if (err)
                res.status(400).send('Write failed');
            else
                res.status(200).send('Json data saved');
        })
    }
})


app.get('/automoveis', (req, res) => {
    
    if (automoveis.length===0)
    res.status(400).send('Não há automóveis')
    else
    res.status(200).send(automoveis)
 })
   

 app.post('/automoveis', (req, res) => {
    let newAutomovel = req.body 
    console.log(req.body) 
    console.log("alo")
    let id = inserirAutomovel(newAutomovel);
    automoveis.push(newAutomovel)
    res.status(201).send( {id: id} )
})

app.post('/handleAddAutomovel', formDataParser,(req, res,)=> {
    let addMatricula=req.body.matricula;
    let addPreco=parseInt(req.body.preco);
    let addTipo=(req.body.tipo);
    let addAno=(req.body.ano);
    let novoAutomovel={ "matricula": addMatricula, "preco": addPreco, "tipo": addTipo, "ano": addAno};
    let id = inserirAutomovel(novoAutomovel);
    res.send(id); 
})

   function inserirAutomovel(newAutomovel){
    let id = automoveis.length;
    automoveis.push(newAutomovel);
    return id;
}


app.put('/automoveis/:id', (req, res) =>{
   lautomoveis[req.params.id] = req.body
    res.status(200).send(automoveis[req.params.id])
})
app.delete('/automoveis/:id', (req,res) =>{
  let returned = automoveis.splice(req.params.id, 1)
    if (returned.length===0)
        res.status(400).send(req.params.id+' :Failed')
    else   
        res.status(204).send()
        res.status(200).send(returned[0])
})


app.listen(2000, ()=> console.log('server ok'))