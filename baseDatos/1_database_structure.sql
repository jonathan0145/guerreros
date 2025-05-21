-- Esto es solo lo principal de la base de datos. 

-- Creación de la tabla WARRIOR_TYPE
CREATE TABLE WARRIOR_TYPE (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Creación de la tabla RACE
CREATE TABLE RACE (
    race_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Creación de la tabla POWERS
CREATE TABLE POWERS (
    power_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    percentage INT NOT NULL
);

-- Creación de la tabla SPELLS
CREATE TABLE SPELLS (
    spell_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    percentage INT NOT NULL
);

-- Creación de la tabla WARRIOR
CREATE TABLE WARRIOR (
    warrior_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    total_power INT NOT NULL,
    total_magic INT NOT NULL,
    health INT NOT NULL,
    speed INT NOT NULL,
    intelligence INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    warrior_type_id INT NOT NULL,
    race_id INT NOT NULL,
    FOREIGN KEY (warrior_type_id) REFERENCES WARRIOR_TYPE(type_id) ON DELETE CASCADE,
    FOREIGN KEY (race_id) REFERENCES RACE(race_id) ON DELETE CASCADE
);

-- Creación de la tabla WARRIOR_POWER (Relación N:M)
CREATE TABLE WARRIOR_POWER (
    warrior_id INT NOT NULL,
    power_id INT NOT NULL,
    PRIMARY KEY (warrior_id, power_id),
    FOREIGN KEY (warrior_id) REFERENCES WARRIOR(warrior_id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES POWERS(power_id) ON DELETE CASCADE
);

-- Creación de la tabla WARRIOR_SPELL (Relación N:M)
CREATE TABLE WARRIOR_SPELL (
    warrior_id INT NOT NULL,
    spell_id INT NOT NULL,
    PRIMARY KEY (warrior_id, spell_id),
    FOREIGN KEY (warrior_id) REFERENCES WARRIOR(warrior_id) ON DELETE CASCADE,
    FOREIGN KEY (spell_id) REFERENCES SPELLS(spell_id) ON DELETE CASCADE
);

1. Gestión de Jugadores
Registro de jugadores

POST /api/players
Crea un nuevo jugador (requiere username y password).
Autenticación de jugadores

POST /api/login
Devuelve un token o sesión si el usuario y contraseña son correctos.
2. Gestión de Personajes (Guerreros)
Crear personaje

POST /api/warriors
Crea un nuevo guerrero con los campos requeridos.
Ver todos los personajes

GET /api/warriors
Lista todos los guerreros.
Ver personajes de un jugador

GET /api/players/:player_id/warriors
Lista los guerreros de un jugador específico.
Seleccionar 5 personajes para partida

POST /api/matches/:match_id/warriors
Asocia 5 guerreros a una partida.
Ver detalles de un personaje

GET /api/warriors/:id
3. Gestión de Partidas
Crear partida

POST /api/matches
Crea una nueva partida (requiere modo de juego).
Unirse a partida

POST /api/matches/:match_id/players
Agrega un jugador a una partida.
Desarrollo de partida

POST /api/matches/:match_id/play
Ejecuta la lógica de combate y determina el ganador.
Finalizar partida

PUT /api/matches/:match_id/finish
Marca la partida como finalizada y registra el resultado.
4. Modos de Juego
El modo de juego se define en el campo mode de la tabla matches (poder, magia, suma).
La lógica de combate debe comparar los atributos según el modo.
5. Ranking y Estadísticas
Ranking de jugadores

GET /api/ranking
Devuelve el ranking de jugadores según la tabla ranking.
Estadísticas de un jugador

GET /api/players/:player_id/stats
Devuelve partidas jugadas, victorias, derrotas, etc.
6. Seguridad
Usa autenticación por token (JWT o similar) para proteger los endpoints.
Valida los datos de entrada en cada endpoint.
7. Ejemplo de estructura de controlador para jugadores
8. Rutas sugeridas
9. Integración en tu index.js
¿Quieres que te ayude a crear algún endpoint o controlador específico? ¿O prefieres que te ayude con la autenticación? ¡Dime por dónde quieres empezar!