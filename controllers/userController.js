const bcrypt = require('bcrypt');
const userModel = require('../models/UserModel'); // Asegúrate de tener el modelo configurado

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { name, email, password } = req.body; // Solo los campos name, email y password

  // Validación para asegurarse de que no faltan campos requeridos
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Hashear la contraseña antes de guardarla
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error al generar el hash de la contraseña' });
    }

    const newUser = { name, email, password: hashedPassword }; // Elimina el role de aquí

    userModel.createUser(newUser, (err, userId) => {
      if (err) {
        return res.status(500).json({ message: 'Error al crear el usuario' });
      }
      return res.status(201).json({ message: 'Usuario creado exitosamente', userId });
    });
  });
};

// Iniciar sesión
const getUser = (req, res) => {
    const { email, password } = req.body;
  
    // Verificar que los campos no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
    }
  
    // Buscar el usuario por su correo electrónico
    userModel.findUserByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error al buscar el usuario' });
      }
  
      // Si no se encuentra el usuario
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Error al comparar las contraseñas' });
        }
  
        // Si las contraseñas no coinciden
        if (!isMatch) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
  
        // Si todo es correcto, iniciar sesión con éxito
        // Aquí podrías generar un token JWT si estás usando autenticación basada en tokens (por ejemplo, usando jsonwebtoken)
        res.status(200).json({
          message: 'Inicio de sesión exitoso',
          userId: user.id,  // O cualquier otro dato que quieras devolver, como el nombre
          userName: user.name,
          userRole: user.role,  // Si estás usando roles de usuario
        });
      });
    });
};

module.exports = {
  createUser,
  getUser
};
