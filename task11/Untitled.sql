-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: twitter
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `POST`
--

DROP TABLE IF EXISTS `POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `POST` (
  `POST_ID` int NOT NULL,
  `USER_ID` int NOT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `CREATED_AT` datetime NOT NULL,
  PRIMARY KEY (`POST_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  CONSTRAINT `USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POST`
--

LOCK TABLES `POST` WRITE;
/*!40000 ALTER TABLE `POST` DISABLE KEYS */;
INSERT INTO `POST` VALUES (0,11,'Desc0','2020-03-01 10:10:10'),(1,15,'Desc1','2020-03-01 11:10:10'),(2,11,'Desc2','2020-03-01 12:10:10'),(3,14,'Desc3','2020-03-01 13:10:10'),(4,12,'Desc4','2020-03-01 14:10:10'),(5,18,'Desc5','2020-03-01 15:10:10'),(6,19,'Desc6','2020-03-01 16:10:10'),(7,17,'Desc7','2020-03-01 17:10:10'),(8,12,'Desc8','2020-03-01 18:10:10'),(9,19,'Desc9','2020-03-01 19:10:10'),(10,15,'Desc10','2020-05-11 11:10:10'),(11,12,'Desc11 hello','2020-05-11 12:10:10'),(12,12,'Desc12 hello','2020-05-11 13:10:10'),(13,12,'Desc13 hello','2020-05-11 14:10:10'),(14,12,'Desc14 hello','2020-05-11 12:10:10');
/*!40000 ALTER TABLE `POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TAG`
--

DROP TABLE IF EXISTS `TAG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TAG` (
  `TAG_ID` int NOT NULL AUTO_INCREMENT,
  `TAG_NAME` varchar(60) NOT NULL,
  PRIMARY KEY (`TAG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TAG`
--

LOCK TABLES `TAG` WRITE;
/*!40000 ALTER TABLE `TAG` DISABLE KEYS */;
/*!40000 ALTER TABLE `TAG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TAG_TO_POST`
--

DROP TABLE IF EXISTS `TAG_TO_POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TAG_TO_POST` (
  `TAG_ID` int DEFAULT NULL,
  `POST_ID` int DEFAULT NULL,
  KEY `TAG_ID_idx` (`TAG_ID`),
  KEY `POST_ID_idx` (`POST_ID`),
  CONSTRAINT `POST_ID` FOREIGN KEY (`POST_ID`) REFERENCES `POST` (`POST_ID`),
  CONSTRAINT `TAG_ID` FOREIGN KEY (`TAG_ID`) REFERENCES `TAG` (`TAG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TAG_TO_POST`
--

LOCK TABLES `TAG_TO_POST` WRITE;
/*!40000 ALTER TABLE `TAG_TO_POST` DISABLE KEYS */;
/*!40000 ALTER TABLE `TAG_TO_POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(60) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (10,'Alex'),(11,'T-Rexh'),(12,'PteraDuct'),(13,'Elasmozavr'),(14,'TreeZeratops'),(15,'Stegosaurus'),(16,'Spinosaurus'),(17,'Velociraptor'),(18,'Megalosaurus'),(19,'Archaeopteryx'),(20,'T-Rexh');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-11 18:02:08
