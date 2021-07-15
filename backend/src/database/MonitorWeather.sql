CREATE TABLE `monitor_weather` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_citie` varchar(255) DEFAULT NULL,
  `temp` double DEFAULT NULL,
  `temp_min` double DEFAULT NULL,
  `temp_max` double DEFAULT NULL,
  `wind_speed` double DEFAULT NULL,
  `sunrise` time DEFAULT NULL,
  `sunset` time DEFAULT NULL,
  `rain` double DEFAULT NULL,
  `hr_altered` time DEFAULT NULL,
  `dt_altered` date DEFAULT NULL,
  `dt_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
