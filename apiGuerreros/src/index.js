const express = require('express');
const apiUserRoutes = require('./routes/apiUserRoutes');
const playerRoutes = require('./routes/playerRoutes');
const warriorRoutes = require('./routes/warriorRoutes');
const sequelize = require('../config/database');

const app = express();

app.use(express.json());
app.use('/api', apiUserRoutes);
app.use('/api', playerRoutes);
app.use('/api', warriorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('¡Conexión a la base de datos establecida!');
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});