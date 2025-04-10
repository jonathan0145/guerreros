import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
// Fix import capitalization
import User from './user.js';  // Changed from 'user'

const Profile = sequelize.define('profile', {
  profile_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  profile_name: {
    type: DataTypes.STRING(20),
    allowNull: false  // Added
  },
  profile_last_name: {
    type: DataTypes.STRING(20),
  },
  profile_document: {
    type: DataTypes.STRING(11),
  },
  profile_email: {
    type: DataTypes.STRING(30),
  },
  profile_phone: {
    type: DataTypes.STRING(11),
  },
  profile_photo: {
    type: DataTypes.STRING(100),
  },
  profile_address: {
    type: DataTypes.STRING(30),
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'profiles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Fix association
Profile.belongsTo(User, {  // Changed from user to User
  foreignKey: 'user_id',
  targetKey: 'user_id',
  as: 'user'  // Added alias
});

export default Profile;