<?php
	define('DB_NAME', 'masekmi22');
	define('DB_USER', 'masekmi22');
	define('DB_PASSWORD', 'Q3kUSXga');
	define('DB_HOST', '127.0.0.1');

	global $db;
    	$db = new PDO(
            "mysql:host=" .DB_HOST. ";dbname=" .DB_NAME,DB_USER,DB_PASSWORD,
            array(
                    PDO\MYSQL::ATTR_INIT_COMMAND => "SET NAMES utf8"
            )
          );
?>