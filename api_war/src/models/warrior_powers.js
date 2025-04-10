import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const WarriorPowers = sequelize.define('WarriorPowers', {
  warrior_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  power_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'warrior_powers',  // Changed from WARRIOR_POWERS
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Add associations
WarriorPowers.belongsTo(Warrior, {
  foreignKey: 'warrior_id',
  as: 'Warrior'
});

WarriorPowers.belongsTo(Power, {
  foreignKey: 'power_id',
  as: 'Power'
});
export default WarriorPowers;