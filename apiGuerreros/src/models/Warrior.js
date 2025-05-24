const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Power = require('./Power');
const Spell = require('./Spell');

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

// ### Paso 2: Llamar al Método de Actualización
// Asegúrate de llamar a este método cada vez que se modifiquen los poderes de un guerrero. Esto se puede hacer en el controlador o servicio donde se gestionan las asociaciones de poderes.

// ### Explicación
// - Método updateTotalPower : Este método obtiene todos los poderes asociados al guerrero, suma sus percentage , y actualiza el atributo total_power .
// - Uso del Método : Llama a updateTotalPower después de añadir o eliminar poderes de un guerrero para mantener el valor actualizado.
// Con estos cambios, el atributo total_power reflejará correctamente la suma de los porcentajes de todos los poderes asociados a un guerrero. Si necesitas más ayuda o detalles específicos, no dudes en preguntar.

// ### Paso 2: Llamar al Método de Actualización
// Asegúrate de llamar al método updateTotalMagic cada vez que se modifiquen los hechizos de un guerrero. Esto se puede hacer en el controlador o servicio donde se gestionan las asociaciones de hechizos.

// ### Explicación
// - Método updateTotalMagic : Este método obtiene todos los hechizos asociados al guerrero, suma sus percentage , y actualiza el atributo total_magic .
// - Uso del Método : Llama a updateTotalMagic después de añadir o eliminar hechizos de un guerrero para mantener el valor actualizado.
// Con estos cambios, el atributo total_magic reflejará correctamente la suma de los porcentajes de todos los hechizos asociados a un guerrero. Si necesitas más ayuda o detalles específicos, no dudes en preguntar.

// quiero saber como manejar eso de los poderes