# Documentación de la API War Game

## Base URL
```
http://localhost:3000/war
```

## Autenticación

La API utiliza autenticación basada en tokens JWT. Para acceder a endpoints protegidos, incluye el token en el header de la petición:

```http
Authorization: Bearer <token>
```

## Endpoints

### Usuarios

#### Crear Usuario
```http
POST /user
```

Request:
```json
{
  "user": "string",
  "password": "string"
}
```

Response (201):
```json
{
  "user_id": "number",
  "user": "string",
  "user_status_id": "number",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

#### Obtener Usuario
```http
GET /user/:id
```

Response (200):
```json
{
  "user_id": "number",
  "user": "string",
  "user_status_id": "number",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

#### Actualizar Usuario
```http
PUT /user/:id
```

Request:
```json
{
  "user": "string",
  "password": "string"
}
```

Response (200):
```json
{
  "user_id": "number",
  "user": "string",
  "user_status_id": "number",
  "updated_at": "datetime"
}
```

#### Eliminar Usuario
```http
DELETE /user/:id
```

Response (200):
```json
{
  "message": "Usuario eliminado correctamente"
}
```

### Guerreros

#### Crear Guerrero
```http
POST /warrior
```

Request:
```json
{
  "name": "string",
  "race_id": "number",
  "warrior_type_id": "number",
  "strength": "number",
  "defense": "number",
  "speed": "number",
  "intelligence": "number",
  "status": "string"
}
```

Response (201):
```json
{
  "warrior_id": "number",
  "name": "string",
  "race_id": "number",
  "warrior_type_id": "number",
  "strength": "number",
  "defense": "number",
  "speed": "number",
  "intelligence": "number",
  "status": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

#### Obtener Guerrero
```http
GET /warrior/:id
```

Response (200):
```json
{
  "warrior_id": "number",
  "name": "string",
  "race": {
    "race_id": "number",
    "name": "string",
    "description": "string"
  },
  "warrior_type": {
    "warrior_type_id": "number",
    "name": "string",
    "description": "string"
  },
  "strength": "number",
  "defense": "number",
  "speed": "number",
  "intelligence": "number",
  "status": "string"
}
```

#### Actualizar Guerrero
```http
PUT /warrior/:id
```

Request:
```json
{
  "name": "string",
  "strength": "number",
  "defense": "number",
  "speed": "number",
  "intelligence": "number",
  "status": "string"
}
```

Response (200):
```json
{
  "warrior_id": "number",
  "name": "string",
  "strength": "number",
  "defense": "number",
  "speed": "number",
  "intelligence": "number",
  "status": "string",
  "updated_at": "datetime"
}
```

#### Eliminar Guerrero
```http
DELETE /warrior/:id
```

Response (200):
```json
{
  "message": "Guerrero eliminado correctamente"
}
```

### Razas

#### Obtener Todas las Razas
```http
GET /race
```

Response (200):
```json
[
  {
    "race_id": "number",
    "name": "string",
    "description": "string",
    "strength": "number",
    "defense": "number",
    "speed": "number",
    "intelligence": "number"
  }
]
```

#### Obtener Raza
```http
GET /race/:id
```

Response (200):
```json
{
  "race_id": "number",
  "name": "string",
  "description": "string",
  "strength": "number",
  "defense": "number",
  "speed": "number",
  "intelligence": "number"
}
```

### Tipos de Guerrero

#### Obtener Todos los Tipos
```http
GET /warrior-type
```

Response (200):
```json
[
  {
    "warrior_type_id": "number",
    "name": "string",
    "description": "string",
    "base_strength": "number",
    "base_defense": "number",
    "base_speed": "number",
    "base_intelligence": "number"
  }
]
```

#### Obtener Tipo de Guerrero
```http
GET /warrior-type/:id
```

Response (200):
```json
{
  "warrior_type_id": "number",
  "name": "string",
  "description": "string",
  "base_strength": "number",
  "base_defense": "number",
  "base_speed": "number",
  "base_intelligence": "number"
}
```

## Códigos de Error

- 400: Bad Request - La solicitud contiene datos inválidos
- 401: Unauthorized - No se proporcionó token de autenticación
- 403: Forbidden - No tiene permisos para acceder al recurso
- 404: Not Found - El recurso solicitado no existe
- 409: Conflict - Conflicto con el estado actual del recurso
- 500: Internal Server Error - Error interno del servidor

## Ejemplos de Uso

### Crear un Usuario
```bash
curl -X POST http://localhost:3000/war/user \
  -H "Content-Type: application/json" \
  -d '{
    "user": "usuario1",
    "password": "contraseña123"
  }'
```

### Crear un Guerrero
```bash
curl -X POST http://localhost:3000/war/warrior \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Guerrero1",
    "race_id": 1,
    "warrior_type_id": 1,
    "strength": 80,
    "defense": 70,
    "speed": 75,
    "intelligence": 65,
    "status": "active"
  }'
```

### Obtener Todas las Razas
```bash
curl -X GET http://localhost:3000/war/race
``` 