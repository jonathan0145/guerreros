import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

class GameWarrior extends Model {
  // Método para aplicar daño al guerrero
  async takeDamage(amount) {
    const newHealth = Math.max(0, this.current_health - amount);
    await this.update({
      current_health: newHealth,
      damage_taken: this.damage_taken + amount
    });
    return { newHealth };
  }

  // Método para curar al guerrero
  async heal(amount) {
    const healAmount = Math.min(
      amount,
      this.max_health - this.current_health
    );
    const newHealth = this.current_health + healAmount;
    await this.update({
      current_health: newHealth
    });
    return { newHealth, healAmount };
  }

  // Método para verificar si el guerrero está vivo
  isAlive() {
    return this.current_health > 0;
  }

  // Método para obtener el poder de ataque según el modo de juego
  async getAttackPower(gameMode) {
    const warrior = await this.getWarrior();
    switch (gameMode) {
      case 'power':
        return warrior.power;
      case 'magic':
        return warrior.magic;
      case 'combined':
        return warrior.power + warrior.magic;
      default:
        return 0;
    }
  }
}

GameWarrior.init({
  game_warrior_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  warrior_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  max_health: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_health: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  damage_dealt: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  damage_taken: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  actions_taken: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('active', 'defeated'),
    allowNull: false,
    defaultValue: 'active'
  }
}, {
  sequelize,
  modelName: 'GameWarrior',
  tableName: 'game_warriors',  // Changed from GAME_WARRIOR
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['game_id']
    },
    {
      fields: ['warrior_id']
    },
    {
      fields: ['user_id']
    }
  ]
});

export default GameWarrior;