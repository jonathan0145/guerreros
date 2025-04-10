import { body, validationResult } from 'express-validator';
import { Race, WarriorType } from '../../models/index.js';

export const validateWarriorCreation = [
  body('warrior_name')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre del guerrero debe tener entre 3 y 50 caracteres'),

  body('race_id')
    .isInt()
    .withMessage('La raza debe ser un ID válido')
    .custom(async (value) => {
      const race = await Race.findByPk(value);
      if (!race) {
        throw new Error('La raza seleccionada no existe');
      }
      return true;
    }),

  body('type_id')
    .isInt()
    .withMessage('El tipo debe ser un ID válido')
    .custom(async (value) => {
      const type = await WarriorType.findByPk(value);
      if (!type) {
        throw new Error('El tipo de guerrero seleccionado no existe');
      }
      return true;
    }),

  body('power')
    .isInt({ min: 50, max: 200 })
    .withMessage('El poder debe estar entre 50 y 200'),

  body('magic')
    .isInt({ min: 30, max: 200 })
    .withMessage('La magia debe estar entre 30 y 200'),

  body('health')
    .isInt({ min: 800, max: 1500 })
    .withMessage('La salud debe estar entre 800 y 1500'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Error en los datos del guerrero',
        errors: errors.array() 
      });
    }
    next();
  }
];

export const validatePowerAssignment = [
  body('power_id')
    .isInt()
    .withMessage('El ID del poder debe ser un número válido'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Error en la asignación del poder',
        errors: errors.array() 
      });
    }
    next();
  }
];

export const validateSpellAssignment = [
  body('spell_id')
    .isInt()
    .withMessage('El ID del hechizo debe ser un número válido'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Error en la asignación del hechizo',
        errors: errors.array() 
      });
    }
    next();
  }
];