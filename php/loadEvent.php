<?php
    require('lib.php'); 

    $query = $connect->prepare("SELECT * FROM edit_note_event WHERE name_user=?");
    $query->bind_param("i",$_COOKIE['id']);
    $query->execute();

    $res = $query->get_result();
    
    $cook = $_COOKIE['id'];
    $final_result = $res->fetch_all(MYSQLI_ASSOC);
    echo(json_encode($final_result));
    
    $connect->close();

       
        