DROP TABLE IF EXISTS `KG_WFM_DEV`.`organization`;
CREATE TABLE  `KG_WFM_DEV`.`organization` (
  `organization_id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_code` varchar(50) NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `organization_address` varchar(500) DEFAULT NULL,
  `organization_city` varchar(50) DEFAULT NULL,
  `organization_state` varchar(50) DEFAULT NULL,
  `organization_country` varchar(50) DEFAULT NULL,
  `organization_phone` varchar(50) NOT NULL,
  `organization_status` tinyint(1) unsigned DEFAULT '0',
  `organization_parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;