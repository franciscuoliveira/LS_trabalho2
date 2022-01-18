const mongoose = require('mongoose');

const VeiculoSchema = mongoose.Schema({
    matricula: {
        type: String,
        required: true,
        unique: true
    },
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

module.exports = mongoose.model('Veiculos', VeiculoSchema);