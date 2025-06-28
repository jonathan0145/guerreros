const cors = require('cors');
const express = require('express');
const apiUserRoutes = require('./routes/apiUserRoutes');
const playerRoutes = require('./routes/playerRoutes');
const warriorRoutes = require('./routes/warriorRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerStatRoutes = require('./routes/playerStatRoutes');
const powerRoutes = require('./routes/powerRoutes');
const raceRoutes = require('./routes/raceRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const spellRoutes = require('./routes/spellRoutes');
const warriorTypeRoutes = require('./routes/warriorTypeRoutes');
const sequelize = require('../config/database');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', apiUserRoutes);
app.use('/api', playerRoutes);
app.use('/api', warriorRoutes);
app.use('/api', matchRoutes);
app.use('/api', playerStatRoutes);
app.use('/api', powerRoutes);
app.use('/api', raceRoutes);
app.use('/api', rankingRoutes);
app.use('/api', spellRoutes);
app.use('/api', warriorTypeRoutes);

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