# Documentación de la API

## Rutas de Usuario

### Registrar un Nuevo Usuario
- **Ruta Completa:** `http://localhost:3000/api/register`
- **Método HTTP:** POST
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Parámetros:**
  - `username`: Nombre de usuario.
  - `password`: Contraseña del usuario.
  - `role`: Rol del usuario (debe ser `service` o `read_only`).
- **Respuestas:**
  - `201 Created`: Usuario registrado exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Iniciar Sesión
- **Ruta Completa:** `http://localhost:3000/api/login`
- **Método HTTP:** POST
- **Descripción:** Permite a un usuario iniciar sesión.
- **Parámetros:**
  - `username`: Nombre de usuario.
  - `password`: Contraseña del usuario.
- **Respuestas:**
  - `200 OK`: Inicio de sesión exitoso.
  - `401 Unauthorized`: Credenciales incorrectas.

### CRUD de Usuarios (Solo Admin)

#### Crear Usuario
- **Ruta Completa:** `http://localhost:3000/api/users`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo usuario. Solo accesible para administradores.
- **Parámetros:**
  - `username`: Nombre de usuario.
  - `password`: Contraseña del usuario.
  - `role`: Rol del usuario (puede ser `admin`, `service`, o `read_only`).
- **Respuestas:**
  - `201 Created`: Usuario creado exitosamente.
  - `400 Bad Request`: Rol inválido o datos incorrectos.

#### Obtener Todos los Usuarios
- **Ruta Completa:** `http://localhost:3000/api/users`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todos los usuarios. Solo accesible para administradores.
- **Respuestas:**
  - `200 OK`: Lista de usuarios.

#### Obtener Usuario por ID
- **Ruta Completa:** `http://localhost:3000/api/users/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de un usuario específico por su ID. Solo accesible para administradores.
- **Parámetros:**
  - `id`: Identificador del usuario.
- **Respuestas:**
  - `200 OK`: Detalles del usuario.
  - `404 Not Found`: Usuario no encontrado.

#### Actualizar Usuario
- **Ruta Completa:** `http://localhost:3000/api/users/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de un usuario específico por su ID. Solo accesible para administradores.
- **Parámetros:**
  - `id`: Identificador del usuario.
  - `userData`: Datos actualizados del usuario.
- **Respuestas:**
  - `200 OK`: Usuario actualizado exitosamente.
  - `404 Not Found`: Usuario no encontrado.

#### Eliminar Usuario
- **Ruta Completa:** `http://localhost:3000/api/users/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un usuario específico por su ID. Solo accesible para administradores.
- **Parámetros:**
  - `id`: Identificador del usuario.
- **Respuestas:**
  - `200 OK`: Usuario eliminado exitosamente.
  - `404 Not Found`: Usuario no encontrado.

## Rutas de Partidas

### Obtener Todas las Partidas
- **Ruta Completa:** `http://localhost:3000/api/matches`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todas las partidas.
- **Respuestas:**
  - `200 OK`: Lista de partidas.

### Obtener una Partida por ID
- **Ruta Completa:** `http://localhost:3000/api/match/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de una partida específica por su ID.
- **Parámetros:**
  - `id`: Identificador de la partida.
- **Respuestas:**
  - `200 OK`: Detalles de la partida.
  - `404 Not Found`: Partida no encontrada.

### Crear una Nueva Partida
- **Ruta Completa:** `http://localhost:3000/api/match`
- **Método HTTP:** POST
- **Descripción:** Crea una nueva partida.
- **Parámetros:**
  - `matchData`: Datos de la partida.
- **Respuestas:**
  - `201 Created`: Partida creada exitosamente.

### Actualizar una Partida por ID
- **Ruta Completa:** `http://localhost:3000/api/match/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de una partida específica por su ID.
- **Parámetros:**
  - `id`: Identificador de la partida.
  - `matchData`: Datos actualizados de la partida.
- **Respuestas:**
  - `200 OK`: Partida actualizada exitosamente.
  - `404 Not Found`: Partida no encontrada.

### Eliminar una Partida por ID
- **Ruta Completa:** `http://localhost:3000/api/match/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina una partida específica por su ID.
- **Parámetros:**
  - `id`: Identificador de la partida.
- **Respuestas:**
  - `200 OK`: Partida eliminada exitosamente.
  - `404 Not Found`: Partida no encontrada.

### Añadir un Jugador a una Partida
- **Ruta Completa:** `http://localhost:3000/api/match/:id/player`
- **Método HTTP:** POST
- **Descripción:** Añade un jugador a una partida específica.
- **Parámetros:**
  - `id`: Identificador de la partida.
  - `playerId`: Identificador del jugador.
- **Respuestas:**
  - `200 OK`: Jugador añadido exitosamente.
  - `404 Not Found`: Partida o jugador no encontrado.

### Eliminar un Jugador de una Partida
- **Ruta Completa:** `http://localhost:3000/api/match/:id/player`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un jugador de una partida específica.
- **Parámetros:**
  - `id`: Identificador de la partida.
  - `playerId`: Identificador del jugador.
- **Respuestas:**
  - `200 OK`: Jugador eliminado exitosamente.
  - `404 Not Found`: Partida o jugador no encontrado.

## Rutas de Jugadores

### Registro Público (Solo User)
- **Ruta Completa:** `http://localhost:3000/api/players`
- **Método HTTP:** POST
- **Descripción:** Registra un nuevo jugador.
- **Parámetros:**
  - `username`: Nombre de usuario.
  - `password`: Contraseña del usuario.
- **Respuestas:**
  - `201 Created`: Jugador registrado exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Iniciar Sesión para Ambos Roles
- **Ruta Completa:** `http://localhost:3000/api/login`
- **Método HTTP:** POST
- **Descripción:** Permite a un jugador iniciar sesión.
- **Parámetros:**
  - `username`: Nombre de usuario.
  - `password`: Contraseña del usuario.
- **Respuestas:**
  - `200 OK`: Inicio de sesión exitoso.
  - `401 Unauthorized`: Credenciales incorrectas.

### CRUD de Jugadores (Solo Admin)

#### Crear Jugador
- **Ruta Completa:** `http://localhost:3000/api/admin/players`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo jugador. Solo accesible para administradores.
- **Parámetros:**
  - `username`: Nombre de usuario.
  - `password`: Contraseña del usuario.
- **Respuestas:**
  - `201 Created`: Jugador creado exitosamente.
  - `400 Bad Request`: Datos incorrectos.

#### Obtener Todos los Jugadores
- **Ruta Completa:** `http://localhost:3000/api/admin/players`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todos los jugadores. Solo accesible para administradores.
- **Respuestas:**
  - `200 OK`: Lista de jugadores.

#### Obtener Jugador por ID
- **Ruta Completa:** `http://localhost:3000/api/admin/players/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de un jugador específico por su ID. Solo accesible para administradores.
- **Parámetros:**
  - `id`: Identificador del jugador.
- **Respuestas:**
  - `200 OK`: Detalles del jugador.
  - `404 Not Found`: Jugador no encontrado.

#### Actualizar Jugador
- **Ruta Completa:** `http://localhost:3000/api/admin/players/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de un jugador específico por su ID. Solo accesible para administradores.
- **Parámetros:**
  - `id`: Identificador del jugador.
  - `playerData`: Datos actualizados del jugador.
- **Respuestas:**
  - `200 OK`: Jugador actualizado exitosamente.
  - `404 Not Found`: Jugador no encontrado.

#### Eliminar Jugador
- **Ruta Completa:** `http://localhost:3000/api/admin/players/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un jugador específico por su ID. Solo accesible para administradores.
- **Parámetros:**
  - `id`: Identificador del jugador.
- **Respuestas:**
  - `200 OK`: Jugador eliminado exitosamente.
  - `404 Not Found`: Jugador no encontrado.

## Rutas de Estadísticas de Jugadores

### Obtener Todas las Estadísticas de Jugadores
- **Ruta Completa:** `http://localhost:3000/api/player-stats`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todas las estadísticas de jugadores.
- **Respuestas:**
  - `200 OK`: Lista de estadísticas de jugadores.

### Obtener Estadísticas de un Jugador por ID
- **Ruta Completa:** `http://localhost:3000/api/player-stats/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene las estadísticas de un jugador específico por su ID.
- **Parámetros:**
  - `id`: Identificador del jugador.
- **Respuestas:**
  - `200 OK`: Detalles de las estadísticas del jugador.
  - `404 Not Found`: Estadísticas del jugador no encontradas.

### Crear Estadísticas para un Jugador
- **Ruta Completa:** `http://localhost:3000/api/player-stats`
- **Método HTTP:** POST
- **Descripción:** Crea estadísticas para un jugador.
- **Parámetros:**
  - `playerStatData`: Datos de las estadísticas del jugador.
- **Respuestas:**
  - `201 Created`: Estadísticas creadas exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Actualizar Estadísticas de un Jugador por ID
- **Ruta Completa:** `http://localhost:3000/api/player-stats/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza las estadísticas de un jugador específico por su ID.
- **Parámetros:**
  - `id`: Identificador del jugador.
  - `playerStatData`: Datos actualizados de las estadísticas del jugador.
- **Respuestas:**
  - `200 OK`: Estadísticas actualizadas exitosamente.
  - `404 Not Found`: Estadísticas del jugador no encontradas.

### Eliminar Estadísticas de un Jugador por ID
- **Ruta Completa:** `http://localhost:3000/api/player-stats/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina las estadísticas de un jugador específico por su ID.
- **Parámetros:**
  - `id`: Identificador del jugador.
- **Respuestas:**
  - `200 OK`: Estadísticas eliminadas exitosamente.
  - `404 Not Found`: Estadísticas del jugador no encontradas.

## Rutas de Poderes

### Obtener Todos los Poderes
- **Ruta Completa:** `http://localhost:3000/api/powers`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todos los poderes.
- **Respuestas:**
  - `200 OK`: Lista de poderes.

### Obtener un Poder por ID
- **Ruta Completa:** `http://localhost:3000/api/power/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de un poder específico por su ID.
- **Parámetros:**
  - `id`: Identificador del poder.
- **Respuestas:**
  - `200 OK`: Detalles del poder.
  - `404 Not Found`: Poder no encontrado.

### Crear un Nuevo Poder
- **Ruta Completa:** `http://localhost:3000/api/power`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo poder.
- **Parámetros:**
  - `powerData`: Datos del poder.
- **Respuestas:**
  - `201 Created`: Poder creado exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Actualizar un Poder por ID
- **Ruta Completa:** `http://localhost:3000/api/power/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de un poder específico por su ID.
- **Parámetros:**
  - `id`: Identificador del poder.
  - `powerData`: Datos actualizados del poder.
- **Respuestas:**
  - `200 OK`: Poder actualizado exitosamente.
  - `404 Not Found`: Poder no encontrado.

### Eliminar un Poder por ID
- **Ruta Completa:** `http://localhost:3000/api/power/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un poder específico por su ID.
- **Parámetros:**
  - `id`: Identificador del poder.
- **Respuestas:**
  - `200 OK`: Poder eliminado exitosamente.
  - `404 Not Found`: Poder no encontrado.

## Rutas de Razas

### Obtener Todas las Razas
- **Ruta Completa:** `http://localhost:3000/api/races`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todas las razas.
- **Respuestas:**
  - `200 OK`: Lista de razas.

### Obtener una Raza por ID
- **Ruta Completa:** `http://localhost:3000/api/race/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de una raza específica por su ID.
- **Parámetros:**
  - `id`: Identificador de la raza.
- **Respuestas:**
  - `200 OK`: Detalles de la raza.
  - `404 Not Found`: Raza no encontrada.

### Crear una Nueva Raza
- **Ruta Completa:** `http://localhost:3000/api/race`
- **Método HTTP:** POST
- **Descripción:** Crea una nueva raza.
- **Parámetros:**
  - `raceData`: Datos de la raza.
- **Respuestas:**
  - `201 Created`: Raza creada exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Actualizar una Raza por ID
- **Ruta Completa:** `http://localhost:3000/api/race/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de una raza específica por su ID.
- **Parámetros:**
  - `id`: Identificador de la raza.
  - `raceData`: Datos actualizados de la raza.
- **Respuestas:**
  - `200 OK`: Raza actualizada exitosamente.
  - `404 Not Found`: Raza no encontrada.

### Eliminar una Raza por ID
- **Ruta Completa:** `http://localhost:3000/api/race/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina una raza específica por su ID.
- **Parámetros:**
  - `id`: Identificador de la raza.
- **Respuestas:**
  - `200 OK`: Raza eliminada exitosamente.
  - `404 Not Found`: Raza no encontrada.

## Rutas de Rankings

### Obtener Todos los Rankings
- **Ruta Completa:** `http://localhost:3000/api/rankings`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todos los rankings.
- **Respuestas:**
  - `200 OK`: Lista de rankings.

### Obtener un Ranking por ID
- **Ruta Completa:** `http://localhost:3000/api/ranking/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de un ranking específico por su ID.
- **Parámetros:**
  - `id`: Identificador del ranking.
- **Respuestas:**
  - `200 OK`: Detalles del ranking.
  - `404 Not Found`: Ranking no encontrado.

### Crear un Nuevo Ranking
- **Ruta Completa:** `http://localhost:3000/api/ranking`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo ranking.
- **Parámetros:**
  - `rankingData`: Datos del ranking.
- **Respuestas:**
  - `201 Created`: Ranking creado exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Actualizar un Ranking por ID
- **Ruta Completa:** `http://localhost:3000/api/ranking/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de un ranking específico por su ID.
- **Parámetros:**
  - `id`: Identificador del ranking.
  - `rankingData`: Datos actualizados del ranking.
- **Respuestas:**
  - `200 OK`: Ranking actualizado exitosamente.
  - `404 Not Found`: Ranking no encontrado.

### Eliminar un Ranking por ID
- **Ruta Completa:** `http://localhost:3000/api/ranking/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un ranking específico por su ID.
- **Parámetros:**
  - `id`: Identificador del ranking.
- **Respuestas:**
  - `200 OK`: Ranking eliminado exitosamente.
  - `404 Not Found`: Ranking no encontrado.

## Rutas de Hechizos

### Obtener Todos los Hechizos
- **Ruta Completa:** `http://localhost:3000/api/spells`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todos los hechizos.
- **Respuestas:**
  - `200 OK`: Lista de hechizos.

### Obtener un Hechizo por ID
- **Ruta Completa:** `http://localhost:3000/api/spell/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de un hechizo específico por su ID.
- **Parámetros:**
  - `id`: Identificador del hechizo.
- **Respuestas:**
  - `200 OK`: Detalles del hechizo.
  - `404 Not Found`: Hechizo no encontrado.

### Crear un Nuevo Hechizo
- **Ruta Completa:** `http://localhost:3000/api/spell`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo hechizo.
- **Parámetros:**
  - `spellData`: Datos del hechizo.
- **Respuestas:**
  - `201 Created`: Hechizo creado exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Actualizar un Hechizo por ID
- **Ruta Completa:** `http://localhost:3000/api/spell/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de un hechizo específico por su ID.
- **Parámetros:**
  - `id`: Identificador del hechizo.
  - `spellData`: Datos actualizados del hechizo.
- **Respuestas:**
  - `200 OK`: Hechizo actualizado exitosamente.
  - `404 Not Found`: Hechizo no encontrado.

### Eliminar un Hechizo por ID
- **Ruta Completa:** `http://localhost:3000/api/spell/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un hechizo específico por su ID.
- **Parámetros:**
  - `id`: Identificador del hechizo.
- **Respuestas:**
  - `200 OK`: Hechizo eliminado exitosamente.
  - `404 Not Found`: Hechizo no encontrado.

## Rutas de Guerreros

### Obtener Todos los Guerreros
- **Ruta Completa:** `http://localhost:3000/api/warriors`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todos los guerreros.
- **Respuestas:**
  - `200 OK`: Lista de guerreros.

### Obtener un Guerrero por ID
- **Ruta Completa:** `http://localhost:3000/api/warrior/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de un guerrero específico por su ID.
- **Parámetros:**
  - `id`: Identificador del guerrero.
- **Respuestas:**
  - `200 OK`: Detalles del guerrero.
  - `404 Not Found`: Guerrero no encontrado.

### Crear un Nuevo Guerrero
- **Ruta Completa:** `http://localhost:3000/api/warrior`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo guerrero.
- **Parámetros:**
  - `warriorData`: Datos del guerrero.
- **Respuestas:**
  - `201 Created`: Guerrero creado exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Actualizar un Guerrero por ID
- **Ruta Completa:** `http://localhost:3000/api/warrior/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de un guerrero específico por su ID.
- **Parámetros:**
  - `id`: Identificador del guerrero.
  - `warriorData`: Datos actualizados del guerrero.
- **Respuestas:**
  - `200 OK`: Guerrero actualizado exitosamente.
  - `404 Not Found`: Guerrero no encontrado.

### Eliminar un Guerrero por ID
- **Ruta Completa:** `http://localhost:3000/api/warrior/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un guerrero específico por su ID.
- **Parámetros:**
  - `id`: Identificador del guerrero.
- **Respuestas:**
  - `200 OK`: Guerrero eliminado exitosamente.
  - `404 Not Found`: Guerrero no encontrado.

# Documentación de la API

## Rutas de Tipos de Guerreros

### Obtener Todos los Tipos de Guerreros
- **Ruta Completa:** `http://localhost:3000/api/warrior-types`
- **Método HTTP:** GET
- **Descripción:** Obtiene una lista de todos los tipos de guerreros.
- **Respuestas:**
  - `200 OK`: Lista de tipos de guerreros.

### Obtener un Tipo de Guerrero por ID
- **Ruta Completa:** `http://localhost:3000/api/warrior-type/:id`
- **Método HTTP:** GET
- **Descripción:** Obtiene los detalles de un tipo de guerrero específico por su ID.
- **Parámetros:**
  - `id`: Identificador del tipo de guerrero.
- **Respuestas:**
  - `200 OK`: Detalles del tipo de guerrero.
  - `404 Not Found`: Tipo de guerrero no encontrado.

### Crear un Nuevo Tipo de Guerrero
- **Ruta Completa:** `http://localhost:3000/api/warrior-type`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo tipo de guerrero.
- **Parámetros:**
  - `warriorTypeData`: Datos del tipo de guerrero.
- **Respuestas:**
  - `201 Created`: Tipo de guerrero creado exitosamente.
  - `400 Bad Request`: Error en los datos proporcionados.

### Actualizar un Tipo de Guerrero por ID
- **Ruta Completa:** `http://localhost:3000/api/warrior-type/:id`
- **Método HTTP:** PUT
- **Descripción:** Actualiza los detalles de un tipo de guerrero específico por su ID.
- **Parámetros:**
  - `id`: Identificador del tipo de guerrero.
  - `warriorTypeData`: Datos actualizados del tipo de guerrero.
- **Respuestas:**
  - `200 OK`: Tipo de guerrero actualizado exitosamente.
  - `404 Not Found`: Tipo de guerrero no encontrado.

### Eliminar un Tipo de Guerrero por ID
- **Ruta Completa:** `http://localhost:3000/api/warrior-type/:id`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un tipo de guerrero específico por su ID.
- **Parámetros:**
  - `id`: Identificador del tipo de guerrero.
- **Respuestas:**
  - `200 OK`: Tipo de guerrero eliminado exitosamente.
  - `404 Not Found`: Tipo de guerrero no encontrado.

