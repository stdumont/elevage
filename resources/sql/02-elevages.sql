SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


INSERT INTO `elevages`(
  `id`, 
  `nom`, 
  `affixe`, 
  `responsable`, 
  `rue`, 
  `numero`, 
  `code_postal`, 
  `localite`, 
  `pays`, 
  `tva`, 
  `tel`, 
  `email`, 
  `created_at`, 
  `updated_at`) 
VALUES (
  NULL,
  'Elevage canin des Rubis de Lady C',
  'des Rubis de Lady C',
  'Stéphane-Catherine Dumont-Delange',
  'Rue Favauche',
  '1',
  '5150',
  'Floriffoux',
  'Belgique',
  'BE 0690.365.232',
  '+32 81 44 68 68',
  'info@lesrubis.com',
  NULL,
  NULL);

ALTER TABLE `elevages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;