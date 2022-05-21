<?php
//Native
    ini_set('display_errors', 0);
    $con = mysqli_connect("localhost","root","","sofie");
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
?>