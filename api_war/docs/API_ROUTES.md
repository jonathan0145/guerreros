# Documentación de Rutas API - War Game

## Base URL
Todas las rutas comienzan con: `http://localhost:3000/war`

## Health Check
```http
GET /health

Respuesta (200):
{
  "status": "OK",
  "timestamp": "2024-04-05T12:00:00Z",
  "version": "1.0.0"
}
```

## Rutas Públicas (No requieren autenticación)

### Autenticación (/auth)

#### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "user_user": "guerrero1",
  "user_email": "guerrero1@example.com",
  "user_password": "123456",
  "user_role": "user",
  "user_status_fk": 1
}

Respuesta (201):
{
  "token": "jwt_token",
  "user": {
    "user_id": 1,
    "user_user": "guerrero1",
    "user_email": "guerrero1@example.com",
    "user_status_fk": 1,
    "user_role": "user"
  }
}

Validaciones:
- user_user: Requerido, único, entre 3 y 50 caracteres
- user_email: Requerido, único, formato email válido
- user_password: Requerido, mínimo 6 caracteres
- user_role: Opcional, valores permitidos: "user" o "admin", por defecto "user"
- user_status_fk: Opcional, por defecto 1 (Activo)
```

#### Inicio de Sesión
```http
POST /auth/login
Content-Type: application/json

{
  "user_user": "guerrero1",
  "user_password": "123456"
}

Respuesta (200):
{
  "token": "jwt_token",
  "user": {
    "user_id": 1,
    "user_user": "guerrero1",
    "user_status_fk": 1,
    "user_status_name": "Activo"
  }
}
```

## Rutas Protegidas (Requieren autenticación)

Para todas las rutas protegidas, incluir el header:
```http
Authorization: Bearer <token>
```

### Verificación de Token
```http
GET /auth/verify

Respuesta (200):
{
  "user": {
    "user_id": 1,
    "user_user": "guerrero1",
    "user_status_fk": 1,
    "user_status_name": "Activo"
  }
}
```

### Usuarios (/users)

#### Listar Usuarios
```http
GET /users

Respuesta (200):
[
  {
    "user_id": 1,
    "user_user": "guerrero1",
    "user_email": "guerrero1@example.com",
    "user_status_fk": 1,
    "user_role": "user",
    "UserStatus": {
      "user_status_name": "Activo"
    }
  }
]
```

#### Obtener Usuario por ID
```http
GET /users/:id

Respuesta (200):
{
  "user_id": 1,
  "user_user": "guerrero1",
  "user_email": "guerrero1@example.com",
  "user_status_fk": 1,
  "user_role": "user",
  "UserStatus": {
    "user_status_name": "Activo"
  },
  "Warriors": []
}
```

#### Obtener Perfil Propio
```http
GET /users/profile

Respuesta (200):
{
  "user_id": 1,
  "user_user": "guerrero1",
  "user_email": "guerrero1@example.com",
  "user_status_fk": 1,
  "user_role": "user",
  "UserStatus": {
    "user_status_name": "Activo"
  },
  "Warriors": []
}
```

#### Actualizar Perfil
```http
PUT /users/profile
Content-Type: application/json

{
  "user_user": "nuevo_guerrero",
  "user_email": "nuevo@email.com",
  "user_password": "nueva_contraseña123"
}

Respuesta (200):
{
  "message": "Perfil actualizado correctamente",
  "user": {
    "user_id": 1,
    "user_user": "nuevo_guerrero",
    "user_email": "nuevo@email.com",
    "user_status_fk": 1
  }
}
```

#### Eliminar Usuario (Solo Admin)
```http
DELETE /users/:id

Respuesta (204):
No content
```

## Códigos de Estado HTTP

- 200: OK - Petición exitosa
- 201: Created - Recurso creado exitosamente
- 204: No Content - Petición exitosa sin contenido que devolver
- 400: Bad Request - Error en la petición o validación
- 401: Unauthorized - Token no proporcionado o inválido
- 403: Forbidden - Token válido pero sin permisos suficientes
- 404: Not Found - Recurso no encontrado
- 500: Internal Server Error - Error del servidor

## Formato de Errores

### Error de Validación
```json
{
  "error": {
    "message": "El nombre de usuario debe tener al menos 3 caracteres",
    "status": 400
  }
}
```

### Error de Autenticación
```json
{
  "error": {
    "message": "No tienes permisos para realizar esta acción",
    "status": 403
  }
}
```

### Error de Recurso No Encontrado
```json
{
  "error": {
    "message": "Usuario no encontrado",
    "status": 404
  }
}
```

## Notas Importantes

1. Todas las rutas comienzan con `/war`
2. Las rutas protegidas requieren token JWT válido en el header `Authorization: Bearer <token>`
3. Los nombres de campos siguen el formato `user_campo` para usuarios (ejemplo: `user_user`, `user_email`)
4. Todas las respuestas de error incluyen un objeto `error` con `message` y `status`
5. Las contraseñas nunca se devuelven en las respuestas
6. El estado de usuario 1 representa "Activo"
7. Solo los usuarios con rol "admin" pueden eliminar otros usuarios
8. Los tokens JWT expiran después de 24 horas
9. Todas las fechas se manejan en formato ISO 8601

## Usuarios

### GET /api/users/profile
Obtiene el perfil del usuario autenticado.

### PUT /api/users/profile
Actualiza el perfil del usuario.
```json
{
  "name": "string",
  "lastName": "string",
  "document": "string",
  "email": "string",
  "phone": "string",
  "address": "string"
}
```

### GET /api/users/stats
Obtiene las estadísticas del usuario.

## Guerreros (Warriors)

### Listar Guerreros
```http
GET /warriors

Respuesta (200):
[
  {
    "warrior_id": 1,
    "warrior_name": "Guerrero1",
    "race_id": 1,
    "type_id": 1,
    "strength": 100,
    "defense": 80,
    "speed": 90,
    "intelligence": 85,
    "status": "active",
    "Race": {
      "name": "Elfo",
      "description": "Raza ágil y mágica"
    },
    "Type": {
      "name": "Arquero",
      "description": "Especialista en ataques a distancia"
    }
  }
]
```

### Crear Guerrero
```http
POST /warriors
Content-Type: application/json

{
  "warrior_name": "Guerrero1",
  "race_id": 1,
  "type_id": 1,
  "strength": 100,
  "defense": 80,
  "speed": 90,
  "intelligence": 85,
  "status": "active"
}

Respuesta (201):
{
  "message": "Guerrero creado exitosamente",
  "warrior": {
    "warrior_id": 1,
    "warrior_name": "Guerrero1",
    "race_id": 1,
    "type_id": 1,
    "strength": 100,
    "defense": 80,
    "speed": 90,
    "intelligence": 85,
    "status": "active"
  }
}
```

### Seleccionar Guerreros para Partida
```http
POST /warriors/select-for-game
Content-Type: application/json

{
  "warrior_ids": [1, 2, 3, 4, 5]
}

Respuesta (200):
{
  "message": "Guerreros seleccionados correctamente",
  "selected_warriors": [
    {
      "warrior_id": 1,
      "warrior_name": "Guerrero1",
      // ... otros campos
    }
    // ... hasta 5 guerreros
  ]
}
```

## Partidas (Games)

### Crear Partida
```http
POST /games
Content-Type: application/json

{
  "game_mode": "power",
  "selected_warriors": [1, 2, 3, 4, 5]
}

Respuesta (201):
{
  "game_id": 1,
  "status": "waiting_players",
  "game_mode": "power",
  "creator": {
    "user_id": 1,
    "warriors": [/* array de guerreros */]
  }
}
```

### Unirse a Partida
```http
POST /games/:id/join
Content-Type: application/json

{
  "selected_warriors": [1, 2, 3, 4, 5]
}

Respuesta (200):
{
  "message": "Te has unido a la partida correctamente",
  "game": {
    "game_id": 1,
    "status": "in_progress",
    "players": [
      {
        "user_id": 1,
        "warriors": [/* array de guerreros */]
      },
      {
        "user_id": 2,
        "warriors": [/* array de guerreros */]
      }
    ]
  }
}
```

### Realizar Acción en Partida
```http
POST /games/:id/action
Content-Type: application/json

{
  "action_type": "attack",
  "warrior_id": 1,
  "target_warrior_id": 2,
  "spell_id": 1
}

Respuesta (200):
{
  "message": "Acción realizada correctamente",
  "result": {
    "attacker": {
      "warrior_id": 1,
      "damage_dealt": 50
    },
    "defender": {
      "warrior_id": 2,
      "health_remaining": 950
    }
  }
}
```

### Finalizar Partida
```http
POST /games/:id/finish

Respuesta (200):
{
  "message": "Partida finalizada",
  "winner": {
    "user_id": 1,
    "username": "guerrero1",
    "points_earned": 100
  },
  "game_summary": {
    "duration": "10:30",
    "mode": "power",
    "total_actions": 20
  }
}
```

## Estadísticas

### Obtener Ranking
```http
GET /stats/ranking

Respuesta (200):
{
  "rankings": [
    {
      "position": 1,
      "user_id": 1,
      "user_user": "guerrero1",
      "total_points": 1500,
      "wins": 30,
      "losses": 10
    }
    // ... más jugadores
  ]
}
```

### Obtener Estadísticas de Jugador
```http
GET /stats/player/{id}

Respuesta (200):
{
  "user_id": 1,
  "user_user": "guerrero1",
  "stats": {
    "total_games": 40,
    "wins": 30,
    "losses": 10,
    "win_rate": 75,
    "favorite_mode": "power",
    "total_points": 1500,
    "best_warrior": {
      "warrior_id": 1,
      "warrior_name": "Guerrero1",
      "wins": 20
    }
  },
  "history": {
    "last_games": [
      {
        "game_id": 1,
        "result": "win",
        "mode": "power",
        "date": "2024-04-05T12:00:00Z"
      }
      // ... más partidas
    ]
  }
}
```

## Notas Adicionales

1. Límite de 5 guerreros por jugador en cada partida
2. Los modos de juego determinan el ganador según:
   - power: Solo se compara el poder de los guerreros
   - magic: Solo se compara la magia de los guerreros
   - combined: Se suma poder + magia de los guerreros
3. Las estadísticas se actualizan en tiempo real
4. Los puntos ganados/perdidos dependen del modo de juego y la diferencia de nivel entre jugadores

## Razas

### GET /api/races
Lista todas las razas disponibles.

### GET /api/races/{id}
Obtiene detalles de una raza específica.

## Tipos de Guerrero

### GET /api/warrior-types
Lista todos los tipos de guerrero disponibles.

### GET /api/warrior-types/{id}
Obtiene detalles de un tipo de guerrero específico.

## Poderes

### GET /api/powers
Lista todos los poderes disponibles.

### GET /api/powers/{id}
Obtiene detalles de un poder específico.

## Hechizos

### GET /api/spells
Lista todos los hechizos disponibles.

### GET /api/spells/{id}
Obtiene detalles de un hechizo específico.

## Filtros

Los endpoints que devuelven listas pueden ser filtrados usando parámetros de consulta:

Ejemplo:
```
GET /api/warriors?race=1&type=2&status=active
```

## Autenticación

La API utiliza autenticación JWT. El token debe ser incluido en el header de la siguiente manera:
```
Authorization: Bearer <token>
```

## Rate Limiting

- 100 solicitudes por minuto para usuarios normales
- 1000 solicitudes por minuto para usuarios API
- Las solicitudes que excedan el límite recibirán un código 429 (Too Many Requests) 