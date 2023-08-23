<?php
    require('lib.php');
    $data = json_decode(file_get_contents("php://input"),true);
    if(isset($data)){
        $query = $connect->prepare("DELETE FROM edit_note_event WHERE id=?");
        $query->bind_param("i",$data['id']);
        $res = $query->execute();
        
        if($res)
            http_response_code(201);   
    }
    $connect->close();