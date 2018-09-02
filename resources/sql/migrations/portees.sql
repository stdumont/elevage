ALTER TABLE `portees`
	ADD COLUMN `nbr_chiots_viv` INT(11) NOT NULL DEFAULT '0' AFTER `date_naissance`,
	ADD COLUMN `nbr_males_viv` INT(11) NOT NULL DEFAULT '0' AFTER `nbr_chiots_viv`,
	ADD COLUMN `nbr_femelles_viv` INT(11) NOT NULL DEFAULT '0' AFTER `nbr_males_viv`,
	ADD COLUMN `nbr_chiots_dcd` INT(11) NOT NULL DEFAULT '0' AFTER `nbr_femelles_viv`,
	ADD COLUMN `nbr_males_dcd` INT(11) NOT NULL DEFAULT '0' AFTER `nbr_chiots_dcd`,
	ADD COLUMN `nbr_femelles_dcd` INT(11) NOT NULL DEFAULT '0' AFTER `nbr_males_dcd`;