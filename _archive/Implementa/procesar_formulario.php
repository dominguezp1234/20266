<?php
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $username = "root";
    $password = "";
    $server = "localhost";
    $database = "mariana";

    $conexion = new mysqli($server, $username, $password, $database);

    if($conexion->connect_error){
        die("Conexion fallida: " . $conexion->connect_error);
    }
if($_SERVER["REQUEST_METHOD"]=="POST")
    // Variables del formulario
    $nombre = $_POST['nombrereal'];
    $personaje = $_POST['personaje'];
    $altura = $_POST['altura'];
    $peso = $_POST['peso'];
    $poderes = $_POST['poderes'];
    $sexo = $_POST['sexo'];
    $debilidad = $_POST['debilidad'];
    $creacion = $_POST['creacion'];
    $biografia = $_POST['biografia'];

    $sql = "INSERT INTO personajes 
    (nombrereal, personaje, altura, peso, poderes, sexo, debilidad, creacion, biografia) 
    VALUES 
    ('$nombre','$personaje','$altura','$peso','$poderes','$sexo','$debilidad','$creacion','$biografia');";

    if($conexion->query($sql) === TRUE){
        echo "Nuevo personaje creado con éxito";
    } else {
        echo "Error al agregar el nuevo personaje: " . $conexion->error;
    }

    $conexion->close();
}
?>