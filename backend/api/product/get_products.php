<?php
include('../../includes/db_connection.php');

// Get parameters from the GET request
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10; // Default limit is 10
$page = isset($_GET['page']) ? intval($_GET['page']) : 1; // Default page is 1

// Calculate the skip value based on the page and limit
$skip = ($page - 1) * $limit;

// Prepare and execute a SQL query to fetch results with limit and skip
$query = "SELECT * FROM product LIMIT $limit OFFSET $skip";
$result = $connection->query($query);

if ($result) {
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Close the database connection
    $connection->close();

    // Send the data in JSON format
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // Handle database query errors
    echo "Query error: " . $connection->error;
}
?>
