-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2025 a las 21:19:26
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `races`
--

CREATE TABLE `races` (
  `race_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ranking`
--

CREATE TABLE `ranking` (
  `player_id` int(11) NOT NULL,
  `score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warrior_powers`
--

CREATE TABLE `warrior_powers` (
  `warrior_id` int(11) NOT NULL,
  `power_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warrior_spells`
--

CREATE TABLE `warrior_spells` (
  `warrior_id` int(11) NOT NULL,
  `spell_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `api_user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `powers`
--
ALTER TABLE `powers`
  MODIFY `power_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `races`
--
ALTER TABLE `races`
  MODIFY `race_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `spells`
--
ALTER TABLE `spells`
  MODIFY `spell_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `warriors`
--
ALTER TABLE `warriors`
  MODIFY `warrior_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `warrior_types`
--
ALTER TABLE `warrior_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;

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
