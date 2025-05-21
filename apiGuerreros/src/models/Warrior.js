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
      allowNull: false 
    },
    total_magic: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
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

module.exports = Warrior;