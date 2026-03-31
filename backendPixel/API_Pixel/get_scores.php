<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    include "db_con.php";
    $sql = "
        SELECT userPixel.username as name, 
            scoresPixel.score as score, 
            scoresPixel.mode as mode,
            scoresPixel.created_at as created_at
        FROM scoresPixel 
        JOIN userPixel ON scoresPixel.user_id = userPixel.id
        ORDER BY scoresPixel.score DESC 
        LIMIT 20";
    
    $result = $db->query($sql);

    $scores = $result->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($scores);
?>
