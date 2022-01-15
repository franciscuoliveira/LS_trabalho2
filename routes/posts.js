const express = require('express');
const router = express.Router();
const Post = require('..models/Veiculo');
const res = require('express/lib/response');

router.get('/', (req, res) => {
    res.send('Veiculos');
});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;