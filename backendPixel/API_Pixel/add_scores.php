<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include "db_con.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["score"])) {
        echo json_encode(["error" => "Missing score value"]);
        exit;
    }

    $name = isset($data["name"]) && trim($data["name"]) !== "" ? trim($data["name"]) : "Anonymous";
    $score = (int)$data["score"];

    try {
        $stmt = $db->prepare("INSERT INTO scores (name, score) VALUES (:name, :score)");
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":score", $score);
        $stmt->execute();

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
