DROP TABLE IF EXISTS `KG_WFM_DEV`.`permission_group`;
CREATE TABLE  `KG_WFM_DEV`.`permission_group` (
  `permission_group_id` int(11) NOT NULL,
  `permission_group_name` varchar(50) NOT NULL,
  `permission_group_description` varchar(255) DEFAULT NULL,
  `permission_group_list` varchar(255) DEFAULT NULL,
  `permission_group_status` tinyint(1) DEFAULT '0',
  `organization_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`permission_group_id`),
  KEY `fk_organization_id` (`organization_id`) USING BTREE,
  CONSTRAINT `FK_permission_group_1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;