import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import User from './user.js';  // Agregar esta importación

class UserStatus extends Model {}

UserStatus.init({
  user_status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_status_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  user_status_description: {
    type: DataTypes.STRING(80),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'UserStatus',
  tableName: 'user_statuses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Agregar la relación inversa
UserStatus.hasMany(User, {
  foreignKey: 'user_status_fk',
  sourceKey: 'user_status_id',
  as: 'users'
});

export default UserStatus;