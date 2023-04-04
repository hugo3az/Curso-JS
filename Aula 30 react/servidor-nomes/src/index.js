const express = require('express');
const app = express();

app.get('/names', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(['João', 'Maria', 'Clecio', 'Francisco', 'Hugo', 'Yanna', 'Vitoria']);
});

app.listen(3001, () => {
    console.log("Servidor Ativo!");
});