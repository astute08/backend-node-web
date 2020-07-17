DROP TABLE IF EXISTS `KG_WFM_DEV`.`member`;
CREATE TABLE  `KG_WFM_DEV`.`member` (
  `member_id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `permission_group_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `member_status` tinyint(1) DEFAULT '0',
  `member_suspend` tinyint(1) DEFAULT '0',
  `member_suspend_date` datetime DEFAULT NULL,
  `member_terminated` tinyint(1) DEFAULT '0',
  `member_terminated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FK_member_1` (`organization_id`),
  KEY `FK_member_2` (`permission_group_id`),
  CONSTRAINT `FK_member_1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_member_2` FOREIGN KEY (`permission_group_id`) REFERENCES `permission_group` (`permission_group_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;