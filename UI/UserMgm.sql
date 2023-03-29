/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.32 : Database - user
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`user` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `user`;

/*Table structure for table `hibernate_sequence` */

DROP TABLE IF EXISTS `hibernate_sequence`;

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `hibernate_sequence` */

insert  into `hibernate_sequence`(`next_val`) values 
(120);

/*Table structure for table `jwt_token` */

DROP TABLE IF EXISTS `jwt_token`;

CREATE TABLE `jwt_token` (
  `token` varchar(500) NOT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jwt_token` */

/*Table structure for table `leaves` */

DROP TABLE IF EXISTS `leaves`;

CREATE TABLE `leaves` (
  `leave_id` int NOT NULL,
  `applied_by` int NOT NULL,
  `date_of_absence` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`leave_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `leaves` */

insert  into `leaves`(`leave_id`,`applied_by`,`date_of_absence`,`status`) values 
(46,42,'2023-05-04','Rejected'),
(49,48,'2023-05-05','Accepted'),
(52,48,'2023-05-05','Rejected'),
(53,48,'2023-03-20','Accepted'),
(56,48,'2023-03-20','Rejected'),
(114,48,'2023-03-20','Applied'),
(115,48,NULL,'Applied'),
(116,48,NULL,'Applied'),
(117,48,'1970-01-02','Applied'),
(118,48,'2023-02-04','Applied'),
(119,48,'2023-03-11','Applied');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `roles` */

insert  into `roles`(`role_id`,`description`,`name`) values 
(1,'Employee Role','ROLE_EMPLOYEE'),
(2,'Manager Role','ROLE_MANAGER'),
(3,'Admin Role','ROLE_ADMIN');

/*Table structure for table `task_details` */

DROP TABLE IF EXISTS `task_details`;

CREATE TABLE `task_details` (
  `task_id` int NOT NULL,
  `assigned_by` int NOT NULL,
  `assigned_to` int NOT NULL,
  `created_at` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `task_name` varchar(255) DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `task_details` */

insert  into `task_details`(`task_id`,`assigned_by`,`assigned_to`,`created_at`,`status`,`task_name`,`updated_at`) values 
(47,43,44,'2023-03-18','On hold','Task1','2023-03-18'),
(50,43,48,'2023-03-18','Stuck somewhere','Task2','2023-03-20'),
(51,43,48,'2023-03-19','Completed','Tasker1','2023-03-20'),
(57,43,48,'2023-03-20','Assigned','Demo Task',NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK60qlg9oata44io3a80yh31536` (`role_id`),
  CONSTRAINT `FK60qlg9oata44io3a80yh31536` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user` */

insert  into `user`(`user_id`,`email`,`first_name`,`last_name`,`password`,`role_id`,`manager_id`) values 
(1,'admin@def.com','Admin','Admin','$2a$10$ZoIYvQ9Wu0UWEYwJy1oldOzagHdbZT89y/iOykzv9AOR4QT7oAg96',3,NULL),
(4,'abc12@def.com','Ravi','K','$2a$10$pmtMrgBma4iPdg8Zk4KWVOi9H4UUvRnQywqwKU0LWCUXXwVm02M2C',2,NULL),
(39,'h123@def.com','Hello','World','$2a$10$9W9OJHtD9XPpFvWiMJKVP.n/lUZBAezgk2VPapqtNkvx9HoQZ7FB6',1,41),
(41,'abc44@def.com','Vinayak','Sharma','$2a$10$8nNRWdML5KvYdcOhftSmcuT.8d5ToNp7ReSXBZrFvUl4Ku2zniyyq',2,43),
(42,'usernew@def.com','Test','User','$2a$10$G8thF/B2Mv8cRvkFeJBi.OgymtVd9Igrlq7IcOCrdV.CB3J50K/6u',1,41),
(43,'mgr@def.com','Mgr','User','$2a$10$HWGmdvjC7UkjAvCVZLceS.h8nWnRr4biZ.kKWn2lyDyJPdKul3hsK',2,NULL),
(44,'re12@def.com','New','User','$2a$10$g8MFspcx4n9KgRECKpu4r.VVWgqnKvinghFNKAh7rlYCOBfTnDE5e',1,41),
(48,'te12@def.com','New12345','User','$2a$10$nJVWPA2PWlck2HOOmhjPfO5zH48ozJMpHxOaxR6dQ2AlnqO1a/Yiy',1,43),
(54,'lol@def.com','My','User','$2a$10$eQePxVkbqnf447/kCWeSWOhBW9IHuYqoeRx/T9k5qCsUc7MOhmvjO',1,NULL),
(55,'lol12@def.com','My','Manager','$2a$10$O/WpIeB8YSEtdUt/6SK3eOVMK/ASrEHFTGTrD.Fdcs49ihYXfvAtG',2,43),
(58,'demoUser@def.com','Demo','User','$2a$10$v7I0tokk7dH09PUemK5cyeXAobdv5/1RVXFj6Vl14a7Ky2kzpSJ/K',1,43);

/*Table structure for table `user_role_mapping` */

DROP TABLE IF EXISTS `user_role_mapping`;

CREATE TABLE `user_role_mapping` (
  `user_role_mapping_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`user_role_mapping_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user_role_mapping` */

insert  into `user_role_mapping`(`user_role_mapping_id`,`user_id`,`role_id`) values 
(1,'5','1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
