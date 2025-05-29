const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Power = require('./Power');
const Spell = require('./Spell');
const WarriorPower = require('./WarriorPower'); 
const WarriorSpell = require('./WarriorSpell');

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

// En Warrior.js
Warrior.prototype.addPower = async function(power) {
  await WarriorPower.create({ warrior_id: this.warrior_id, power_id: power.power_id });
};

Warrior.prototype.addSpell = async function(spell) {
  await WarriorSpell.create({ warrior_id: this.warrior_id, spell_id: spell.spell_id });
};

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