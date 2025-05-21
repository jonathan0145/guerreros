const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

class Warrior extends Model {}

Warrior.init({
  warrior_id: { // Especifica la columna de clave primaria
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  total_power: DataTypes.INTEGER,
  total_magic: DataTypes.INTEGER,
  health: DataTypes.INTEGER,
  speed: DataTypes.INTEGER,
  intelligence: DataTypes.INTEGER,
  status: DataTypes.STRING,
  warrior_type_id: DataTypes.INTEGER,
  race_id: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Warrior',
  tableName: 'warrior', // Asegúrate de que el nombre de la tabla sea correcto
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
  timestamps: false, // Desactiva los timestamps automáticos
});

module.exports = Warrior;