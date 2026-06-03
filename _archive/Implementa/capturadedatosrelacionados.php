<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Luis Fernando Dominguez Peralta</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

    <!-- Bootstrap 3 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

    <!-- Fuente -->
    <link href="https://fonts.cdnfonts.com/css/zachary" rel="stylesheet">

    <style>
        body{
            background-color:#f00144;
        }
        h1{
            font-family: 'Zachary', sans-serif;
            color: #2E0A16;
            text-align: center;
        }
        .navbar{
            background-color: #6C427A;
            border: none;
        }
        .navbar-brand,
        .navbar-nav > li > a{
            color: black !important;
            font-family: 'Zachary', sans-serif;
        }
        .dropdown-menu > li > a{
            color: black;
        }
        h1{
    font-family: 'NEON CLUB MUSIC', sans-serif;
    color: var(--color-extra);
    text-align: center;
}

table{
    width: 80%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid --color-de-letras;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #f60000;
    text-align: center;
}

input[type="text"],
input[type="date"],
textarea {
    width: 80%; /* Ajuste para centrar */
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid #1255f1;
    border-radius: 5px;
    background-color: #1f1f1f;
    color: yellow;
    text-align: center;
}

input[type="submit"] {
    background-color: #f43f08;
    color: #000;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

input[type="hidden"] {
    display: none;
}

.mensaje {
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
}

body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url('gambit.jpg') center/cover no-repeat;
    opacity: 0.1;
}
    </style>
</head>

<body>
<nav class="navbar navbar-default">
  <div class="container">

    <div class="navbar-header">
      <a class="navbar-brand" href="index.html">Inicio</a>
    </div>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="nav navbar-nav">

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            Unidad 1 <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="mostrar.php">Mostrar Datos</a></li>
            <li><a class="dropdown-item" href="meterdatos01.php">Meter Datos</a></li>
           
          </ul>
        </li>
         <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            Unidad 2 <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="relaciones01.php">Relaciones 1</a></li>
            <li><a class="dropdown-item" href="relaciones2.php">Relaciones 2</a></li>
            <li><a class="dropdown-item" href="capturadedatosrelacionados.php">Captura de Datos</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            Unidad 1 <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Perfil</a></li>
            <li><a class="dropdown-item" href="#">Calculadora</a></li>
            <li><a class="dropdown-item" href="#">Tienda parte 1</a></li>
          </ul>
        </li>

      </ul>
    </div>

  </div>
</nav>

<div class="container">
    <h1>Agregar Personaje de Marvel</h1>
    <form action="insertar_datos.php" method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>

        <label for="alias">Alias:</label>
        <input type="text" id="alias" name="alias" required>

        <label for="fecha_creacion">Fecha de Creación:</label>
        <input type="date" id="fecha_creacion" name="fecha_creacion" required>

        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea>

        <label for="comics">Comics (separados por comas):</label>
        <input type="text" id="comics" name="comics" placeholder="Ejemplo: Spiderman, Ironman" required>

        <label for="superpoderes">Superpoderes (separados por comas):</label>
        <input type="text" id="superpoderes" name="superpoderes" placeholder="Ejemplo: Fuerza, Velocidad" required>

        <input type="submit" value="Guardar Personaje">
    </form>
</div>
</body>
</html>