<?php
// Database configuration
$host = 'web03.sd-lab.nl';
$user = 'chef';
$password = 'ontkokingDB';
$database = 'ontkokingDB';
 
// Create connection
$conn = new mysqli($host, $user, $password, $database);
 
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "✅ Connected successfully!";
}
?>