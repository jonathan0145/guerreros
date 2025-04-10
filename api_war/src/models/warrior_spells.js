import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const WarriorSpells = sequelize.define('WarriorSpells', {
  warrior_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  spell_id: {
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
  tableName: 'warrior_spells',  // Changed from WARRIOR_SPELLS
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Add associations
WarriorSpells.belongsTo(Warrior, {
  foreignKey: 'warrior_id',
  as: 'Warrior'
});

WarriorSpells.belongsTo(Spell, {
  foreignKey: 'spell_id',
  as: 'Spell'
});

export default WarriorSpells;