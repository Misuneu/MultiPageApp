<?

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    include "db_con.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data["username"];
    $email = $data["email"];
    $password = $data["password"];

    $hash = password_hash($password, PASSWORD_DEFAULT);
    
    

    $check = $db->prepare("SELECT email FROM userPixel WHERE email = :emailValue");
    $check->execute([":emailValue" => $email]);

    if ($check->rowCount() > 0) {
        echo json_encode([
            "success" => false,
            "message" => "User already exists"
        ]);
        exit;
    }
    
    $stmt = $db->prepare("INSERT INTO userPixel (username, email, password) VALUES (:usernameValue, :emailValue, :passwordValue)");

    $dbData = [
        ":usernameValue" => $username,
        ":emailValue" => $email,
        ":passwordValue" => $hash
    ];


    $stmt->execute($dbData);

    echo json_encode([
        "success" => true,
        "message" => "User created"
    ])

?>