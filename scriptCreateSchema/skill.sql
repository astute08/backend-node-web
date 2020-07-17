DROP TABLE IF EXISTS `KG_WFM_DEV`.`skill`;
CREATE TABLE  `KG_WFM_DEV`.`skill` (
  `skill_id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`skill_id`),
  KEY `FK_skill_1` (`skill_group_id`),
  CONSTRAINT `FK_skill_1` FOREIGN KEY (`skill_group_id`) REFERENCES `skill_group` (`skill_group_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;