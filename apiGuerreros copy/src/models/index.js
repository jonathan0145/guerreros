const Player = require('./Player');
const Warrior = require('./Warrior');
const WarriorType = require('./WarriorType');
const Race = require('./Race');
const Power = require('./Power');
const Spell = require('./Spell');
const WarriorPower = require('./WarriorPower');
const WarriorSpell = require('./WarriorSpell');
const Match = require('./Match');
const MatchPlayer = require('./MatchPlayer');
const MatchWarrior = require('./MatchWarrior');
const PlayerStat = require('./PlayerStat');
const Ranking = require('./Ranking');

// Relación Player - Warrior (1:N)
Player.hasMany(Warrior, { foreignKey: 'player_id' });
Warrior.belongsTo(Player, { foreignKey: 'player_id' });

// Relación Warrior - WarriorType (N:1)
Warrior.belongsTo(WarriorType, { foreignKey: 'type_id' });
WarriorType.hasMany(Warrior, { foreignKey: 'type_id' });

// Relación Warrior - Race (N:1)
Warrior.belongsTo(Race, { foreignKey: 'race_id' });
Race.hasMany(Warrior, { foreignKey: 'race_id' });

// Relación Warrior - Power (N:M)
Warrior.belongsToMany(Power, { through: 'WarriorPower', as: 'powers' });
Power.belongsToMany(Warrior, { through: 'WarriorPower', as: 'warriors' });

// Relación Warrior - Spell (N:M)
Warrior.belongsToMany(Spell, { through: 'WarriorSpell', as: 'spells' });
Spell.belongsToMany(Warrior, { through: 'WarriorSpell', as: 'warriors' });

// Relación Match - Player (N:M)
Match.belongsToMany(Player, { through: MatchPlayer, foreignKey: 'match_id', otherKey: 'player_id' });
Player.belongsToMany(Match, { through: MatchPlayer, foreignKey: 'player_id', otherKey: 'match_id' });

// Relación Match - Warrior (N:M)
Match.belongsToMany(Warrior, { through: MatchWarrior, foreignKey: 'match_id', otherKey: 'warrior_id', as:'warriorsInMatch' });
Warrior.belongsToMany(Match, { through: MatchWarrior, foreignKey: 'warrior_id', otherKey: 'match_id' });

// Relación Player - PlayerStat (1:1)
Player.hasOne(PlayerStat, { foreignKey: 'player_id' });
PlayerStat.belongsTo(Player, { foreignKey: 'player_id' });

// Relación Player - Ranking (1:1)
Player.hasOne(Ranking, { foreignKey: 'player_id' });
Ranking.belongsTo(Player, { foreignKey: 'player_id' });

module.exports = {
  Player,
  Warrior,
  WarriorType,
  Race,
  Power,
  Spell,
  WarriorPower,
  WarriorSpell,
  Match,
  MatchPlayer,
  MatchWarrior,
  PlayerStat,
  Ranking
};