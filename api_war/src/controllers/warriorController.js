import { Warrior, Race, WarriorType, Power, Spell } from '../models/index.js';

class WarriorController {
  async getAllWarriors(req, res) {
    try {
      const warriors = await Warrior.findAll({
        include: [
          { model: Race, as: 'race' },
          { model: WarriorType, as: 'type' },
          { model: Power, as: 'powers' },
          { model: Spell, as: 'spells' }
        ]
      });
      res.json(warriors);
    } catch (error) {
      console.error('Error obteniendo guerreros:', error);
      res.status(500).json({ message: 'Error al obtener los guerreros' });
    }
  }

  async getWarriorById(req, res) {
    try {
      const warrior = await Warrior.findByPk(req.params.id, {
        include: [
          { model: Race, as: 'race' },
          { model: WarriorType, as: 'type' },
          { model: Power, as: 'powers' },
          { model: Spell, as: 'spells' }
        ]
      });

      if (!warrior) {
        return res.status(404).json({ message: 'Guerrero no encontrado' });
      }

      res.json(warrior);
    } catch (error) {
      console.error('Error obteniendo guerrero:', error);
      res.status(500).json({ message: 'Error al obtener el guerrero' });
    }
  }

  async createWarrior(req, res) {
    try {
      const { warrior_name, race_id, type_id, power, magic, health } = req.body;

      const warrior = await Warrior.create({
        warrior_name,
        race_id,
        type_id,
        user_id: req.user.user_id,
        power,
        magic,
        health,
        level: 1,
        experience: 0,
        victories: 0,
        defeats: 0
      });

      res.status(201).json({
        message: 'Guerrero creado exitosamente',
        warrior
      });
    } catch (error) {
      console.error('Error creando guerrero:', error);
      res.status(500).json({ message: 'Error al crear el guerrero' });
    }
  }

  async updateWarrior(req, res) {
    try {
      const warrior = await Warrior.findByPk(req.params.id);

      if (!warrior) {
        return res.status(404).json({ message: 'Guerrero no encontrado' });
      }

      if (warrior.user_id !== req.user.user_id) {
        return res.status(403).json({ message: 'No tienes permiso para modificar este guerrero' });
      }

      await warrior.update(req.body);
      res.json({
        message: 'Guerrero actualizado exitosamente',
        warrior
      });
    } catch (error) {
      console.error('Error actualizando guerrero:', error);
      res.status(500).json({ message: 'Error al actualizar el guerrero' });
    }
  }

  async deleteWarrior(req, res) {
    try {
      const warrior = await Warrior.findByPk(req.params.id);

      if (!warrior) {
        return res.status(404).json({ message: 'Guerrero no encontrado' });
      }

      if (warrior.user_id !== req.user.user_id) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este guerrero' });
      }

      await warrior.destroy();
      res.json({ message: 'Guerrero eliminado exitosamente' });
    } catch (error) {
      console.error('Error eliminando guerrero:', error);
      res.status(500).json({ message: 'Error al eliminar el guerrero' });
    }
  }

  async getMyWarriors(req, res) {
    try {
      const warriors = await Warrior.findAll({
        where: { user_id: req.user.user_id },
        include: [
          { model: Race, as: 'race' },
          { model: WarriorType, as: 'type' },
          { model: Power, as: 'powers' },
          { model: Spell, as: 'spells' }
        ]
      });
      res.json(warriors);
    } catch (error) {
      console.error('Error obteniendo mis guerreros:', error);
      res.status(500).json({ message: 'Error al obtener tus guerreros' });
    }
  }

  async assignPower(req, res) {
    try {
      const { power_id } = req.body;
      const warrior = await Warrior.findByPk(req.params.id);

      if (!warrior) {
        return res.status(404).json({ message: 'Guerrero no encontrado' });
      }

      if (warrior.user_id !== req.user.user_id) {
        return res.status(403).json({ message: 'No tienes permiso para modificar este guerrero' });
      }

      await warrior.addPower(power_id);
      res.json({ message: 'Poder asignado exitosamente' });
    } catch (error) {
      console.error('Error asignando poder:', error);
      res.status(500).json({ message: 'Error al asignar el poder' });
    }
  }

  async assignSpell(req, res) {
    try {
      const { spell_id } = req.body;
      const warrior = await Warrior.findByPk(req.params.id);

      if (!warrior) {
        return res.status(404).json({ message: 'Guerrero no encontrado' });
      }

      if (warrior.user_id !== req.user.user_id) {
        return res.status(403).json({ message: 'No tienes permiso para modificar este guerrero' });
      }

      await warrior.addSpell(spell_id);
      res.json({ message: 'Hechizo asignado exitosamente' });
    } catch (error) {
      console.error('Error asignando hechizo:', error);
      res.status(500).json({ message: 'Error al asignar el hechizo' });
    }
  }
}

export default new WarriorController();