-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema elevage
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `elevage` ;

-- -----------------------------------------------------
-- Schema elevage
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `elevage` DEFAULT CHARACTER SET utf8 ;
USE `elevage` ;

-- -----------------------------------------------------
-- Table `elevage`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elevage`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `elevage`.`parameters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elevage`.`parameters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `valeur` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`elevages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elevage`.`elevages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `affixe` VARCHAR(255) NOT NULL,
  `responsable` VARCHAR(255) NOT NULL,
  `rue` VARCHAR(255) NOT NULL,
  `numero` VARCHAR(255) NOT NULL,
  `code_postal` VARCHAR(255) NOT NULL,
  `localite` VARCHAR(255) NOT NULL,
  `tva` VARCHAR(255) NOT NULL,
  `tel` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`races`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elevage`.`races` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`robes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elevage`.`robes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `race_id` INT NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_robe_race_idx` (`race_id` ASC),
  CONSTRAINT `fk_robe_race`
    FOREIGN KEY (`race_id`)
    REFERENCES `elevage`.`races` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`chiens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `elevage`.`chiens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `affixe` VARCHAR(255) NULL,
  `sexe` VARCHAR(1) NOT NULL,
  `race_id` INT NOT NULL,
  `robe_id` INT NULL,
  `date_naissance` DATE NULL,
  `date_deces` DATE NULL,
  `pere_id` INT NULL,
  `mere_id` INT NULL,
  `puce` VARCHAR(255) NULL,
  `passeport` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chien_race_idx` (`race_id` ASC),
  INDEX `fk_chien_robe_idx` (`robe_id` ASC),
  INDEX `fk_chien_pere_idx` (`pere_id` ASC),
  INDEX `fk_chien_mere_idx` (`mere_id` ASC),
  CONSTRAINT `fk_chien_race`
    FOREIGN KEY (`race_id`)
    REFERENCES `elevage`.`races` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_robe`
    FOREIGN KEY (`robe_id`)
    REFERENCES `elevage`.`robes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_pere`
    FOREIGN KEY (`pere_id`)
    REFERENCES `elevage`.`chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_mere`
    FOREIGN KEY (`mere_id`)
    REFERENCES `elevage`.`chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `elevage`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `elevage`;
INSERT INTO `elevage`.`users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES (1, 'Stéphane', 'dumont.stephane@gmail.com', '$2y$10$EunfkQSE6wjJkG4WIUi7Xejyzq8U8eaorBZ.cGFhUN2yCAH2dVn1m', NULL, NULL);
INSERT INTO `elevage`.`users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES (2, 'Catherine', 'catherine.delange@skynet.be', '$2y$10$jX9w0MXYHBbcex6VMkSMhOMVQ6iNQ2c5MLZdjUyrRBUZoDc66aEO2', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `elevage`.`parameters`
-- -----------------------------------------------------
START TRANSACTION;
USE `elevage`;
INSERT INTO `elevage`.`parameters` (`id`, `nom`, `valeur`, `created_at`, `updated_at`) VALUES (1, 'APP_NAME', 'Elevage canin', NULL, NULL);
INSERT INTO `elevage`.`parameters` (`id`, `nom`, `valeur`, `created_at`, `updated_at`) VALUES (2, 'APP_VERSION', '0.1', NULL, NULL);
INSERT INTO `elevage`.`parameters` (`id`, `nom`, `valeur`, `created_at`, `updated_at`) VALUES (3, 'APP_CREATION_YEAR', '2018', NULL, NULL);
INSERT INTO `elevage`.`parameters` (`id`, `nom`, `valeur`, `created_at`, `updated_at`) VALUES (4, 'APP_AUTHOR', 'Stéphane Dumont', NULL, NULL);
INSERT INTO `elevage`.`parameters` (`id`, `nom`, `valeur`, `created_at`, `updated_at`) VALUES (5, 'APP_AUTHOR_MAIL', 'dumont.stephane@gmail.com', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `elevage`.`elevages`
-- -----------------------------------------------------
START TRANSACTION;
USE `elevage`;
INSERT INTO `elevage`.`elevages` (`id`, `nom`, `affixe`, `responsable`, `rue`, `numero`, `code_postal`, `localite`, `tva`, `tel`, `email`, `created_at`, `updated_at`) VALUES (1, 'Les Cavaliers King Charles des Rubis de Lady C', 'des Rubis de Lady C', 'Stéphane & Catherine Dumont-Delange', 'Rue Favauche', '1', '5150', 'Floriffoux', 'BE.0690.365.232', '+32(81)446868', 'info@lesrubis.com', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `elevage`.`races`
-- -----------------------------------------------------
START TRANSACTION;
USE `elevage`;
INSERT INTO `elevage`.`races` (`id`, `nom`, `created_at`, `updated_at`) VALUES (1, 'Cavalier King Charles', NULL, NULL);
INSERT INTO `elevage`.`races` (`id`, `nom`, `created_at`, `updated_at`) VALUES (2, 'Chihuahua', NULL, NULL);

COMMIT;

