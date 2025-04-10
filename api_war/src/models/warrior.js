import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import User from './user.js';
import WarriorUser from './warrior_user.js';

class Warrior extends Model {
  // Método para verificar si el guerrero puede ser usado en una partida
  async canJoinGame() {
    const activeGames = await this.countActiveGames();
    return activeGames === 0;
  }

  // Método para obtener las estadísticas del guerrero
  async getStats() {
    const stats = await this.getGameWarriors();
    return {
      total_games: stats.length,
      victories: stats.filter(gw => gw.Game.winner_id === this.user_id).length,
      total_damage_dealt: stats.reduce((sum, gw) => sum + gw.damage_dealt, 0),
      total_damage_taken: stats.reduce((sum, gw) => sum + gw.damage_taken, 0),
      favorite_mode: this.calculateFavoriteMode(stats)
    };
  }

  // Método privado para calcular el modo de juego favorito
  calculateFavoriteMode(gameWarriors) {
    const modes = gameWarriors.reduce((acc, gw) => {
      const mode = gw.Game.game_mode;
      acc[mode] = (acc[mode] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(modes).reduce((a, b) => 
      modes[a] > modes[b] ? a : b)[0];
  }
}

Warrior.init({
  warrior_id: {  // Cambiado de Warrior_id
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  warrior_name: {  // Cambiado de Warrior_name
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [3, 50]
    }
  },
  race_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  power: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
    validate: {
      min: 0,
      max: 1000
    }
  },
  magic: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
    validate: {
      min: 0,
      max: 1000
    }
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
    validate: {
      min: 0,
      max: 2000
    }
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 100
    }
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  victories: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  defeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Warrior',
  tableName: 'warriors',  // Cambiado de WARRIOR a warriors
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['race_id']
    },
    {
      fields: ['type_id']
    }
  ]
});

// Update relations
Warrior.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'owner'  // Changed from Owner to lowercase
});

Warrior.belongsTo(WarriorType, {
  foreignKey: 'type_id',
  as: 'type'
});

Warrior.belongsTo(Race, {
  foreignKey: 'race_id',
  as: 'race'
});

Warrior.belongsToMany(User, {
  through: WarriorUser,
  foreignKey: 'warrior_id',
  otherKey: 'user_id',
  as: 'assigned_users'  // Changed from AssignedUsers to snake_case
});

export default Warrior;