import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      // Agrupar errores por campo
      const groupedErrors = errors.array().reduce((acc, error) => {
        if (!acc[error.param]) {
          acc[error.param] = [];
        }
        acc[error.param].push(error.msg);
        return acc;
      }, {});

      // Formatear los errores para una respuesta más clara
      const formattedErrors = Object.entries(groupedErrors).map(([campo, mensajes]) => ({
        campo,
        mensajes: mensajes.length === 1 ? mensajes[0] : mensajes
      }));

      return res.status(400).json({
        error: 'Error de validación',
        detalles: formattedErrors,
        mensaje: 'Por favor, corrija los errores en los campos indicados'
      });
    }

    next();
  } catch (error) {
    console.error('Error en validación de solicitud:', error);
    return res.status(500).json({
      error: 'Error al procesar la validación de la solicitud',
      detalles: error.message,
      mensaje: 'Ocurrió un error al validar los datos enviados'
    });
  }
}; 