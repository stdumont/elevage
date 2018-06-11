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
DROP TABLE IF EXISTS `elevage`.`users` ;

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
DROP TABLE IF EXISTS `elevage`.`parameters` ;

CREATE TABLE IF NOT EXISTS `elevage`.`parameters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `valeur` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`pays`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`pays` ;

CREATE TABLE IF NOT EXISTS `elevage`.`pays` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`localites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`localites` ;

CREATE TABLE IF NOT EXISTS `elevage`.`localites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code_postal` VARCHAR(255) NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `pays_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_loc_pays_idx` (`pays_id` ASC),
  CONSTRAINT `fk_loc_pays`
    FOREIGN KEY (`pays_id`)
    REFERENCES `elevage`.`pays` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`elevages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`elevages` ;

CREATE TABLE IF NOT EXISTS `elevage`.`elevages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `affixe` VARCHAR(255) NOT NULL,
  `responsable` VARCHAR(255) NOT NULL,
  `rue` VARCHAR(255) NOT NULL,
  `numero` VARCHAR(255) NOT NULL,
  `localite_id` INT NULL,
  `tva` VARCHAR(255) NOT NULL,
  `tel` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_elevage_loc_idx` (`localite_id` ASC),
  CONSTRAINT `fk_elevage_loc`
    FOREIGN KEY (`localite_id`)
    REFERENCES `elevage`.`localites` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`races`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`races` ;

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
DROP TABLE IF EXISTS `elevage`.`robes` ;

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
-- Table `elevage`.`clients`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`clients` ;

CREATE TABLE IF NOT EXISTS `elevage`.`clients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `prenom` VARCHAR(255) NOT NULL,
  `rue` VARCHAR(255) NULL,
  `numero` VARCHAR(255) NULL,
  `localite_id` INT NULL,
  `tel` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `remarques` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_client_loc_idx` (`localite_id` ASC),
  CONSTRAINT `fk_client_loc`
    FOREIGN KEY (`localite_id`)
    REFERENCES `elevage`.`localites` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`chiens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`chiens` ;

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
  `client_id` INT NULL,
  `remarques` VARCHAR(255) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chien_race_idx` (`race_id` ASC),
  INDEX `fk_chien_robe_idx` (`robe_id` ASC),
  INDEX `fk_chien_pere_idx` (`pere_id` ASC),
  INDEX `fk_chien_mere_idx` (`mere_id` ASC),
  INDEX `fk_chien_client_idx` (`client_id` ASC),
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
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `elevage`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`portees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`portees` ;

CREATE TABLE IF NOT EXISTS `elevage`.`portees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero` INT NOT NULL,
  `pere_id` INT NOT NULL,
  `mere_id` INT NOT NULL,
  `race_id` INT NOT NULL,
  `date_saillie_1` DATE NULL,
  `date_saillie_2` DATE NULL,
  `date_naissance` DATE NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_portee_pere_idx` (`pere_id` ASC),
  INDEX `fk_portee_mere_idx` (`mere_id` ASC),
  INDEX `fk_portee_race_idx` (`race_id` ASC),
  CONSTRAINT `fk_portee_pere`
    FOREIGN KEY (`pere_id`)
    REFERENCES `elevage`.`chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portee_mere`
    FOREIGN KEY (`mere_id`)
    REFERENCES `elevage`.`chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portee_race`
    FOREIGN KEY (`race_id`)
    REFERENCES `elevage`.`races` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevage`.`chiots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevage`.`chiots` ;

CREATE TABLE IF NOT EXISTS `elevage`.`chiots` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `portee_id` INT NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `sexe` VARCHAR(1) NOT NULL,
  `robe_id` INT NOT NULL,
  `chien_id` INT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chiot_portee_idx` (`portee_id` ASC),
  INDEX `fk_chiot_robe_idx` (`robe_id` ASC),
  INDEX `fk_chiot_chien_idx` (`chien_id` ASC),
  CONSTRAINT `fk_chiot_portee`
    FOREIGN KEY (`portee_id`)
    REFERENCES `elevage`.`portees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chiot_robe`
    FOREIGN KEY (`robe_id`)
    REFERENCES `elevage`.`robes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chiot_chien`
    FOREIGN KEY (`chien_id`)
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
-- Data for table `elevage`.`races`
-- -----------------------------------------------------
START TRANSACTION;
USE `elevage`;
INSERT INTO `elevage`.`races` (`id`, `nom`, `created_at`, `updated_at`) VALUES (1, 'Cavalier King Charles', NULL, NULL);
INSERT INTO `elevage`.`races` (`id`, `nom`, `created_at`, `updated_at`) VALUES (2, 'Chihuahua', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `elevage`.`robes`
-- -----------------------------------------------------
START TRANSACTION;
USE `elevage`;
INSERT INTO `elevage`.`robes` (`id`, `race_id`, `nom`, `created_at`, `updated_at`) VALUES (1, 1, 'Blenheïm', NULL, NULL);
INSERT INTO `elevage`.`robes` (`id`, `race_id`, `nom`, `created_at`, `updated_at`) VALUES (2, 1, 'Tricolore', NULL, NULL);
INSERT INTO `elevage`.`robes` (`id`, `race_id`, `nom`, `created_at`, `updated_at`) VALUES (3, 1, 'Noir-Feu', NULL, NULL);
INSERT INTO `elevage`.`robes` (`id`, `race_id`, `nom`, `created_at`, `updated_at`) VALUES (4, 1, 'Rubis', NULL, NULL);

COMMIT;

