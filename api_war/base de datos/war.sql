-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2025 a las 17:20:20
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
-- Base de datos: `api_nodejs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_users`
--

CREATE TABLE `api_users` (
  `Api_user_id` int(11) NOT NULL,
  `Api_user` varchar(60) DEFAULT NULL,
  `Api_password` varchar(255) DEFAULT NULL,
  `Api_role` enum('admin','read-only') DEFAULT NULL,
  `Api_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `api_users`
--

INSERT INTO `api_users` (`Api_user_id`, `Api_user`, `Api_password`, `Api_role`, `Api_status`) VALUES
(2, 'john_doe', '$2b$10$Nobl8zHM5uheJkxMru7yuefw3C3/O0.6PdiC5j7TlomN4p9tUGLoS', '', 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document_type`
--

CREATE TABLE `document_type` (
  `Document_type_id` int(11) NOT NULL,
  `Document_type_name` varchar(20) NOT NULL,
  `Document_type_description` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `document_type`
--

INSERT INTO `document_type` (`Document_type_id`, `Document_type_name`, `Document_type_description`) VALUES
(1, 'numerico', 'solo numero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profile`
--

CREATE TABLE `profile` (
  `Profile_id` int(11) NOT NULL,
  `Profile_name` varchar(20) DEFAULT NULL,
  `Profile_last_name` varchar(20) DEFAULT NULL,
  `Profile_document` varchar(11) DEFAULT NULL,
  `Profile_email` varchar(30) DEFAULT NULL,
  `Profile_phone` varchar(11) DEFAULT NULL,
  `Profile_photo` varchar(100) DEFAULT NULL,
  `Profile_address` varchar(30) DEFAULT NULL,
  `Document_type_fk` int(11) DEFAULT NULL,
  `User_fk` int(11) DEFAULT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profile`
--

INSERT INTO `profile` (`Profile_id`, `Profile_name`, `Profile_last_name`, `Profile_document`, `Profile_email`, `Profile_phone`, `Profile_photo`, `Profile_address`, `Document_type_fk`, `User_fk`, `Created_at`, `Updated_at`) VALUES
(1, 'jonathan ivan', 'rendon bermeo', 'documento w', 'jonathan@gmail.com', '3116761276', 'esta es mi foto', 'barrio bochica sur', 1, NULL, '2025-03-30 17:44:22', '2025-03-30 17:44:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `Role_id` int(11) NOT NULL,
  `Role_name` varchar(20) DEFAULT NULL,
  `Role_description` varchar(80) DEFAULT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`Role_id`, `Role_name`, `Role_description`, `Created_at`, `Updated_at`) VALUES
(1, 'admin', 'acceso total a toda la plataforma', '2025-03-29 20:23:35', '2025-03-29 20:23:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `User_id` int(11) NOT NULL,
  `User_user` varchar(60) DEFAULT NULL,
  `User_password` varchar(255) DEFAULT NULL,
  `User_status_fk` int(11) DEFAULT NULL,
  `Role_fk` int(11) DEFAULT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`User_id`, `User_user`, `User_password`, `User_status_fk`, `Role_fk`, `Created_at`, `Updated_at`) VALUES
(1, 'ivan0145', '654321987', 1, 1, '2025-03-29 20:58:34', '2025-03-30 01:12:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_status`
--

CREATE TABLE `user_status` (
  `User_status_id` int(11) NOT NULL,
  `User_status_name` varchar(20) DEFAULT NULL,
  `User_status_description` varchar(80) DEFAULT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_status`
--

INSERT INTO `user_status` (`User_status_id`, `User_status_name`, `User_status_description`, `Created_at`, `Updated_at`) VALUES
(1, 'activo', 'puede ingresar a la plataforma sin problemas', '2025-03-29 19:59:38', '2025-03-29 19:59:38');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `api_users`
--
ALTER TABLE `api_users`
  ADD PRIMARY KEY (`Api_user_id`);

--
-- Indices de la tabla `document_type`
--
ALTER TABLE `document_type`
  ADD PRIMARY KEY (`Document_type_id`),
  ADD UNIQUE KEY `Document_type_name` (`Document_type_name`);

--
-- Indices de la tabla `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`Profile_id`),
  ADD KEY `Document_type_fk` (`Document_type_fk`),
  ADD KEY `User_fk` (`User_fk`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Role_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_id`),
  ADD KEY `User_status_fk` (`User_status_fk`),
  ADD KEY `Role_fk` (`Role_fk`);

--
-- Indices de la tabla `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`User_status_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `api_users`
--
ALTER TABLE `api_users`
  MODIFY `Api_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `document_type`
--
ALTER TABLE `document_type`
  MODIFY `Document_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `profile`
--
ALTER TABLE `profile`
  MODIFY `Profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `Role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_status`
--
ALTER TABLE `user_status`
  MODIFY `User_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`Document_type_fk`) REFERENCES `document_type` (`Document_type_id`),
  ADD CONSTRAINT `profile_ibfk_2` FOREIGN KEY (`User_fk`) REFERENCES `user` (`User_id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`User_status_fk`) REFERENCES `user_status` (`User_status_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`Role_fk`) REFERENCES `role` (`Role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
