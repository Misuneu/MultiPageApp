<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include "db_con.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";

    $stmtUser = $db->prepare("SELECT * FROM userPixel WHERE email = :emailValue");
    $stmtUser->execute([":emailValue" => $email]);
    $user = $stmtUser->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "User not found"
        ]);
        exit;
    }

    if (!password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "Incorrect password"
        ]);
        exit;
    }

    $token = bin2hex(random_bytes(32));

    $tokenSave = $db->prepare("UPDATE userPixel SET token = :tokenValue WHERE id = :idValue");
    $tokenSave->execute([":tokenValue" => $token, ":idValue" => $user["id"]]);

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "token" => $token
    ]);
    exit;

?>