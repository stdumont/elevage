-- MySQL dump 10.16  Distrib 10.1.29-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: elevage
-- ------------------------------------------------------
-- Server version	10.1.29-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agenda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `allDay` varchar(5) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `generated` varchar(5) NOT NULL,
  `editable` varchar(5) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chiens`
--

DROP TABLE IF EXISTS `chiens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chiens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `affixe` varchar(255) DEFAULT NULL,
  `sexe` varchar(1) NOT NULL,
  `race_id` int(11) NOT NULL,
  `robe_id` int(11) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `date_deces` date DEFAULT NULL,
  `pere_id` int(11) DEFAULT NULL,
  `mere_id` int(11) DEFAULT NULL,
  `puce` varchar(255) DEFAULT NULL,
  `passeport` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chien_race_idx` (`race_id`),
  KEY `fk_chien_robe_idx` (`robe_id`),
  KEY `fk_chien_pere_idx` (`pere_id`),
  KEY `fk_chien_mere_idx` (`mere_id`),
  KEY `fk_chien_client_idx` (`client_id`),
  CONSTRAINT `fk_chien_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_mere` FOREIGN KEY (`mere_id`) REFERENCES `chiens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_pere` FOREIGN KEY (`pere_id`) REFERENCES `chiens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_race` FOREIGN KEY (`race_id`) REFERENCES `races` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_robe` FOREIGN KEY (`robe_id`) REFERENCES `robes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chiens`
--

LOCK TABLES `chiens` WRITE;
/*!40000 ALTER TABLE `chiens` DISABLE KEYS */;
/*!40000 ALTER TABLE `chiens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chiots`
--

DROP TABLE IF EXISTS `chiots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chiots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `portee_id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `sexe` varchar(1) NOT NULL,
  `robe_id` int(11) NOT NULL,
  `chien_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chiot_portee_idx` (`portee_id`),
  KEY `fk_chiot_robe_idx` (`robe_id`),
  KEY `fk_chiot_chien_idx` (`chien_id`),
  CONSTRAINT `fk_chiot_chien` FOREIGN KEY (`chien_id`) REFERENCES `chiens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chiot_portee` FOREIGN KEY (`portee_id`) REFERENCES `portees` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chiot_robe` FOREIGN KEY (`robe_id`) REFERENCES `robes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chiots`
--

LOCK TABLES `chiots` WRITE;
/*!40000 ALTER TABLE `chiots` DISABLE KEYS */;
/*!40000 ALTER TABLE `chiots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `rue` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `code_postal` varchar(5) DEFAULT NULL,
  `localite` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elevages`
--

DROP TABLE IF EXISTS `elevages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `elevages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `affixe` varchar(255) DEFAULT NULL,
  `responsable` varchar(255) DEFAULT NULL,
  `rue` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `code_postal` varchar(5) DEFAULT NULL,
  `localite` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `tva` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elevages`
--

LOCK TABLES `elevages` WRITE;
/*!40000 ALTER TABLE `elevages` DISABLE KEYS */;
INSERT INTO `elevages` VALUES (1,'Elevage canin des Rubis de Lady C','des Rubis de Lady C','Stéphane-Catherine Dumont-Delange','Rue Favauche','1','5150','Floriffoux','Belgique','BE 0690.365.232','+32 81 44 68 68','info@lesrubis.com',NULL,NULL);
/*!40000 ALTER TABLE `elevages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameters`
--

DROP TABLE IF EXISTS `parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parameters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `valeur` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameters`
--

LOCK TABLES `parameters` WRITE;
/*!40000 ALTER TABLE `parameters` DISABLE KEYS */;
INSERT INTO `parameters` VALUES (1,'APP_NAME','Elevage canin',NULL,NULL),(2,'APP_VERSION','0.1',NULL,NULL),(3,'APP_CREATION_YEAR','2018',NULL,NULL),(4,'APP_AUTHOR','Stéphane Dumont',NULL,NULL),(5,'APP_AUTHOR_MAIL','dumont.stephane@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portees`
--

DROP TABLE IF EXISTS `portees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `pere_id` int(11) NOT NULL,
  `mere_id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `date_saillie_1` date DEFAULT NULL,
  `date_saillie_2` date DEFAULT NULL,
  `date_naissance` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_portee_pere_idx` (`pere_id`),
  KEY `fk_portee_mere_idx` (`mere_id`),
  KEY `fk_portee_race_idx` (`race_id`),
  CONSTRAINT `fk_portee_mere` FOREIGN KEY (`mere_id`) REFERENCES `chiens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_portee_pere` FOREIGN KEY (`pere_id`) REFERENCES `chiens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_portee_race` FOREIGN KEY (`race_id`) REFERENCES `races` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portees`
--

LOCK TABLES `portees` WRITE;
/*!40000 ALTER TABLE `portees` DISABLE KEYS */;
/*!40000 ALTER TABLE `portees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `races`
--

DROP TABLE IF EXISTS `races`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `races`
--

LOCK TABLES `races` WRITE;
/*!40000 ALTER TABLE `races` DISABLE KEYS */;
INSERT INTO `races` VALUES (1,'Cavalier King Charles',NULL,NULL),(2,'Chihuahua',NULL,NULL);
/*!40000 ALTER TABLE `races` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `robes`
--

DROP TABLE IF EXISTS `robes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `robes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race_id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_robe_race_idx` (`race_id`),
  CONSTRAINT `fk_robe_race` FOREIGN KEY (`race_id`) REFERENCES `races` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `robes`
--

LOCK TABLES `robes` WRITE;
/*!40000 ALTER TABLE `robes` DISABLE KEYS */;
INSERT INTO `robes` VALUES (1,1,'Blenheïm',NULL,NULL),(2,1,'Tricolore',NULL,NULL),(3,1,'Noir-Feu',NULL,NULL),(4,1,'Rubis',NULL,NULL);
/*!40000 ALTER TABLE `robes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` varchar(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Stéphane','dumont.stephane@gmail.com','$2y$10$EunfkQSE6wjJkG4WIUi7Xejyzq8U8eaorBZ.cGFhUN2yCAH2dVn1m','1',NULL,NULL),(2,'Catherine','catherine.delange@skynet.be','$2y$10$jX9w0MXYHBbcex6VMkSMhOMVQ6iNQ2c5MLZdjUyrRBUZoDc66aEO2','0',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-21  2:40:06
