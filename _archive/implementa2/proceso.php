<?php
require_once 'conexion.php'
if(isset($_POST['submit'])){
    $equipos = $_POST['nombre'] ?? '';
    $jugadores = $_POST['jugadores'] ?? '';
    $posiciones = $_POST['posiciones'] ?? '';
    $posiciones_jugadores  = $_POST['posiciones_jugadores'] ?? '';
}
//procesar la imagen
if(isset($_FILES['imagen']) && $_FILES ['imagen'] ['error'] == 0){
    $img_tpm_name = $_FILES ['imagen'] ['tpm_name'];
    $img_name = $_FILES ['imagen'] ['name'];    

    $img_content = file_get_contents($img_tpm_name); //este el contenido binario de la imagen

    //con esto que sigue es para guardar las imagenes en una carpeta que se creara 
    $upload_dir = 'uploads/';
    if(!is_dir($upload_dir)){
        mkdir($upload_dir, 0777, true);
    }
    move_uploaded_file($img_tpm_name, $upload_dir . $img_name);
}else{
    die("Error al subir imagen.");
}try {
    $sql = "INSERT INTO tema (equipos, jugadores, posiciones, jugadores_posiciones, bio, imagen)
    VALUES (:nombre, :nombrereal, :equipos, :jugadores, :jugadores_posiciones, :bio, :imagen)";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':equipos' , $nombre);
    $stmt->bindParam(':jugadores' , $jugadores);
    $stmt->bindParam(':posiciones' , $posiciones);
    $stmt->bindParam(':jugadores_posiciones' , $posiciones_jugadores);
    $stmt->bindParam(':bio', $bio);
    $stmt-.bindParam(':imagen' , $img_content, PDO:PARAM_LOB); //el PARAM_LOB es para uso de datos binario "grandes"

    $stmt->execute();
    // REDIRECCION: Despues de guardar, mandamos al usuario a la pagina de tarjetas
    header("Location: cards.php?success=1");
    exit();
} catch (PDOException $e) {
    //Si la tabla no existe o falta la columna, mostraremos el error de forma clara 
    die("Error en la base de datos: " . $e->getMessage() .
    "<br><br> Asegurate de que tu tabla 'equipofut' tenga la colummna 'altura'.
    Puedes agregarla con: ALTER TABLE equipofut ADD COLUMN altura VARCHAR(50);");
}
else{
    Si alguien intenta entrar en process.php sin enviar el formulario, lo mandamos de vuelta
    header("Location: form.php");
    exit();
}
?>