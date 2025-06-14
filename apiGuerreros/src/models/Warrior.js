const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Warrior = sequelize.define('Warrior', {
    warrior_id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    player_id: { 
      type: DataTypes.INTEGER 
    },
    name: { 
      type: DataTypes.STRING(50), 
      allowNull: false 
    },
    type_id: { 
      type: DataTypes.INTEGER 
    },
    race_id: { 
      type: DataTypes.INTEGER 
    },
    total_power: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    total_magic: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    health: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    speed: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    intelligence: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    status: { 
      type: DataTypes.STRING(20), 
      defaultValue: 'active' 
    }
}, {
  tableName: 'warriors',
  timestamps: false
});

// *** ASOCIACIONES DEFINIDAS CORRECTAMENTE DENTRO DE ASSOCIATE ***
Warrior.associate = (models) => {
    // Relación Warrior - Power (N:M)
    Warrior.belongsToMany(models.Power, { through: models.WarriorPower, as: 'powers', foreignKey: 'warrior_id' });

    // Relación Warrior - Spell (N:M) - Esto genera this.addSpell(), this.getSpells(), etc.
    Warrior.belongsToMany(models.Spell, { through: models.WarriorSpell, as: 'spells', foreignKey: 'warrior_id' });

    // Otras asociaciones de Warrior
    Warrior.belongsTo(models.Player, { foreignKey: 'player_id' });
    Warrior.belongsTo(models.WarriorType, { foreignKey: 'type_id' });
    Warrior.belongsTo(models.Race, { foreignKey: 'race_id' });
    Warrior.belongsToMany(models.Match, { through: models.MatchWarrior, foreignKey: 'warrior_id', otherKey: 'match_id' });
};

// Tus métodos de prototipo (updateTotalPower, updateTotalMagic) están bien aquí.
// Dependen de que .getPowers() y .getSpells() sean inyectados por Sequelize.
Warrior.prototype.updateTotalPower = async function() {
  const powers = await this.getPowers(); // Esto ahora funcionará
  const totalPower = powers.reduce((sum, power) => sum + power.percentage, 0);
  this.total_power = totalPower;
  await this.save();
};

Warrior.prototype.updateTotalMagic = async function() {
  const spells = await this.getSpells(); // Esto ahora funcionará
  const totalMagic = spells.reduce((sum, spell) => sum + spell.percentage, 0);
  this.total_magic = totalMagic;
  await this.save();
};

module.exports = Warrior;