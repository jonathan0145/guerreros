import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

class Power extends Model {}

Power.init({
  power_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  damage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  cooldown: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: 'Power',
  tableName: 'powers',  // Changed from POWER
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Power;