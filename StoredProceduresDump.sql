-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: urbandb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `professional_id` bigint DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  `scheduled_start` datetime NOT NULL,
  `scheduled_end` datetime NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'BOOKED',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `professional_id` (`professional_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE,
  CONSTRAINT `chk_booking_status` CHECK ((`status` in (_utf8mb4'BOOKED',_utf8mb4'COMPLETED',_utf8mb4'CANCELED',_utf8mb4'RESCHEDULED')))
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (50,11,1,1,'2025-07-23 13:00:00','2025-07-23 14:30:00','COMPLETED','2025-07-23 02:12:02','2025-07-23 09:04:15'),(51,11,1,1,'2025-07-23 10:00:00','2025-07-23 11:30:00','COMPLETED','2025-07-23 02:12:35','2025-07-23 09:03:43'),(52,11,1,1,'2025-07-24 14:30:00','2025-07-24 16:00:00','COMPLETED','2025-07-23 02:19:11','2025-07-23 11:01:49'),(53,8,1,1,'2025-07-23 14:30:00','2025-07-23 16:00:00','BOOKED','2025-07-23 02:20:56',NULL),(54,8,18,1,'2025-07-23 11:30:00','2025-07-23 13:00:00','BOOKED','2025-07-23 02:21:11','2025-07-23 09:18:13'),(55,11,1,1,'2025-07-25 11:30:00','2025-07-25 13:00:00','COMPLETED','2025-07-23 09:28:50','2025-07-23 09:29:22'),(56,11,18,1,'2025-07-23 14:30:00','2025-07-23 16:00:00','COMPLETED','2025-07-23 11:01:08','2025-07-23 11:02:08'),(57,11,18,1,'2025-07-26 11:30:00','2025-07-26 13:00:00','CANCELED','2025-07-23 11:03:54','2025-07-23 11:35:57'),(58,11,16,2,'2025-07-23 10:00:00','2025-07-23 12:00:00','RESCHEDULED','2025-07-23 11:07:25','2025-07-23 17:28:47'),(59,11,16,2,'2025-07-24 14:00:00','2025-07-24 16:00:00','RESCHEDULED','2025-07-23 11:07:36','2025-07-23 17:29:11'),(60,11,1,1,'2025-07-23 11:30:00','2025-07-23 13:00:00','COMPLETED','2025-07-23 11:27:09','2025-07-23 11:27:39'),(61,11,1,1,'2025-07-25 11:30:00','2025-07-25 13:00:00','RESCHEDULED','2025-07-23 12:31:36','2025-07-23 17:48:51'),(62,11,1,1,'2025-07-24 04:30:00','2025-07-24 06:00:00','RESCHEDULED','2025-07-23 12:35:26','2025-07-23 14:03:22'),(63,11,1,1,'2025-07-26 04:30:00','2025-07-26 06:00:00','RESCHEDULED','2025-07-23 13:07:35','2025-07-23 14:04:59'),(64,11,18,1,'2025-07-26 13:00:00','2025-07-26 14:30:00','BOOKED','2025-07-23 13:45:43',NULL),(65,11,1,1,'2025-07-26 13:00:00','2025-07-26 14:30:00','BOOKED','2025-07-23 13:52:45',NULL),(66,11,1,1,'2025-07-25 10:00:00','2025-07-25 11:30:00','CANCELED','2025-07-23 17:39:05','2025-07-23 18:00:31'),(67,11,16,2,'2025-07-30 12:00:00','2025-07-30 14:00:00','BOOKED','2025-07-23 17:53:31',NULL),(68,8,16,2,'2025-07-26 12:00:00','2025-07-26 14:00:00','CANCELED','2025-07-23 18:52:06','2025-07-23 18:54:03'),(69,8,18,3,'2025-07-25 10:45:00','2025-07-25 11:30:00','BOOKED','2025-07-23 18:52:55',NULL),(70,8,18,3,'2025-07-24 16:00:00','2025-07-24 16:45:00','BOOKED','2025-07-23 18:53:12',NULL),(71,11,18,1,'2025-07-26 10:00:00','2025-07-26 11:30:00','BOOKED','2025-07-23 19:28:58',NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_availability`
--

DROP TABLE IF EXISTS `professional_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional_availability` (
  `availability_id` bigint NOT NULL AUTO_INCREMENT,
  `professional_id` bigint DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `is_booked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`availability_id`),
  KEY `professional_id` (`professional_id`),
  CONSTRAINT `professional_availability_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=674 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_availability`
--

LOCK TABLES `professional_availability` WRITE;
/*!40000 ALTER TABLE `professional_availability` DISABLE KEYS */;
INSERT INTO `professional_availability` VALUES (576,19,'2025-07-23 10:00:00','2025-07-23 17:00:00',0),(577,18,'2025-07-23 10:00:00','2025-07-23 17:00:00',1),(578,17,'2025-07-23 10:00:00','2025-07-23 17:00:00',0),(579,16,'2025-07-23 10:00:00','2025-07-23 17:00:00',0),(580,2,'2025-07-23 10:00:00','2025-07-23 17:00:00',0),(581,1,'2025-07-23 10:00:00','2025-07-23 17:00:00',1),(582,19,'2025-07-24 10:00:00','2025-07-24 17:00:00',0),(583,18,'2025-07-24 10:00:00','2025-07-24 17:00:00',1),(584,17,'2025-07-24 10:00:00','2025-07-24 17:00:00',0),(585,16,'2025-07-24 10:00:00','2025-07-24 17:00:00',1),(586,2,'2025-07-24 10:00:00','2025-07-24 17:00:00',0),(587,1,'2025-07-24 10:00:00','2025-07-24 17:00:00',1),(588,19,'2025-07-25 10:00:00','2025-07-25 17:00:00',0),(589,18,'2025-07-25 10:00:00','2025-07-25 17:00:00',1),(590,17,'2025-07-25 10:00:00','2025-07-25 17:00:00',0),(591,16,'2025-07-25 10:00:00','2025-07-25 17:00:00',1),(592,2,'2025-07-25 10:00:00','2025-07-25 17:00:00',0),(593,1,'2025-07-25 10:00:00','2025-07-25 17:00:00',1),(594,19,'2025-07-26 10:00:00','2025-07-26 17:00:00',0),(595,18,'2025-07-26 10:00:00','2025-07-26 17:00:00',1),(596,17,'2025-07-26 10:00:00','2025-07-26 17:00:00',0),(597,16,'2025-07-26 10:00:00','2025-07-26 17:00:00',0),(598,2,'2025-07-26 10:00:00','2025-07-26 17:00:00',0),(599,1,'2025-07-26 10:00:00','2025-07-26 17:00:00',1),(600,19,'2025-07-27 10:00:00','2025-07-27 17:00:00',0),(601,18,'2025-07-27 10:00:00','2025-07-27 17:00:00',0),(602,17,'2025-07-27 10:00:00','2025-07-27 17:00:00',0),(603,16,'2025-07-27 10:00:00','2025-07-27 17:00:00',0),(604,2,'2025-07-27 10:00:00','2025-07-27 17:00:00',0),(605,1,'2025-07-27 10:00:00','2025-07-27 17:00:00',0),(606,19,'2025-07-28 10:00:00','2025-07-28 17:00:00',0),(607,18,'2025-07-28 10:00:00','2025-07-28 17:00:00',0),(608,17,'2025-07-28 10:00:00','2025-07-28 17:00:00',0),(609,16,'2025-07-28 10:00:00','2025-07-28 17:00:00',0),(610,2,'2025-07-28 10:00:00','2025-07-28 17:00:00',0),(611,1,'2025-07-28 10:00:00','2025-07-28 17:00:00',0),(612,19,'2025-07-29 10:00:00','2025-07-29 17:00:00',0),(613,18,'2025-07-29 10:00:00','2025-07-29 17:00:00',0),(614,17,'2025-07-29 10:00:00','2025-07-29 17:00:00',0),(615,16,'2025-07-29 10:00:00','2025-07-29 17:00:00',0),(616,2,'2025-07-29 10:00:00','2025-07-29 17:00:00',0),(617,1,'2025-07-29 10:00:00','2025-07-29 17:00:00',0),(618,19,'2025-07-30 10:00:00','2025-07-30 17:00:00',0),(619,18,'2025-07-30 10:00:00','2025-07-30 17:00:00',0),(620,17,'2025-07-30 10:00:00','2025-07-30 17:00:00',0),(621,16,'2025-07-30 10:00:00','2025-07-30 17:00:00',1),(622,2,'2025-07-30 10:00:00','2025-07-30 17:00:00',0),(623,1,'2025-07-30 10:00:00','2025-07-30 17:00:00',0),(624,19,'2025-07-31 10:00:00','2025-07-31 17:00:00',0),(625,18,'2025-07-31 10:00:00','2025-07-31 17:00:00',0),(626,17,'2025-07-31 10:00:00','2025-07-31 17:00:00',0),(627,16,'2025-07-31 10:00:00','2025-07-31 17:00:00',0),(628,2,'2025-07-31 10:00:00','2025-07-31 17:00:00',0),(629,1,'2025-07-31 10:00:00','2025-07-31 17:00:00',0),(630,19,'2025-08-01 10:00:00','2025-08-01 17:00:00',0),(631,18,'2025-08-01 10:00:00','2025-08-01 17:00:00',0),(632,17,'2025-08-01 10:00:00','2025-08-01 17:00:00',0),(633,16,'2025-08-01 10:00:00','2025-08-01 17:00:00',0),(634,2,'2025-08-01 10:00:00','2025-08-01 17:00:00',0),(635,1,'2025-08-01 10:00:00','2025-08-01 17:00:00',0),(639,1,'2025-07-23 10:00:00','2025-07-23 13:00:00',1),(640,1,'2025-07-23 14:30:00','2025-07-23 17:00:00',1),(641,1,'2025-07-23 11:30:00','2025-07-23 13:00:00',1),(642,1,'2025-07-24 10:00:00','2025-07-24 14:30:00',1),(643,1,'2025-07-24 16:00:00','2025-07-24 17:00:00',0),(644,1,'2025-07-23 16:00:00','2025-07-23 17:00:00',0),(645,18,'2025-07-23 10:00:00','2025-07-23 11:30:00',0),(646,18,'2025-07-23 13:00:00','2025-07-23 17:00:00',1),(647,18,'2025-07-24 10:00:00','2025-07-24 11:30:00',1),(648,18,'2025-07-24 13:00:00','2025-07-24 17:00:00',1),(649,18,'2025-07-24 13:00:00','2025-07-24 14:30:00',1),(650,18,'2025-07-24 16:00:00','2025-07-24 17:00:00',1),(651,1,'2025-07-26 10:00:00','2025-07-26 14:30:00',1),(652,1,'2025-07-26 16:00:00','2025-07-26 17:00:00',0),(653,18,'2025-07-23 14:30:00','2025-07-23 17:00:00',1),(654,1,'2025-07-25 10:00:00','2025-07-25 11:30:00',1),(655,1,'2025-07-25 13:00:00','2025-07-25 17:00:00',1),(656,18,'2025-07-23 16:00:00','2025-07-23 17:00:00',0),(657,18,'2025-07-26 10:00:00','2025-07-26 11:30:00',1),(658,18,'2025-07-26 13:00:00','2025-07-26 17:00:00',1),(659,16,'2025-07-24 10:00:00','2025-07-24 12:00:00',1),(660,16,'2025-07-24 14:00:00','2025-07-24 17:00:00',0),(661,1,'2025-07-24 10:00:00','2025-07-24 11:30:00',0),(662,1,'2025-07-24 13:00:00','2025-07-24 14:30:00',1),(663,1,'2025-07-25 13:00:00','2025-07-25 14:30:00',0),(664,1,'2025-07-25 16:00:00','2025-07-25 17:00:00',0),(665,18,'2025-07-26 14:30:00','2025-07-26 17:00:00',0),(666,1,'2025-07-26 10:00:00','2025-07-26 13:00:00',0),(667,16,'2025-07-30 10:00:00','2025-07-30 12:00:00',0),(668,16,'2025-07-30 14:00:00','2025-07-30 17:00:00',0),(669,16,'2025-07-25 10:00:00','2025-07-25 12:00:00',0),(670,16,'2025-07-25 14:00:00','2025-07-25 17:00:00',0),(671,18,'2025-07-25 10:00:00','2025-07-25 10:45:00',0),(672,18,'2025-07-25 11:30:00','2025-07-25 17:00:00',0),(673,18,'2025-07-24 16:45:00','2025-07-24 17:00:00',0);
/*!40000 ALTER TABLE `professional_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_details`
--

DROP TABLE IF EXISTS `professional_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional_details` (
  `professional_id` bigint NOT NULL,
  `rating` decimal(2,1) DEFAULT '0.0',
  `profile_bio` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`professional_id`),
  CONSTRAINT `professional_details_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_details`
--

LOCK TABLES `professional_details` WRITE;
/*!40000 ALTER TABLE `professional_details` DISABLE KEYS */;
INSERT INTO `professional_details` VALUES (1,3.5,'Expert in AC, refrigerator, and washing machine repair. 10+ years of experience.','2025-07-22 04:34:40'),(2,4.9,'Certified professional specializing in pest control and grooming services.','2025-07-22 04:40:10'),(16,0.0,'Experienced plumber with 8+ years of expertise in residential and commercial plumbing services. Known for timely service and quality work.','2025-07-22 17:36:04'),(17,0.0,'test','2025-07-22 17:39:18'),(18,4.0,'Certified beautician with 5+ years of salon experience.','2025-07-22 21:34:11'),(19,0.0,'Home electrician specializing in repairs and installations.','2025-07-22 21:34:47');
/*!40000 ALTER TABLE `professional_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_reviews`
--

DROP TABLE IF EXISTS `professional_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional_reviews` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint DEFAULT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `professional_reviews_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`) ON DELETE CASCADE,
  CONSTRAINT `professional_reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_reviews`
--

LOCK TABLES `professional_reviews` WRITE;
/*!40000 ALTER TABLE `professional_reviews` DISABLE KEYS */;
INSERT INTO `professional_reviews` VALUES (2,55,5,'Good Work','2025-07-23 10:33:56'),(3,50,4,'Great','2025-07-23 10:39:10'),(4,51,2,'','2025-07-23 10:50:03'),(5,56,4,'','2025-07-23 11:02:22'),(6,60,3,'','2025-07-23 11:27:58');
/*!40000 ALTER TABLE `professional_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_services`
--

DROP TABLE IF EXISTS `professional_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional_services` (
  `professional_id` bigint NOT NULL,
  `service_id` bigint NOT NULL,
  PRIMARY KEY (`professional_id`,`service_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `professional_services_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `professional_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_services`
--

LOCK TABLES `professional_services` WRITE;
/*!40000 ALTER TABLE `professional_services` DISABLE KEYS */;
INSERT INTO `professional_services` VALUES (1,1),(18,1),(1,2),(16,2),(17,2),(2,3),(17,3),(18,3),(1,4),(16,4),(19,4),(2,5),(19,5);
/*!40000 ALTER TABLE `professional_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `service_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `description` text,
  `duration_minutes` int NOT NULL DEFAULT '60',
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'AC Repair','Appliances','Diagnose and fix air conditioner cooling or noise issues.',90),(2,'House Cleaning','Cleaning','Complete deep cleaning of all rooms, kitchen, and bathrooms.',120),(3,'Haircut','Grooming','Professional haircut and grooming service at home.',45),(4,'Plumbing','Maintenance','Fix leaky taps, blocked drains, and pipe installations.',60),(5,'Pest Control','Health & Safety','Full-house pest and insect control using eco-friendly chemicals.',90),(8,'Beard Trimming','Grooming','Professional beard trimming and styling service tailored to your face shape and preferences.',30),(9,'Washing Machine Repair','Appliances','Fix spinning, drainage, or motor-related issues.',60),(10,'Bathroom Cleaning','Cleaning','Intensive cleaning of bathroom tiles, taps, and fittings.',60),(11,'Tap Leakage Repair','Maintenance','Fix dripping or broken faucets in kitchen or bathroom.',30),(12,'Fire Extinguisher Inspection','Health & Safety','Ensure fire extinguishers are fully functional and compliant with safety standards. Includes pressure check, tag update, and replacement if needed.',30);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('customer','professional','admin') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Arjun Rao','arjun@fixit.com','professional','2025-07-22 04:28:28'),(2,'Meera Joshi','meera@gmail.com','customer','2025-07-22 04:28:28'),(3,'Nisha Verma','nisha@homehelp.com','professional','2025-07-22 04:40:10'),(5,'string','string','customer','2025-07-22 02:42:23'),(7,'Oppai Beast','beastoppai@gmail.com','customer','2025-07-22 05:38:22'),(8,'Shreyansh Sarthak','shreyanshsarthak10@gmail.com','customer','2025-07-22 05:54:28'),(9,'WiFiCrusher','sarthakmichal@gmail.com','customer','2025-07-22 10:01:09'),(11,'Shreyansh Sarthak','ssarthak1002@gmail.com','admin','2025-07-22 10:36:47'),(16,'Ravi Kumar','ravi.kumar@example.com','professional','2025-07-22 17:36:04'),(17,'abc','abc@gmail.com','professional','2025-07-22 17:39:18'),(18,'Ananya Sharma','ananya.sharma@example.com','professional','2025-07-22 21:34:11'),(19,'Rohit Verma','rohit.verma@example.com','professional','2025-07-22 21:34:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'urbandb'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetAllServices` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllServices`()
BEGIN

    SELECT * FROM services;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetTopBookedProfessionals` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetTopBookedProfessionals`()
BEGIN

    SELECT 

        u.user_id,

        u.name AS professional_name,

        pd.rating,

        pd.profile_bio,

        GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ', ') AS services_offered,

        COUNT(b.booking_id) AS total_bookings

    FROM users u

    JOIN bookings b ON u.user_id = b.professional_id

    LEFT JOIN professional_reviews r ON b.booking_id = r.booking_id

    LEFT JOIN professional_details pd ON u.user_id = pd.professional_id

    LEFT JOIN professional_services ps ON u.user_id = ps.professional_id

    LEFT JOIN services s ON ps.service_id = s.service_id

    WHERE u.role = 'professional'

    GROUP BY u.user_id, u.name, pd.rating, pd.profile_bio

    ORDER BY total_bookings DESC

    LIMIT 3;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetUpcomingBookingsForUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetUpcomingBookingsForUser`(IN p_userId BIGINT)
BEGIN

SELECT b.booking_id,

    b.user_id,

    b.professional_id,

    b.service_id,

    b.scheduled_start,

    b.scheduled_end,

    b.status,

    s.name AS service_name,

    p.name AS professional_name

FROM bookings b

    JOIN services s ON b.service_id = s.service_id

    JOIN users p ON b.professional_id = p.user_id

WHERE b.user_id = p_userId

    AND b.scheduled_start > UTC_TIMESTAMP()

    AND b.status IN ('BOOKED', 'RESCHEDULED')

ORDER BY b.scheduled_start ASC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-24  2:33:02
