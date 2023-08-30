<?php
    require('lib.php'); 
    $data = json_decode(file_get_contents('php://input'),true);
    if(isset($data)){
        
        $query = $connect->prepare("INSERT INTO edit_note_event(name_event, date_event, description_event, name_user) values (?, ?, ?, ?);");
        $query->bind_param("sssi", $data['title'], $data['date'], $data['description'], $data['user']);
        $query->execute();

      
        http_response_code(201);
        $connect->close();
        $query->close();
    }