SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

INSERT INTO `clients` (`id`, `nom`, `prenom`, `rue`, `numero`, `code_postal`, `localite`, `pays`, `tel1`, `tel2`, `email`, `remarques`, `created_at`, `updated_at`) VALUES
(1, 'De Pauw', 'Sébastien', 'Faubourg de Bruxelles', '89/12', '6041', 'Gosselies', 'Belgique', '0468/530816', NULL, NULL, NULL, '2018-07-25 20:08:06', '2018-07-25 20:08:06'),
(2, 'Scrufari', 'Chlöe', 'Place Deflinne', '7', '7600', 'Perwez', 'Belgique', '0492/986267', NULL, NULL, NULL, '2018-07-25 20:09:11', '2018-07-25 20:09:11'),
(3, 'Doumont', 'Bernadette', 'Tienne Calbalasse', '23', '5020', 'Malonne', 'Belgique', '0478/270009', NULL, NULL, NULL, '2018-07-25 20:10:09', '2018-07-25 20:10:29'),
(4, 'Cremer', 'Alice', 'Rechter Strassens', '82', '4470', 'Born (Amel)', 'Belgique', '080/349964', NULL, NULL, NULL, '2018-07-25 20:14:38', '2018-07-25 20:14:38'),
(5, 'Nasri', 'Aline', 'Bey de Foer', '8', '1370', 'Jodoigne', 'Belgique', '0497/554006', NULL, NULL, NULL, '2018-07-25 20:15:30', '2018-07-25 20:15:30');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
