const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const WarriorType = sequelize.define('WarriorType', {
    type_id: { 
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
  tableName: 'warrior_types',
  timestamps: false
});

// *** ¡AÑADIR ESTE MÉTODO ASSOCIATE! ***
WarriorType.associate = (models) => {
    // Relación WarriorType - Warrior (1:N)
    // Un tipo de guerrero puede tener muchos guerreros de ese tipo.
    WarriorType.hasMany(models.Warrior, { foreignKey: 'type_id' });
};

module.exports = WarriorType;