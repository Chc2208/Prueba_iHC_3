<?php
date_default_timezone_set('America/Mexico_City');
include "connect.php";
header('Access-Control-Allow-Origin: *');

try {
	$conn = new PDO("mysql:host=$serverName;dbname=$dataBase", $userName, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $conn->prepare("INSERT INTO pikachu (statuspika, reg_date) VALUES (:status, :reg_date)");

	if (isset($_GET["status"])) 
	{ 
		$status = $_GET["status"];
		$reg_date = date('Y-m-d h:i:s');
		//$status = 3;

		$stmt->bindParam(':status', $status);
		$stmt->bindParam(':reg_date', $reg_date);
		$stmt->execute();

		echo "New record-> Status pikachu: " . $status;
	}
} catch (PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}

$conn = null;