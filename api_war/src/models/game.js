import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

class Game extends Model {
  // Método para calcular el ganador basado en el modo de juego
  async calculateWinner() {
    const players = await this.getPlayers({
      include: [{
        association: 'GameWarriors',
        include: ['Warrior']
      }]
    });

    if (players.length !== 2) return null;

    const [player1, player2] = players;
    let score1 = 0, score2 = 0;

    // Calcular puntuación según el modo de juego
    switch (this.game_mode) {
      case 'power':
        score1 = player1.GameWarriors.reduce((sum, gw) => sum + gw.Warrior.power, 0);
        score2 = player2.GameWarriors.reduce((sum, gw) => sum + gw.Warrior.power, 0);
        break;
      case 'magic':
        score1 = player1.GameWarriors.reduce((sum, gw) => sum + gw.Warrior.magic, 0);
        score2 = player2.GameWarriors.reduce((sum, gw) => sum + gw.Warrior.magic, 0);
        break;
      case 'combined':
        score1 = player1.GameWarriors.reduce((sum, gw) => 
          sum + gw.Warrior.power + gw.Warrior.magic, 0);
        score2 = player2.GameWarriors.reduce((sum, gw) => 
          sum + gw.Warrior.power + gw.Warrior.magic, 0);
        break;
    }

    return score1 > score2 ? player1.user_id : 
           score2 > score1 ? player2.user_id : null;
  }

  // Método para verificar si la partida puede comenzar
  async canStart() {
    const players = await this.countPlayers();
    const warriors = await this.countGameWarriors();
    
    return players === 2 && warriors === 10; // 2 jugadores con 5 guerreros cada uno
  }

  // Método para obtener el estado actual de la partida
  async getGameState() {
    const players = await this.getPlayers({
      include: [
        {
          association: 'PlayerUser',
          attributes: ['User_id', 'User_user']
        },
        {
          association: 'GameWarriors',
          include: ['Warrior']
        }
      ]
    });

    return {
      game_id: this.game_id,
      game_mode: this.game_mode,
      status: this.status,
      current_turn: this.current_turn,
      round: this.round,
      players: players.map(player => ({
        user_id: player.PlayerUser.user_id,  // Changed from User_id
        username: player.PlayerUser.user_name,  // Changed from User_user
        warriors: player.GameWarriors.map(gw => ({
          warrior_id: gw.Warrior.warrior_id,  // Changed from Warrior_id
          name: gw.Warrior.warrior_name,  // Changed from Warrior_name
          health: gw.current_health,
          power: gw.Warrior.power,
          magic: gw.Warrior.magic
        }))
      }))
    };
  }
}

Game.init({
  game_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  game_mode: {
    type: DataTypes.ENUM('power', 'magic', 'combined'),
    allowNull: false,
    comment: 'power: combate por poder, magic: combate por magia, combined: suma de poder y magia'
  },
  status: {
    type: DataTypes.ENUM('waiting', 'in_progress', 'finished'),
    allowNull: false,
    defaultValue: 'waiting',
  },
  winner_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_turn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '1: primer jugador, 2: segundo jugador'
  },
  round: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  points_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
    comment: 'Puntos disponibles para el ganador'
  },
  started_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  finished_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Game',
  tableName: 'GAME',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Game;