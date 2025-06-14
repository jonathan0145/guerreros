const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Spell = sequelize.define('Spell', {
    spell_id: { 
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
  tableName: 'spells',
  timestamps: false
});

// *** AÑADIR MÉTODO ASSOCIATE ***
Spell.associate = (models) => {
    // Relación Spell - Warrior (N:M)
    Spell.belongsToMany(models.Warrior, { through: models.WarriorSpell, as: 'warriors', foreignKey: 'spell_id' });
};

module.exports = Spell;