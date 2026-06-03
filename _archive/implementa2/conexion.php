<?php
    $username = "root";
    $password = "";
    $server = "localhost";
    $database = "tema"; // 

    try {
    
        $pdo = new PDO("mysql:host=$server;dbname=$database;
        charset=utf8", $username, $password);

       
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
       
        die("Error de conexión: " . $e->getMessage());
    }
?>