const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');  // Importar cors
const userRoutes = require('./routes/userRoutes');

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

// Usar las rutas de usuarios
app.use('/api', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de Trabajamos en http://localhost:${PORT}`);
  
});
