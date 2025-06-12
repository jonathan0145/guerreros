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
    total_power: { // saber como manejar lo de poder y magia
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

// *********** ¡AQUÍ ES DONDE VAN LAS ASOCIACIONES! ***********
Warrior.associate = (models) => {
    // Relación Warrior - Power (N:M)
    // 'models.Power' y 'models.WarriorPower' son pasados por el index.js central
    Warrior.belongsToMany(models.Power, { through: models.WarriorPower, as: 'powers', foreignKey: 'warrior_id' });

    // Relación Warrior - Spell (N:M)
    Warrior.belongsToMany(models.Spell, { through: models.WarriorSpell, as: 'spells', foreignKey: 'warrior_id' });

    // Otras asociaciones de Warrior
    Warrior.belongsTo(models.Player, { foreignKey: 'player_id' });
    Warrior.belongsTo(models.WarriorType, { foreignKey: 'type_id' });
    Warrior.belongsTo(models.Race, { foreignKey: 'race_id' });
    Warrior.belongsToMany(models.Match, { through: models.MatchWarrior, foreignKey: 'warrior_id', otherKey: 'match_id' });
};

// // En Warrior.js
// Warrior.prototype.addPower = async function(power) {
//   await WarriorPower.create({ warrior_id: this.warrior_id, power_id: power.power_id });
// };

// Warrior.prototype.addSpell = async function(spell) {
//   await WarriorSpell.create({ warrior_id: this.warrior_id, spell_id: spell.spell_id });
// };

Warrior.prototype.updateTotalPower = async function() {
  const powers = await this.getPowers(); // Obtener poderes asociados
  const totalPower = powers.reduce((sum, power) => sum + power.percentage, 0);
  this.total_power = totalPower;
  await this.save();
};

Warrior.prototype.updateTotalMagic = async function() {
  const spells = await this.getSpells(); // Obtener hechizos asociados
  const totalMagic = spells.reduce((sum, spell) => sum + spell.percentage, 0);
  this.total_magic = totalMagic;
  await this.save();
};

module.exports = Warrior;