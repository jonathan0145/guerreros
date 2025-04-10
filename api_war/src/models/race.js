import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

class Race extends Model {}

Race.init({
  race_id: {
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
  modelName: 'Race',
  tableName: 'races',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Race.associate = (models) => {
  Race.hasMany(models.Warrior, { foreignKey: 'race_id' });
};

export default Race;