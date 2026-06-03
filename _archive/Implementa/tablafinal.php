<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla Final</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            color: #333;
            margin: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h1 {
            color: #2c3e50;
            margin-bottom: 5px;
        }

        h3 {
            color: #7f8c8d;
            font-weight: 400;
            margin-bottom: 30px;
        }

        table {
            border-collapse: collapse;
            width: 90%;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden; 
        }

        th {
            background-color: #3498db;
            color: white;
            padding: 15px;
            text-align: left;
            text-transform: uppercase;
            font-size: 14px;
        }

        td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
            transition: 0.3s;
        }

        .biografia {
            font-style: italic;
            color: #555;
            max-width: 300px; 
        }
    </style>
</head>
<body>
    <?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $username = "root";
    $password = "";
    $server ="localhost";
    $database = "mariana";
    
    $conexion = new mysqli($server, $username, $password, $database);
    
    if($conexion->connect_error){
        die("Conexion fallida: " . $conexion->connect_error);
    }

    if(isset($_POST['id'])){
        $id = $conexion->real_escape_string($_POST['id']);
        // Se quitó el ":" después de personajes
        $extraerdato = $conexion->query("SELECT * FROM personajes WHERE id = $id");

        if ($extraerdato && $extraerdato->num_rows > 0) {
            $fetch = $extraerdato->fetch_assoc();
            $nombrereal = $fetch['nombrereal'];
            $personaje = $fetch['personaje'];
            $altura = $fetch['altura'];
            $peso = $fetch['peso'];
            $poderes = $fetch['poderes'];
            $sexo = $fetch['sexo'];
            $debilidad = $fetch['debilidad'];
            $creacion = $fetch['creacion'];
            $biografia = $fetch['biografia'];
            $imagen = base64_encode($fetch['imagen']);
        } else {
            echo "<p>No se encontró el personaje con el id proporcionado.</p>";
            exit;
        }
    } else {
        echo "<p>No se recibió un ID válido.</p>"; 
        exit;
    }
    ?>
    <div class="personajes">
        <div class="nombrereal">
            Nombre Clave: <?php echo $nombrereal; ?>br
            <div class = "foto"><img class="croop" src="data:image/jpeg;base"</div>
        </div>
    </div>
</body>
</html>