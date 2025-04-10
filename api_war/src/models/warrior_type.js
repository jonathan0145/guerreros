import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

class WarriorType extends Model {}

WarriorType.init({
  type_id: {
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
  }
}, {
  sequelize,
  modelName: 'WarriorType',
  tableName: 'warrior_types',  // Changed from WARRIOR_TYPE
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Add associations
WarriorType.hasMany(Warrior, {
  foreignKey: 'type_id',
  as: 'warriors'
});

export default WarriorType;