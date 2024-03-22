<?php
// Enable CORS
header('Access-Control-Allow-Origin: *');

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $formData = $_POST; // Form data is available in $_POST superglobal array

    // Process form data
    // You can do whatever processing you need here, such as storing data in a database, sending emails, etc.
    
    // Respond to the client
    http_response_code(200); // Set response code to 200 (OK)
    echo 'Data received successfully!';
} else {
    // Respond with error for unsupported request methods
    http_response_code(405); // Set response code to 405 (Method Not Allowed)
    echo 'Method Not Allowed';
}
?>
