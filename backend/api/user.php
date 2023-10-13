<?php
include('../includes/db_connection.php');

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo "GET request received" .PHP_EOL;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "POST request received";
}

?>
