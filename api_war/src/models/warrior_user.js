import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

class WarriorUser extends Model {}

WarriorUser.init({
  warrior_user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  warrior_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'warriors',  // Changed from WARRIOR
      key: 'warrior_id'   // Changed from Warrior_id
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',    // Changed from USER
      key: 'user_id'     // Changed from User_id
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'WarriorUser',
  tableName: 'warrior_users',  // Changed from warrior_user
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'warrior_id']
    }
  ]
});

export default WarriorUser;