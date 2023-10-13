<?php
include('../includes/db_connection.php');

// Function to get all users or a specific user by user_id
function getUserData($connection, $user_id = null) {
    $response = array();

    if ($user_id === null) {
        // Fetch all users
        $sql = "SELECT * FROM users";
    } else {
        // Fetch a specific user by user_id
        $user_id = mysqli_real_escape_string($connection, $user_id);
        $sql = "SELECT * FROM users WHERE id = $user_id";
    }

    $result = mysqli_query($connection, $sql);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $response[] = $row;
            }
        }
    }

    return $response;
}

// Check for the user_id parameter
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];
    $userData = getUserData($connection, $user_id);
} else {
    $userData = getUserData($connection);
}

header('Content-Type: application/json'); // Set the response header to JSON
echo json_encode($userData);
?>
