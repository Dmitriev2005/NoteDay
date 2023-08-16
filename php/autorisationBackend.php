<?php
$data = json_decode(file_get_contents('php://input'), true); // Получаем данные из тела запроса

if (isset($data['login']) && isset($data['password'])) {
    $login = $data['login'];
    $password = $data['password'];
    $addres = "127.0.0.1";//

    $connection = mysqli_connect($addres, "root", null, "edit_note", "3306");

    if ($connection) {
        $prepQuery = $connection->prepare("SELECT * FROM user WHERE  password=? and login=?");//$connection->query("SELECT * FROM user WHERE password='".$password."' AND login='".$login."'");
        $prepQuery->bind_param("ss",$password,$login);
        $prepQuery->execute();
        $responseQuery = $prepQuery->get_result();
        
        //
        $id = mysqli_fetch_array($responseQuery)['id'];
        //
        if ($responseQuery && $responseQuery->num_rows > 0) {
            echo json_encode(["login"=>$login, "password"=>$password,"id"=>$id]);
        } else {
            echo "";
        }
    } else {
        echo "connection false";
    }
    $connection->close();

    
} else {
    echo "Invalid parameters.";
}
?>
