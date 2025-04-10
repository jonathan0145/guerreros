import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

class Spell extends Model {}

Spell.init({
  spell_id: {
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
  mana_cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10
  },
  effect: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Spell',
  tableName: 'spells',  // Changed from SPELL
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Spell;