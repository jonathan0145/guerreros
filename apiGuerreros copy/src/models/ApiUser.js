const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ApiUser = sequelize.define('ApiUser', {
    api_user_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    username: { 
        type: DataTypes.STRING(50), 
        allowNull: false, unique: true 
    },
    password_hash: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    role: { 
        type: DataTypes.ENUM('admin', 'service', 'read_only'), 
        defaultValue: 'read_only' 
    },
    api_token: { 
        type: DataTypes.STRING(255), 
        unique: true 
    }
}, {
  tableName: 'api_users',
  timestamps: false
});

module.exports = ApiUser;