-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2025 a las 08:21:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `war`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_users`
--

CREATE TABLE `api_users` (
  `api_user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','service','read_only') DEFAULT 'read_only',
  `api_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `api_users`
--

INSERT INTO `api_users` (`api_user_id`, `username`, `password_hash`, `role`, `api_token`) VALUES
(1, 'jonathanadmin1', '$2b$10$fpAsxCdqc5m8ENwPLOQyY.G/wQPpYkpboxPBhxQvlfcpXM/IYNGya', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdXNlcl9pZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ4NTUxNzU5LCJleHAiOjE3NDg1NzMzNTl9.UtpOTIor6OOJaJRL84Xi3wKGEUQybHK-oSiC3O8Ozh4'),
(2, 'jonathanservice1admin', '$2b$10$Ha4cMH4ZDoknUst6ONZwkuQ5Y9t.tt3Dzl5nTUrcV9UQj997DFSBu', 'admin', NULL),
(3, 'jonathanread_only1', '$2b$10$MsC4VkB8at.DusHbLEnRD.iUvQI7Rlv5dXe9C6jWBJWT4RF2XHFtG', 'read_only', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdXNlcl9pZCI6Mywicm9sZSI6InJlYWRfb25seSIsImlhdCI6MTc0ODI5NTAyNSwiZXhwIjoxNzQ4Mjk4NjI1fQ.K3wFB0CcgAGemzv0zjrndSM7rHuse0kQUsWvntO1CHY');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL,
  `mode` varchar(20) NOT NULL,
  `winner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `finished_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `matches`
--

INSERT INTO `matches` (`match_id`, `mode`, `winner_id`, `created_at`, `finished_at`) VALUES
(1, 'poder', 1, '2025-05-29 18:43:16', NULL),
(2, 'poder', NULL, '2025-05-29 20:14:06', NULL),
(3, 'suma', NULL, '2025-05-29 20:50:46', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `match_players`
--

CREATE TABLE `match_players` (
  `match_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `match_warriors`
--

CREATE TABLE `match_warriors` (
  `match_id` int(11) NOT NULL,
  `warrior_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `match_warriors`
--

INSERT INTO `match_warriors` (`match_id`, `warrior_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`player_id`, `username`, `password_hash`, `role`) VALUES
(1, 'jugadoradmin', '$2b$10$9n7n1t3v8Azro1cA1VHmzOysDJUQwyfAxBiKnUShk7j5ihc07RvE6', 'user'),
(2, 'jugadoradmin1', '$2b$10$5OtCrSqhc6hDLqd1q3.lCeTY5qZVQcXf0B/ofIP9k2J3Kpuwrc9gO', 'user'),
(3, 'jugadoradmin21', '$2b$10$Roxc3EI6z2xpJ3UtqrpnFe/4Uj622f5FxXSRn7S/uNxIr6fvFHYGO', 'user'),
(4, 'jugadoradmin213', '$2b$10$yi.utcMMGbZ6uKAbrY9nSeP2AUnkksr.FSsFYNPHnmmVtWw6kedtK', 'user'),
(5, 'jugadoradmin3', '$2b$10$8vga6S4NoKK5SwA41HjPwuF3wL9bCXCf5gqOkX5spVr5CteiojYBG', 'admin'),
(6, 'jugadoradmin4', '$2b$10$W2YY9uDatJw1HPiDDHd9FO3o7BWDFtwXzRnigZp47J7U/g8NraB32', 'admin'),
(8, 'jugadoradmin5', '$2b$10$a8nYwn7blnnEARnZh.hj7Ol0ezHeL1MpDx3VhwW2Zb2kZLwMPw3QC', 'user'),
(9, 'jugadoruser', '$2b$10$OFyi2M3pZuIWvvmOIUv79ebzZT.gbU64DbnDEKheFGPvnpFsuAE.W', 'user'),
(10, 'jugadoradmin56', '$2b$10$dGp5i6v1x5Ke.Ci.jU5YQu8AVTCf4tAjY1kdiRP5SrX8RN3qALy4q', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `player_stats`
--

CREATE TABLE `player_stats` (
  `player_id` int(11) NOT NULL,
  `games_played` int(11) DEFAULT 0,
  `victories` int(11) DEFAULT 0,
  `defeats` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `player_stats`
--

INSERT INTO `player_stats` (`player_id`, `games_played`, `victories`, `defeats`) VALUES
(1, 5, 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `powers`
--

CREATE TABLE `powers` (
  `power_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `percentage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `powers`
--

INSERT INTO `powers` (`power_id`, `name`, `description`, `percentage`) VALUES
(5, 'degollar', 'cuelga de un arbol al oponente', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `races`
--

CREATE TABLE `races` (
  `race_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `races`
--

INSERT INTO `races` (`race_id`, `name`, `description`) VALUES
(1, 'humano', 'todo lo que tiene un humano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ranking`
--

CREATE TABLE `ranking` (
  `player_id` int(11) NOT NULL,
  `score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ranking`
--

INSERT INTO `ranking` (`player_id`, `score`) VALUES
(1, 5),
(2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `spells`
--

CREATE TABLE `spells` (
  `spell_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `percentage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `spells`
--

INSERT INTO `spells` (`spell_id`, `name`, `description`, `percentage`) VALUES
(1, 'bola de fuego', 'quema haciendo mucho daño y se lanza', 100),
(3, 'fuegos', 'quema haciendo mucho daño', 100),
(4, 'fuegos', 'quema haciendo mucho daño', 100),
(5, 'hielo', 'quema haciendo mucho frio daño', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warriors`
--

CREATE TABLE `warriors` (
  `warrior_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `race_id` int(11) DEFAULT NULL,
  `total_power` int(11) NOT NULL,
  `total_magic` int(11) NOT NULL,
  `health` int(11) NOT NULL,
  `speed` int(11) NOT NULL,
  `intelligence` int(11) NOT NULL,
  `status` varchar(20) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `warriors`
--

INSERT INTO `warriors` (`warrior_id`, `player_id`, `name`, `type_id`, `race_id`, `total_power`, `total_magic`, `health`, `speed`, `intelligence`, `status`) VALUES
(1, 1, 'Goliat', 1, 1, 100, 100, 100, 100, 100, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warrior_powers`
--

CREATE TABLE `warrior_powers` (
  `warrior_id` int(11) NOT NULL,
  `power_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `warrior_powers`
--

INSERT INTO `warrior_powers` (`warrior_id`, `power_id`) VALUES
(1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warrior_spells`
--

CREATE TABLE `warrior_spells` (
  `warrior_id` int(11) NOT NULL,
  `spell_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `warrior_spells`
--

INSERT INTO `warrior_spells` (`warrior_id`, `spell_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warrior_types`
--

CREATE TABLE `warrior_types` (
  `type_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `warrior_types`
--

INSERT INTO `warrior_types` (`type_id`, `name`, `description`) VALUES
(1, 'espadachin guerrero misterioso', 'controla las espadas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `api_users`
--
ALTER TABLE `api_users`
  ADD PRIMARY KEY (`api_user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `api_token` (`api_token`);

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `winner_id` (`winner_id`);

--
-- Indices de la tabla `match_players`
--
ALTER TABLE `match_players`
  ADD PRIMARY KEY (`match_id`,`player_id`),
  ADD KEY `player_id` (`player_id`);

--
-- Indices de la tabla `match_warriors`
--
ALTER TABLE `match_warriors`
  ADD PRIMARY KEY (`match_id`,`warrior_id`),
  ADD KEY `warrior_id` (`warrior_id`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`player_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `player_stats`
--
ALTER TABLE `player_stats`
  ADD PRIMARY KEY (`player_id`);

--
-- Indices de la tabla `powers`
--
ALTER TABLE `powers`
  ADD PRIMARY KEY (`power_id`);

--
-- Indices de la tabla `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`race_id`);

--
-- Indices de la tabla `ranking`
--
ALTER TABLE `ranking`
  ADD PRIMARY KEY (`player_id`);

--
-- Indices de la tabla `spells`
--
ALTER TABLE `spells`
  ADD PRIMARY KEY (`spell_id`);

--
-- Indices de la tabla `warriors`
--
ALTER TABLE `warriors`
  ADD PRIMARY KEY (`warrior_id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `race_id` (`race_id`);

--
-- Indices de la tabla `warrior_powers`
--
ALTER TABLE `warrior_powers`
  ADD PRIMARY KEY (`warrior_id`,`power_id`),
  ADD KEY `power_id` (`power_id`);

--
-- Indices de la tabla `warrior_spells`
--
ALTER TABLE `warrior_spells`
  ADD PRIMARY KEY (`warrior_id`,`spell_id`),
  ADD KEY `spell_id` (`spell_id`);

--
-- Indices de la tabla `warrior_types`
--
ALTER TABLE `warrior_types`
  ADD PRIMARY KEY (`type_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `api_users`
--
ALTER TABLE `api_users`
  MODIFY `api_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `powers`
--
ALTER TABLE `powers`
  MODIFY `power_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `races`
--
ALTER TABLE `races`
  MODIFY `race_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `spells`
--
ALTER TABLE `spells`
  MODIFY `spell_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `warriors`
--
ALTER TABLE `warriors`
  MODIFY `warrior_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `warrior_types`
--
ALTER TABLE `warrior_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`winner_id`) REFERENCES `players` (`player_id`);

--
-- Filtros para la tabla `match_players`
--
ALTER TABLE `match_players`
  ADD CONSTRAINT `match_players_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`),
  ADD CONSTRAINT `match_players_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`);

--
-- Filtros para la tabla `match_warriors`
--
ALTER TABLE `match_warriors`
  ADD CONSTRAINT `match_warriors_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`),
  ADD CONSTRAINT `match_warriors_ibfk_2` FOREIGN KEY (`warrior_id`) REFERENCES `warriors` (`warrior_id`);

--
-- Filtros para la tabla `player_stats`
--
ALTER TABLE `player_stats`
  ADD CONSTRAINT `player_stats_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`);

--
-- Filtros para la tabla `ranking`
--
ALTER TABLE `ranking`
  ADD CONSTRAINT `ranking_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`);

--
-- Filtros para la tabla `warriors`
--
ALTER TABLE `warriors`
  ADD CONSTRAINT `warriors_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`),
  ADD CONSTRAINT `warriors_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `warrior_types` (`type_id`),
  ADD CONSTRAINT `warriors_ibfk_3` FOREIGN KEY (`race_id`) REFERENCES `races` (`race_id`);

--
-- Filtros para la tabla `warrior_powers`
--
ALTER TABLE `warrior_powers`
  ADD CONSTRAINT `warrior_powers_ibfk_1` FOREIGN KEY (`warrior_id`) REFERENCES `warriors` (`warrior_id`),
  ADD CONSTRAINT `warrior_powers_ibfk_2` FOREIGN KEY (`power_id`) REFERENCES `powers` (`power_id`);

--
-- Filtros para la tabla `warrior_spells`
--
ALTER TABLE `warrior_spells`
  ADD CONSTRAINT `warrior_spells_ibfk_1` FOREIGN KEY (`warrior_id`) REFERENCES `warriors` (`warrior_id`),
  ADD CONSTRAINT `warrior_spells_ibfk_2` FOREIGN KEY (`spell_id`) REFERENCES `spells` (`spell_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
