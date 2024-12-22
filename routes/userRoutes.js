const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Ruta para crear un usuario (registro)
router.post('/register', userController.createUser);

// Ruta para iniciar sesión
router.post('/login', userController.getUser);

module.exports = router;
