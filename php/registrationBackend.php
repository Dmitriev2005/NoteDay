<?php
    require('lib.php');
    $data = json_decode(file_get_contents('php://input'),true);
    if(isset($data['login']) && isset($data['password'])){
        if($connect){
            $query = $connect->prepare("SELECT * FROM user WHERE login=? AND password=?;");
            $query->bind_param("ss",$data['login'],$data['password']);
            $query->execute();
            $response = $query->get_result();

            if($response && $response->num_rows>0){
                echo "This dublicate user!";
                $connect->close();
            }
            else{
               
                $query = $connect->prepare("INSERT INTO user(login,password) values (?,?);");
                $query->bind_param("ss",$data['login'],$data['password']);
                $query->execute();

                echo "true";

                $connect->close();
            }  
        }
        else{
            echo "Connection false";
        }
    }else{
        echo "Empty data";
    }