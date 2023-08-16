<?php 
    $data = json_decode(file_get_contents('php://input'),true);
    if(isset($data)){
        //$addres = "192.168.0.104";
        $addres = "127.0.0.1";
        $user = "root";
        $password = null;
        $nameBase = "edit_note";
        $host = "3306";

        $connect = mysqli_connect($addres,$user,$password,$nameBase,$host);
        // $query = $connect->prepare("INSERT INTO edit_note_event(name_event,date_event,description_event,name_user) values (?, ?, ?, ?);");
        // $query->bind_param("sssi",$data['title'],$data['date'],$data['description'],(int)$data['user']);
        // $query->execute();
        $query = $connect->prepare("INSERT INTO edit_note_event(name_event, date_event, description_event, name_user) values (?, ?, ?, ?);");
        $query->bind_param("sssi", $data['title'], $data['date'], $data['description'], $data['user']);
        $query->execute();


        echo "true";
        $connect->close();
    }