import User from './user.js';
import UserStatus from './user_status.js';
import Warrior from './warrior.js';
import Race from './race.js';
import WarriorType from './warrior_type.js';
import Game from './game.js';
import GamePlayer from './game_player.js';
import GameWarrior from './game_warrior.js';
import PlayerStats from './player_stats.js';
import WarriorUser from './warrior_user.js';
import Power from './power.js';  // Added Power import

// Relaciones User-UserStatus
User.belongsTo(UserStatus, {
  foreignKey: 'user_status_fk',
  as: 'status'
});

UserStatus.hasMany(User, {
  foreignKey: 'user_status_fk',
  as: 'users'
});

User.hasMany(Warrior, {
  foreignKey: 'user_id',
  as: 'owned_warriors'  // Changed from OwnedWarriors
});

User.hasMany(Game, {
  foreignKey: 'created_by',
  as: 'created_games'  // Changed from CreatedGames
});

User.hasMany(GamePlayer, {
  foreignKey: 'user_id',
  as: 'GameParticipations'
});

User.hasOne(PlayerStats, {
  foreignKey: 'user_id',
  as: 'PlayerStats'
});

// Relaciones de Warrior
Warrior.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'owner'  // Changed from Owner
});

Warrior.belongsTo(Race, {
  foreignKey: 'race_id',
  as: 'race'  // Changed from Race
});

// Add Power relations
Warrior.belongsToMany(Power, {
  through: 'warrior_powers',
  foreignKey: 'warrior_id',
  otherKey: 'power_id',
  as: 'powers'
});

Power.belongsToMany(Warrior, {
  through: 'warrior_powers',
  foreignKey: 'power_id',
  otherKey: 'warrior_id',
  as: 'warriors'
});

Warrior.belongsTo(WarriorType, {
  foreignKey: 'type_id',
  as: 'Type'
});

Warrior.hasMany(GameWarrior, {
  foreignKey: 'warrior_id',
  as: 'GameParticipations'
});

// Relaciones de Game
Game.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator'  // Changed from GameCreator
});

Game.belongsTo(User, {
  foreignKey: 'winner_id',
  as: 'winner'  // Changed from GameWinner
});

Game.hasMany(GamePlayer, {
  foreignKey: 'game_id',
  as: 'Players'
});

Game.hasMany(GameWarrior, {
  foreignKey: 'game_id',
  as: 'warriors',  // Changed from GameWarriors
  onDelete: 'CASCADE'
});

// Relaciones de GamePlayer
GamePlayer.belongsTo(Game, {
  foreignKey: 'game_id',
  as: 'Game'
});

GamePlayer.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'PlayerUser'
});

// Relaciones de GameWarrior
GameWarrior.belongsTo(Game, {
  foreignKey: 'game_id',
  as: 'Game'
});

GameWarrior.belongsTo(Warrior, {
  foreignKey: 'warrior_id',
  as: 'Warrior'
});

GameWarrior.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'WarriorOwner'
});

// Relaciones de PlayerStats
PlayerStats.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'StatsOwner'
});

// Relaciones de Race
Race.hasMany(Warrior, {
  foreignKey: 'race_id',
  as: 'RaceWarriors'
});

// Relaciones de WarriorType
WarriorType.hasMany(Warrior, {
  foreignKey: 'type_id',
  as: 'TypeWarriors'
});

// Relaciones de WarriorUser
WarriorUser.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'User'
});

WarriorUser.belongsTo(Warrior, {
  foreignKey: 'warrior_id',
  as: 'Warrior'
});

// Relaciones inversas para WarriorUser
User.hasMany(WarriorUser, {
  foreignKey: 'user_id',
  as: 'WarriorAssignments'
});

Warrior.hasMany(WarriorUser, {
  foreignKey: 'warrior_id',
  as: 'UserAssignments'
});

// Export all models at the end
export {
  User,
  UserStatus,
  Warrior,
  Race,
  WarriorType,
  Game,
  GamePlayer,
  GameWarrior,
  PlayerStats,
  WarriorUser,
  Power
};