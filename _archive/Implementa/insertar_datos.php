<?php
$username = "root"; //Luis Fernando Dominguez Peralta
$password = "";
$servername = "localhost:3306";
$database = "implementa0"; //<--aqui va su base de datos de comics

$conexion = new mysqli($servername, $username, $password, $database);

if($conexion->connect_error){
    die("Conexion fallida: " . $conexion->connect_error);
}

// Obtener los datos del formulario
$nombre = htmlspecialchars($_POST['nombre']);
$alias = htmlspecialchars($_POST['alias']);
$fecha_creacion = htmlspecialchars($_POST['fecha_creacion']);
$descripcion = htmlspecialchars($_POST['descripcion']);
$comics = explode(',', htmlspecialchars($_POST['comics']));
$superpoderes = explode(',', htmlspecialchars($_POST['superpoderes']));

// aqui agrego los valores a la tabla de personajes
$sql_personaje = "INSERT INTO Personajes (Nombre, Alias, FechaDeCreacion, Descripcion) VALUES (?,?,?,?)";
$stmt = $conexion->prepare($sql_personaje);
$stmt->bind_param("ssss", $nombre, $alias, $fecha_creacion, $descripcion);
$stmt->execute();
$personaje_id = $stmt->insert_id;
$stmt->close();

// Insertar cómics en la tabla Comics y relacionarlos con el personaje
foreach ($comics as $comic_titulo) {
    $comic_titulo = trim($comic_titulo);

    // Verificar si el cómic ya existe en la base de datos
    $sql_comic = "SELECT ComicID FROM Comics WHERE Titulo = ?";
    $stmt = $conexion->prepare($sql_comic);
    $stmt->bind_param("s", $comic_titulo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $comic_id = $result->fetch_assoc()['ComicID'];
    } else {
        // Insertar el cómic si no existe
        $sql_insert_comic = "INSERT INTO Comics (Titulo) VALUES (?)";
        $stmt_insert = $conexion->prepare($sql_insert_comic);
        $stmt_insert->bind_param("s", $comic_titulo);
        $stmt_insert->execute();
        $comic_id = $stmt_insert->insert_id;
        $stmt_insert->close();
    }

    // Relacionar el personaje con el cómic
    $sql_personaje_comic = "INSERT INTO PersonajeComic (PersonajeID, ComicID) VALUES (?, ?)";
    $stmt_relacion = $conexion->prepare($sql_personaje_comic);
    $stmt_relacion->bind_param("ii", $personaje_id, $comic_id);
    $stmt_relacion->execute();
    $stmt_relacion->close();
}

// Insertar superpoderes en la tabla Superpoderes y relacionarlos con el personaje
foreach ($superpoderes as $superpoder_nombre) {
    $superpoder_nombre = trim($superpoder_nombre);

    // Verificar si el superpoder ya existe en la base de datos
    $sql_superpoder = "SELECT SuperpoderID FROM Superpoderes WHERE Nombre = ?";
    $stmt = $conexion->prepare($sql_superpoder);
    $stmt->bind_param("s", $superpoder_nombre);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $superpoder_id = $result->fetch_assoc()['SuperpoderID'];
    } else {
        // Insertar el superpoder si no existe
        $sql_insert_superpoder = "INSERT INTO Superpoderes (Nombre) VALUES (?)";
        $stmt_insert = $conexion->prepare($sql_insert_superpoder);
        $stmt_insert->bind_param("s", $superpoder_nombre);
        $stmt_insert->execute();
        $superpoder_id = $stmt_insert->insert_id;
        $stmt_insert->close();
    }

    // Relacionar el personaje con el superpoder
    $sql_personaje_superpoder = "INSERT INTO PersonajeSuperpoder (PersonajeID, SuperpoderID) VALUES (?, ?)";
    $stmt_relacion = $conexion->prepare($sql_personaje_superpoder);
    $stmt_relacion->bind_param("ii", $personaje_id, $superpoder_id);
    $stmt_relacion->execute();
    $stmt_relacion->close();
}

// Cerrar la conexión
$conexion->close();

// Redireccionar al listado de personajes
header("Location: relaciones01.php");
exit();
?>