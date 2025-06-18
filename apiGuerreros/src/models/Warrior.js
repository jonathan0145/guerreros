// src/models/Warrior.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Warrior extends Model {
    static associate(models) {
      Warrior.belongsToMany(models.Power, { through: models.WarriorPower, as: 'powers', foreignKey: 'warrior_id' });
      Warrior.belongsToMany(models.Spell, { through: models.WarriorSpell, as: 'spells', foreignKey: 'warrior_id' });
      Warrior.belongsTo(models.Player, { foreignKey: 'player_id' });
      Warrior.belongsTo(models.WarriorType, { foreignKey: 'type_id' });
      Warrior.belongsTo(models.Race, { foreignKey: 'race_id' });
      Warrior.belongsToMany(models.Match, { through: models.MatchWarrior, foreignKey: 'warrior_id', otherKey: 'match_id' });
    }
  }
  Warrior.init({
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
    sequelize,
    tableName: 'warriors',
    modelName: 'Warrior',
    timestamps: false
  });

  // Tus métodos de prototipo están bien aquí, ya que 'Warrior' es la clase del modelo
  Warrior.prototype.updateTotalPower = async function() {
    const powers = await this.getPowers();
    const totalPower = powers.reduce((sum, power) => sum + power.percentage, 0);
    this.total_power = totalPower;
    await this.save();
  };

  Warrior.prototype.updateTotalMagic = async function() {
    const spells = await this.getSpells();
    const totalMagic = spells.reduce((sum, spell) => sum + spell.percentage, 0);
    this.total_magic = totalMagic;
    await this.save();
  };

  return Warrior;
};