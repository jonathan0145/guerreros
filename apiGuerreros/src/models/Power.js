const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Power = sequelize.define('Power', {
    power_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    percentage: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
  tableName: 'powers',
  timestamps: false
});

// *** AÑADIR MÉTODO ASSOCIATE ***
// Define la relación de muchos a muchos con Warrior
Power.associate = (models) => {
    Power.belongsToMany(models.Warrior, { through: models.WarriorPower, as: 'warriors', foreignKey: 'power_id' });
};

module.exports = Power;