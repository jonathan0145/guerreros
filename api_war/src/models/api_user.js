import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js'; // Asegúrate de que la ruta sea correcta

const ApiUser = sequelize.define('ApiUser', {
  api_user_id: {  // Changed from Api_user_id
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  api_user: {     // Changed from Api_user
    type: DataTypes.STRING(60),
    allowNull: false,  // Changed from true
  },
  api_password: { // Changed from Api_password
    type: DataTypes.STRING(255),
    allowNull: false,  // Changed from true
  },
  api_role: {     // Changed from Api_role
    type: DataTypes.ENUM('admin', 'read-only'),
    allowNull: false,  // Changed from true
    defaultValue: 'read-only'
  },
  api_status: {   // Changed from Api_status
    type: DataTypes.STRING(255),
    allowNull: false,  // Changed from true
    defaultValue: 'active'
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
  tableName: 'api_users',
});

export default ApiUser;