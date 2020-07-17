DROP TABLE IF EXISTS `KG_WFM_DEV`.`member_skill`;
CREATE TABLE  `KG_WFM_DEV`.`member_skill` (
  `member_skill_point_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `skill_id` int(11) DEFAULT NULL,
  `member_skill_level` int(100) NOT NULL,
  PRIMARY KEY (`member_skill_point_id`),
  KEY `FK_member_skill_1` (`member_id`),
  KEY `FK_member_skill_2` (`skill_id`),
  CONSTRAINT `FK_member_skill_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_member_skill_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;