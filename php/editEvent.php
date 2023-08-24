<?php
    require('lib.php');
    $data = json_decode(file_get_contents('php://input'),true);

    if(isset($data)){
        $query = $connect->prepare("UPDATE edit_note_event SET name_event=?, date_event=?, description_event=? WHERE id=?");
        $query->bind_param("sssi",$data['name_event'],$data['date_event'],$data['description_event'],$data['id']);
        $query->execute();
        if($res)
            http_response_code(201);
    }