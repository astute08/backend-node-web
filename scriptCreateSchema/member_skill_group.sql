DROP TABLE IF EXISTS `KG_WFM_DEV`.`member_skill_group`;
CREATE TABLE  `KG_WFM_DEV`.`member_skill_group` (
  `member_skill_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `skill_group_id` int(11) DEFAULT NULL,
  `member_skill_level` int(100) NOT NULL,
  `member_skill_status` tinyint(1) DEFAULT '0',
  `member_skill_suspend` tinyint(1) DEFAULT '0',
  `member_skill_suspend_date` datetime DEFAULT NULL,
  `member_skill_terminated` tinyint(1) DEFAULT '0',
  `member_skill_termianted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`member_skill_group_id`),
  KEY `FK_member_skill_group_1` (`member_id`),
  KEY `FK_member_skill_group_2` (`skill_group_id`),
  CONSTRAINT `FK_member_skill_group_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_member_skill_group_2` FOREIGN KEY (`skill_group_id`) REFERENCES `skill_group` (`skill_group_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;