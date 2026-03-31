<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    include "db_con.php";
    $data = json_decode(file_get_contents("php://input"), true);
    
    $token = $data["token"];

    $stmt = $db->prepare("SELECT id FROM userPixel WHERE token = :tokenValue");
    $stmt->execute([":tokenValue" => $token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "error" => "Invalid token",
            "token" => $token
        ]);
        exit;
    }

    $userId = $user["id"];

    $mode = $data["mode"];
    $score = $data["score"];

    $saveScore = $db->prepare("Insert INTO scoresPixel (user_id, mode, score) VALUES (:userValue, :modeValue, :scoreValue)");
    
    $scoreData = [
        ":userValue" => $userId,
        ":modeValue" => $mode,
        ":scoreValue" => $score
    ];
    $saveScore->execute($scoreData);

    echo json_encode([
        "status" => "Score saved"
    ]);
    exit;

?>