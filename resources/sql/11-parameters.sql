SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


INSERT INTO `parameters` (`id`, `nom`, `valeur`, `created_at`, `updated_at`) VALUES
(1, 'APP_NAME', 'Elevage canin', NULL, NULL),
(2, 'APP_VERSION', '0.1', NULL, NULL),
(3, 'APP_CREATION_YEAR', '2018', NULL, NULL),
(4, 'APP_AUTHOR', 'Stéphane Dumont', NULL, NULL),
(5, 'APP_AUTHOR_MAIL', 'dumont.stephane@gmail.com', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
