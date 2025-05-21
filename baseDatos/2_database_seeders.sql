-- Seeder para la tabla WARRIOR_TYPE
INSERT INTO WARRIOR_TYPE (name, description) VALUES
('Caballero', 'Un valiente guerrero con fuerte defensa'),
('Mago', 'Un maestro de los hechizos mágicos'),
('Arquero', 'Un hábil tirador con arco');

-- Seeder para la tabla RACE
INSERT INTO RACE (name, description) VALUES
('Humano', 'Versátil y resistente'),
('Elfo', 'Ágil y sabio'),
('Orco', 'Fuerte y feroz');

-- Seeder para la tabla POWERS
INSERT INTO POWERS (name, description, percentage) VALUES
('Bola de Fuego', 'Un poderoso ataque de fuego', 80),
('Toque Curativo', 'Restaura la salud', 70),
('Golpe de Rayo', 'Un rápido ataque eléctrico', 85);

-- Seeder para la tabla SPELLS
INSERT INTO SPELLS (name, description, percentage) VALUES
('Escudo de Hielo', 'Protege contra ataques', 75),
('Ráfaga de Viento', 'Empuja a los enemigos', 65),
('Terremoto', 'Sacude el suelo violentamente', 90);

-- Seeder para la tabla WARRIOR
INSERT INTO WARRIOR (name, total_power, total_magic, health, speed, intelligence, status, warrior_type_id, race_id) VALUES
('Axel', 100, 50, 100, 30, 40, 'activo', 1, 1),
('Ragnar', 110, 60, 90, 35, 45, 'activo', 2, 2),
('Magnus', 120, 70, 80, 40, 50, 'activo', 3, 3),
('Thor', 130, 80, 70, 45, 55, 'activo', 1, 2),
('Gideon', 140, 90, 60, 50, 60, 'activo', 2, 1),
('Kane', 150, 100, 50, 55, 65, 'activo', 3, 2),
('Conan', 160, 110, 40, 60, 70, 'activo', 1, 3),
('Garrett', 170, 120, 30, 65, 75, 'activo', 2, 3),
('Roland', 180, 130, 20, 70, 80, 'activo', 3, 1),
('Darius', 190, 140, 10, 75, 85, 'activo', 1, 2),
('Jorah', 200, 150, 100, 80, 90, 'activo', 2, 1),
('Bram', 210, 160, 90, 85, 95, 'activo', 3, 2),
('Cassian', 220, 170, 80, 90, 100, 'activo', 1, 3),
('Finnian', 230, 180, 70, 95, 105, 'activo', 2, 3),
('Leif', 240, 190, 60, 100, 110, 'activo', 3, 1),
('Kenji', 250, 200, 50, 105, 115, 'activo', 1, 2),
('Einar', 260, 210, 40, 110, 120, 'activo', 2, 1),
('Dhvani', 270, 220, 30, 115, 125, 'activo', 3, 2),
('Rudra', 280, 230, 20, 120, 130, 'activo', 1, 3),
('Arturo', 290, 240, 10, 125, 135, 'activo', 2, 3),
('Ciro', 300, 250, 100, 130, 140, 'activo', 3, 1),
('Valerio', 310, 260, 90, 135, 145, 'activo', 1, 2),
('Osvaldo', 320, 270, 80, 140, 150, 'activo', 2, 1),
('Leonidas', 330, 280, 70, 145, 155, 'activo', 3, 2),
('Fernando', 340, 290, 60, 150, 160, 'activo', 1, 3),
('Hercules', 350, 300, 50, 155, 165, 'activo', 2, 3),
('Aquiles', 360, 310, 40, 160, 170, 'activo', 3, 1),
('Genghis', 370, 320, 30, 165, 175, 'activo', 1, 2),
('Attila', 380, 330, 20, 170, 180, 'activo', 2, 1),
('Zane', 390, 340, 10, 175, 185, 'activo', 3, 2);

-- Seeder para la tabla WARRIOR_POWER
INSERT INTO WARRIOR_POWER (warrior_id, power_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Seeder para la tabla WARRIOR_SPELL
INSERT INTO WARRIOR_SPELL (warrior_id, spell_id) VALUES
(1, 1),
(2, 2),
(3, 3);