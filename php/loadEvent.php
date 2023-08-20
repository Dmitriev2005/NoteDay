<?php
        $data = json_decode(file_get_contents('php://input'),true);
        if(isset($data)){
            $addres = "127.0.0.1";
            $user = "root";
            $password = null;
            $nameBase = "edit_note";
            $host = "3306";
    
            $connect = new mysqli($addres,$user,$password,$nameBase,$host);
    
            $query = $connect->prepare("SELECT * FROM edit_note_event WHERE id=?");
            $query->bind_param("i",$data['id']);
            //$res = 
            echo(json_encode($res->fetch_all(MYSQLI_ASSOC)));
        }
       
        