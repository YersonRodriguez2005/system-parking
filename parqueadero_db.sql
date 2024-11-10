-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2024 a las 22:16:06
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
-- Base de datos: `parqueadero_db`
--
CREATE DATABASE IF NOT EXISTS `parqueadero_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `parqueadero_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espacios`
--

CREATE TABLE `espacios` (
  `idEspacio` int(11) NOT NULL,
  `estado` enum('Disponible','Ocupado') DEFAULT 'Disponible',
  `ubicacion` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `espacios`
--

INSERT INTO `espacios` (`idEspacio`, `estado`, `ubicacion`, `created_at`) VALUES
(1, 'Disponible', '1A', '2024-11-08 20:39:18'),
(2, 'Disponible', '1B', '2024-11-08 20:39:18'),
(3, 'Disponible', '1C', '2024-11-08 20:39:18'),
(4, 'Disponible', '1D', '2024-11-08 20:39:18'),
(5, 'Disponible', '1E', '2024-11-08 20:39:18'),
(6, 'Disponible', '1F', '2024-11-08 20:39:18'),
(7, 'Disponible', '1G', '2024-11-08 20:39:18'),
(8, 'Disponible', '1H', '2024-11-08 20:39:18'),
(9, 'Disponible', '1I', '2024-11-08 20:39:18'),
(10, 'Disponible', '1J', '2024-11-08 20:39:18'),
(11, 'Disponible', '1K', '2024-11-08 20:39:18'),
(12, 'Disponible', '1L', '2024-11-08 20:39:18'),
(13, 'Disponible', '1M', '2024-11-08 20:39:18'),
(14, 'Disponible', '1N', '2024-11-08 20:39:18'),
(15, 'Disponible', '1O', '2024-11-08 20:39:18'),
(16, 'Disponible', '1P', '2024-11-08 20:39:18'),
(17, 'Disponible', '1Q', '2024-11-08 20:39:18'),
(18, 'Disponible', '1R', '2024-11-08 20:39:18'),
(19, 'Disponible', '1S', '2024-11-08 20:39:18'),
(20, 'Disponible', '1T', '2024-11-08 20:39:18'),
(21, 'Disponible', '1U', '2024-11-08 20:39:18'),
(22, 'Disponible', '1V', '2024-11-08 20:39:18'),
(23, 'Disponible', '1W', '2024-11-08 20:39:18'),
(24, 'Disponible', '1X', '2024-11-08 20:39:18'),
(25, 'Disponible', '1Y', '2024-11-08 20:39:18'),
(26, 'Disponible', '1Z', '2024-11-08 20:39:18'),
(27, 'Disponible', '2A', '2024-11-08 20:39:18'),
(28, 'Disponible', '2B', '2024-11-08 20:39:18'),
(29, 'Disponible', '2C', '2024-11-08 20:39:18'),
(30, 'Disponible', '2D', '2024-11-08 20:39:18'),
(31, 'Disponible', '2E', '2024-11-08 20:39:18'),
(32, 'Disponible', '2F', '2024-11-08 20:39:18'),
(33, 'Disponible', '2G', '2024-11-08 20:39:18'),
(34, 'Disponible', '2H', '2024-11-08 20:39:18'),
(35, 'Disponible', '2I', '2024-11-08 20:39:18'),
(36, 'Disponible', '2J', '2024-11-08 20:39:18'),
(37, 'Disponible', '2K', '2024-11-08 20:39:18'),
(38, 'Disponible', '2L', '2024-11-08 20:39:18'),
(39, 'Disponible', '2M', '2024-11-08 20:39:18'),
(40, 'Disponible', '2N', '2024-11-08 20:39:18'),
(41, 'Disponible', '2O', '2024-11-08 20:39:18'),
(42, 'Disponible', '2P', '2024-11-08 20:39:18'),
(43, 'Disponible', '2Q', '2024-11-08 20:39:18'),
(44, 'Disponible', '2R', '2024-11-08 20:39:18'),
(45, 'Disponible', '2S', '2024-11-08 20:39:18'),
(46, 'Disponible', '2T', '2024-11-08 20:39:18'),
(47, 'Disponible', '2U', '2024-11-08 20:39:18'),
(48, 'Disponible', '2V', '2024-11-08 20:39:18'),
(49, 'Disponible', '2W', '2024-11-08 20:39:18'),
(50, 'Disponible', '2X', '2024-11-08 20:39:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estacionamientos`
--

CREATE TABLE `estacionamientos` (
  `idEstacionamiento` int(11) NOT NULL,
  `idVehiculo` int(11) NOT NULL,
  `idEspacio` int(11) NOT NULL,
  `fechaIngreso` datetime NOT NULL,
  `fechaSalida` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `idReporte` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `fechaGeneracion` datetime DEFAULT NULL,
  `formato` varchar(10) DEFAULT NULL,
  `contenido` longtext DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifas`
--

CREATE TABLE `tarifas` (
  `idTarifa` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarifas`
--

INSERT INTO `tarifas` (`idTarifa`, `descripcion`, `monto`, `fechaInicio`, `fechaFin`, `createdAt`, `updatedAt`) VALUES
(1, 'Tarifa Básica - Diaria', 10000.00, NULL, NULL, '2024-11-10 17:26:40', '2024-11-10 17:26:40'),
(2, 'Tarifa Premium - Mensual', 250000.00, NULL, NULL, '2024-11-10 17:26:40', '2024-11-10 17:26:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('administrador','operador') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `email`, `password`, `rol`, `created_at`, `createdAt`, `updatedAt`) VALUES
(6, 'Admin User', 'admin@example.com', 'password1', 'administrador', '2024-11-08 17:03:58', '2024-11-08 12:03:58', '2024-11-08 12:03:58'),
(7, 'Operator One', 'operator1@example.com', 'password2', 'operador', '2024-11-08 17:03:58', '2024-11-08 12:03:58', '2024-11-08 12:03:58'),
(8, 'Operator Two', 'operator2@example.com', 'password3', 'operador', '2024-11-08 17:03:58', '2024-11-08 12:03:58', '2024-11-08 12:03:58'),
(9, 'Test Admin', 'testadmin@example.com', 'password4', 'administrador', '2024-11-08 17:03:58', '2024-11-08 12:03:58', '2024-11-08 12:03:58'),
(10, 'Test Operator', 'testoperator@example.com', 'password5', 'operador', '2024-11-08 17:03:58', '2024-11-08 12:03:58', '2024-11-08 12:03:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `idVehiculo` int(11) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `fechaEntrada` datetime DEFAULT NULL,
  `fechaSalida` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idEspacio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `espacios`
--
ALTER TABLE `espacios`
  ADD PRIMARY KEY (`idEspacio`);

--
-- Indices de la tabla `estacionamientos`
--
ALTER TABLE `estacionamientos`
  ADD PRIMARY KEY (`idEstacionamiento`),
  ADD KEY `idVehiculo` (`idVehiculo`),
  ADD KEY `idEspacio` (`idEspacio`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`idReporte`);

--
-- Indices de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  ADD PRIMARY KEY (`idTarifa`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`idVehiculo`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD KEY `fk_espacio` (`idEspacio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `espacios`
--
ALTER TABLE `espacios`
  MODIFY `idEspacio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `estacionamientos`
--
ALTER TABLE `estacionamientos`
  MODIFY `idEstacionamiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  MODIFY `idTarifa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `idVehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estacionamientos`
--
ALTER TABLE `estacionamientos`
  ADD CONSTRAINT `estacionamientos_ibfk_1` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`),
  ADD CONSTRAINT `estacionamientos_ibfk_2` FOREIGN KEY (`idEspacio`) REFERENCES `espacios` (`idEspacio`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_espacio` FOREIGN KEY (`idEspacio`) REFERENCES `espacios` (`idEspacio`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
