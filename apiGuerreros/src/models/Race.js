const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Race = sequelize.define('Race', {
    race_id: { 
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
    }
}, {
  tableName: 'races',
  timestamps: false
});

// *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
Race.associate = (models) => {
    // Relación Race - Warrior (1:N)
    // Una raza puede tener muchos guerreros de esa raza.
    Race.hasMany(models.Warrior, { foreignKey: 'race_id' });
};

module.exports = Race;