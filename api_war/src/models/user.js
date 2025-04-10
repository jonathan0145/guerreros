import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import UserStatus from './user_status.js';
import Warrior from './warrior.js';
import WarriorUser from './warrior_user.js';

class User extends Model {}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50]
    }
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
    allowNull: false
  },
  user_status_fk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    references: {
      model: UserStatus,
      key: 'user_status_id'
    }
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Definir las relaciones
User.belongsTo(UserStatus, { 
  foreignKey: 'user_status_fk',
  targetKey: 'user_status_id',
  as: 'status'  // Cambiado de 'UserStatus' a 'status' para coincidir con el controlador
});

User.belongsToMany(Warrior, {
  through: WarriorUser,
  foreignKey: 'user_id',
  otherKey: 'warrior_id',
  as: 'WarriorAssignments'  // Cambiado de 'AssignedWarriors' para coincidir con el controlador
});

export default User;