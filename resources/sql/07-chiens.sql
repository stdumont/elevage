SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Déchargement des données de la table `chiens`
--

INSERT INTO `chiens` (`id`, `nom`, `affixe`, `sexe`, `race_id`, `robe_id`, `date_naissance`, `date_deces`, `pere_id`, `mere_id`, `puce`, `passeport`, `pedigree`, `tatouage`, `client_id`, `portee_id`, `chiot_id`, `present`, `produit`, `reproducteur`, `remarques`, `created_at`, `updated_at`) VALUES
(1, 'Follow Me', 'des Marais de Brêmes', 'M', 1, 3, '2010-09-16', NULL, NULL, NULL, '250269500380256', NULL, 'LOSH 9140430', NULL, NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL),
(2, 'Justin', 'of Impsland', 'M', 1, 2, '2014-01-21', NULL, NULL, NULL, '250269500631365', NULL, 'LOSH 9159119', NULL, NULL, NULL, NULL, 1, 0, 1, NULL, NULL, NULL),
(3, 'Moon Light', 'des Rubis de Lady C', 'F', 1, 4, '2013-12-23', NULL, 1, NULL, NULL, NULL, 'LOSH 1138682', NULL, NULL, NULL, NULL, 1, 1, 1, NULL, NULL, NULL),
(4, 'Netty', 'des Rubis de Lady C', 'F', 1, 3, '2014-06-21', NULL, 1, NULL, '947000000461961', NULL, 'LOSH 1147753', NULL, NULL, NULL, NULL, 1, 1, 1, NULL, NULL, NULL);


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
