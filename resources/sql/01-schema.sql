-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isAdmin` VARCHAR(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `parameters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parameters` ;

CREATE TABLE IF NOT EXISTS `parameters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `valeur` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `elevages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `elevages` ;

CREATE TABLE IF NOT EXISTS `elevages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `affixe` VARCHAR(255) NULL,
  `responsable` VARCHAR(255) NULL,
  `rue` VARCHAR(255) NULL,
  `numero` VARCHAR(255) NULL,
  `code_postal` VARCHAR(5) NULL,
  `localite` VARCHAR(255) NULL,
  `pays` VARCHAR(255) NULL,
  `tva` VARCHAR(255) NULL,
  `tel` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `races`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `races` ;

CREATE TABLE IF NOT EXISTS `races` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `robes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `robes` ;

CREATE TABLE IF NOT EXISTS `robes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `race_id` INT NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_robe_race_idx` (`race_id` ASC),
  CONSTRAINT `fk_robe_race`
    FOREIGN KEY (`race_id`)
    REFERENCES `races` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clients`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clients` ;

CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `prenom` VARCHAR(255) NULL,
  `rue` VARCHAR(255) NULL,
  `numero` VARCHAR(255) NULL,
  `code_postal` VARCHAR(5) NULL,
  `localite` VARCHAR(255) NULL,
  `pays` VARCHAR(255) NULL,
  `tel1` VARCHAR(255) NULL,
  `tel2` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `remarques` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portees` ;

CREATE TABLE IF NOT EXISTS `portees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero` INT NOT NULL,
  `pere_id` INT NOT NULL,
  `mere_id` INT NOT NULL,
  `race_id` INT NOT NULL,
  `date_saillie_1` DATE NULL,
  `date_saillie_2` DATE NULL,
  `date_naissance` DATE NOT NULL,
  `remarques` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_portee_pere_idx` (`pere_id` ASC),
  INDEX `fk_portee_mere_idx` (`mere_id` ASC),
  INDEX `fk_portee_race_idx` (`race_id` ASC),
  CONSTRAINT `fk_portee_pere`
    FOREIGN KEY (`pere_id`)
    REFERENCES `chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portee_mere`
    FOREIGN KEY (`mere_id`)
    REFERENCES `chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portee_race`
    FOREIGN KEY (`race_id`)
    REFERENCES `races` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chiots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `chiots` ;

CREATE TABLE IF NOT EXISTS `chiots` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `portee_id` INT NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `sexe` VARCHAR(1) NOT NULL,
  `robe_id` INT NOT NULL,
  `chien_id` INT NULL,
  `remarques` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chiot_portee_idx` (`portee_id` ASC),
  INDEX `fk_chiot_robe_idx` (`robe_id` ASC),
  INDEX `fk_chiot_chien_idx` (`chien_id` ASC),
  CONSTRAINT `fk_chiot_portee`
    FOREIGN KEY (`portee_id`)
    REFERENCES `portees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chiot_robe`
    FOREIGN KEY (`robe_id`)
    REFERENCES `robes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chiot_chien`
    FOREIGN KEY (`chien_id`)
    REFERENCES `chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chiens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `chiens` ;

CREATE TABLE IF NOT EXISTS `chiens` (
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
  `pedigree` VARCHAR(255) NULL,
  `tatouage` VARCHAR(255) NULL,
  `client_id` INT NULL,
  `portee_id` INT NULL,
  `chiot_id` INT NULL,
  `present` TINYINT(1) NOT NULL DEFAULT 0,
  `produit` TINYINT(1) NOT NULL DEFAULT 0,
  `reproducteur` TINYINT(1) NOT NULL DEFAULT 0,
  `remarques` VARCHAR(255) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chien_race_idx` (`race_id` ASC),
  INDEX `fk_chien_robe_idx` (`robe_id` ASC),
  INDEX `fk_chien_pere_idx` (`pere_id` ASC),
  INDEX `fk_chien_mere_idx` (`mere_id` ASC),
  INDEX `fk_chien_client_idx` (`client_id` ASC),
  INDEX `fk_chien_portee_idx` (`portee_id` ASC),
  INDEX `idx_chien_nom` (`nom` ASC),
  INDEX `idx_chien_sexe` (`sexe` ASC),
  INDEX `fk_chien_chiot_idx` (`chiot_id` ASC),
  CONSTRAINT `fk_chien_race`
    FOREIGN KEY (`race_id`)
    REFERENCES `races` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_robe`
    FOREIGN KEY (`robe_id`)
    REFERENCES `robes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_pere`
    FOREIGN KEY (`pere_id`)
    REFERENCES `chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_mere`
    FOREIGN KEY (`mere_id`)
    REFERENCES `chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_portee`
    FOREIGN KEY (`portee_id`)
    REFERENCES `portees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chien_chiot`
    FOREIGN KEY (`chiot_id`)
    REFERENCES `chiots` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agenda`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda` ;

CREATE TABLE IF NOT EXISTS `agenda` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `allDay` TINYINT(1) NOT NULL DEFAULT 0,
  `start` VARCHAR(255) NOT NULL,
  `end` VARCHAR(255) NULL DEFAULT NULL,
  `generated` TINYINT(1) NOT NULL DEFAULT 0,
  `editable` TINYINT(1) NULL DEFAULT 0,
  `color` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mouvements`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mouvements` ;

CREATE TABLE IF NOT EXISTS `mouvements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `typeMvt` VARCHAR(45) NOT NULL,
  `motifMvt` VARCHAR(45) NOT NULL,
  `dateMvt` DATE NOT NULL,
  `chien_id` INT NOT NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `Mvt_chien_fk_idx` (`chien_id` ASC),
  CONSTRAINT `fk_mouvements_chien`
    FOREIGN KEY (`chien_id`)
    REFERENCES `chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `typedocs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `typedocs` ;

CREATE TABLE IF NOT EXISTS `typedocs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `documents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `documents` ;

CREATE TABLE IF NOT EXISTS `documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `typedoc_id` INT NOT NULL,
  `chien_id` INT NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL,
  `date_document` DATE NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_document_typedoc_idx` (`typedoc_id` ASC),
  INDEX `fk_document_chien_idx` (`chien_id` ASC),
  CONSTRAINT `fk_document_typedoc`
    FOREIGN KEY (`typedoc_id`)
    REFERENCES `typedocs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_document_chien`
    FOREIGN KEY (`chien_id`)
    REFERENCES `chiens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fichiers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fichiers` ;

CREATE TABLE IF NOT EXISTS `fichiers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `document_id` INT NOT NULL,
  `nomFichier` VARCHAR(255) NOT NULL,
  `contentType` VARCHAR(255) NOT NULL,
  `taille` INT NOT NULL,
  `donnee` MEDIUMBLOB NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_fichier_document_idx` (`document_id` ASC),
  CONSTRAINT `fk_fichier_document`
    FOREIGN KEY (`document_id`)
    REFERENCES `documents` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
