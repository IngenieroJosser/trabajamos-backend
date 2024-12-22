const db = require('../config/db'); // Conexión con tu base de datos (asegúrate de configurarlo)

const createUser = (newUser, callback) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'; // Elimina el campo `role`
  db.query(query, [newUser.name, newUser.email, newUser.password], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.insertId); // Retorna el ID del usuario recién creado
    }
  });
};

// Buscar un usuario por correo electrónico
const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]); // Retorna el primer usuario encontrado
    }
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
