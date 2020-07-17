DROP TABLE IF EXISTS `KG_WFM_DEV`.`teams`;
CREATE TABLE  `KG_WFM_DEV`.`teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) unsigned DEFAULT '0',
  `created_by` int(11) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_by` int(11) unsigned DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;