DROP TABLE IF EXISTS `KG_WFM_DEV`.`skill_group`;
CREATE TABLE  `KG_WFM_DEV`.`skill_group` (
  `skill_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_group_name` varchar(50) NOT NULL,
  `skill_group_status` tinyint(1) DEFAULT '0',
  `organization_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`skill_group_id`),
  KEY `FK_skill_group_1` (`organization_id`),
  CONSTRAINT `FK_skill_group_1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;