const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Inicio de backend de |Trabajamos - CO-Working|');
});

app.listen(PORT, () => {
    console.log(`Servidor de trabajamos en http://localhost:${PORT}`);
})