<?php
include('../../includes/db_connection.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    try {
        // Check if required data is present in the request
        if (!isset($data->user_id, $data->product_id, $data->quantity)) {
            throw new Exception("Invalid request data", 400);
        }

        $user_id = $data->user_id;
        $product_id = $data->product_id;
        $quantity = $data->quantity;

        // Check if the product is already in the user's cart
        $query = "SELECT cart_id, quantity FROM cart WHERE user_id = $user_id AND product_id = $product_id";
        $result = $connection->query($query);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $cart_id = $row['cart_id'];
            $new_quantity = $row['quantity'] + $quantity;

            $update_query = "UPDATE cart SET quantity = $new_quantity WHERE cart_id = $cart_id";
            if (!$connection->query($update_query)) {
                throw new Exception("Failed to update product quantity", 500);
            }

            // Fetch the updated row from the database
            $updated_row_query = "SELECT * FROM cart WHERE cart_id = $cart_id";
            $updated_row_result = $connection->query($updated_row_query);
            $updated_row = $updated_row_result->fetch_assoc();

            http_response_code(200);
            echo json_encode($updated_row);
        } else {
            // Insert a new record if the product is not in the cart
            $insert_query = "INSERT INTO cart (user_id, product_id, quantity) VALUES ($user_id, $product_id, $quantity)";
            if (!$connection->query($insert_query)) {
                throw new Exception("Failed to add product to the cart", 500);
            }

            // Fetch the inserted row from the database
            $inserted_row_id = $connection->insert_id;
            $inserted_row_query = "SELECT * FROM cart WHERE cart_id = $inserted_row_id";
            $inserted_row_result = $connection->query($inserted_row_query);
            $inserted_row = $inserted_row_result->fetch_assoc();

            http_response_code(201);
            echo json_encode($inserted_row);
        }
    } catch (Exception $e) {
        http_response_code($e->getCode());
        echo json_encode(array("message" => $e->getMessage()));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method not allowed"));
}
?>
