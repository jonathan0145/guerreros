# API War Game

API para un juego de guerra basado en guerreros con diferentes razas y tipos.

## Descripción

Esta API proporciona endpoints para gestionar un juego de guerra donde los jugadores pueden crear guerreros con diferentes razas y tipos, cada uno con sus propias estadísticas y habilidades.

## Requisitos Previos

- Node.js (v18 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd api_war
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=war_game_dev
PORT=3000
```

4. Ejecutar migraciones y seeders:
```bash
npx sequelize-cli db:migrate
node scripts/seed.js
```

## Estructura del Proyecto

```
api_war/
├── src/
│   ├── models/         # Modelos de Sequelize
│   ├── controllers/    # Controladores de la API
│   ├── routes/         # Rutas de la API
│   ├── middleware/     # Middleware personalizado
│   └── config/         # Configuraciones
├── migrations/         # Archivos de migración
├── seeders/           # Archivos de seeders
├── tests/             # Pruebas unitarias
└── scripts/           # Scripts de utilidad
```

## Modelos Principales

### User
- Representa a un usuario del sistema
- Campos principales: user_id, user_user, user_password, user_status_id

### Race
- Representa una raza de guerrero
- Campos principales: race_id, name, description, strength, defense, speed, intelligence

### WarriorType
- Representa un tipo de guerrero
- Campos principales: warrior_type_id, name, description, base_strength, base_defense, base_speed, base_intelligence

### Warrior
- Representa a un guerrero
- Campos principales: warrior_id, name, race_id, warrior_type_id, strength, defense, speed, intelligence, status

### Power
- Representa un poder que puede tener un guerrero
- Campos principales: power_id, name, description, percentage

### Spell
- Representa un hechizo que puede tener un guerrero
- Campos principales: spell_id, name, description, percentage

## Endpoints Principales

### Usuarios
- `POST /war/user` - Crear un nuevo usuario
- `GET /war/user/:id` - Obtener información de un usuario
- `PUT /war/user/:id` - Actualizar información de un usuario
- `DELETE /war/user/:id` - Eliminar un usuario

### Guerreros
- `POST /war/warrior` - Crear un nuevo guerrero
- `GET /war/warrior/:id` - Obtener información de un guerrero
- `PUT /war/warrior/:id` - Actualizar información de un guerrero
- `DELETE /war/warrior/:id` - Eliminar un guerrero

### Razas
- `GET /war/race` - Obtener todas las razas
- `GET /war/race/:id` - Obtener información de una raza

### Tipos de Guerrero
- `GET /war/warrior-type` - Obtener todos los tipos de guerrero
- `GET /war/warrior-type/:id` - Obtener información de un tipo de guerrero

## Desarrollo

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

Para ejecutar las pruebas:
```bash
npm test
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm test` - Ejecuta las pruebas unitarias
- `npm run seed` - Ejecuta los seeders
- `npm run migrate` - Ejecuta las migraciones

## Pruebas

El proyecto incluye pruebas unitarias para los modelos principales:
- Race
- WarriorType
- Warrior

Para ejecutar las pruebas:
```bash
npm test
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
