<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "massage_booking";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$service_name = $data['service_name'];
$appointment_date = $data['appointment_date'];
$start_time = $data['start_time'];
$contact_info = $data['contact_info'];
$special_requests = $data['special_requests'];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO appointments (name, service_name, date, time, contact_info, special_requests)
        VALUES ('$name', '$service_name', '$appointment_date', '$start_time', '$contact_info', '$special_requests')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Appointment booked successfully"]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>
