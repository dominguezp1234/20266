<?php
$conexion = new mysqli("localhost","root","","implementa009");

if($conexion->connect_error){
    die("Error de conexión");
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Mostrar Base de Datos</title>
<style>
body{
font-family:Arial;
background:#f2f2f2;
text-align:center;
}

table{
margin:auto;
border-collapse:collapse;
width:80%;
background:white;
}

th,td{
border:1px solid black;
padding:8px;
}

th{
background:black;
color:white;
}
h2{
margin-top:40px;
}
</style>
</head>
<body>

<h1>BASE DE DATOS NIKE VS ADIDAS</h1>

<?php
/* ======================
   TABLA MARCAS
======================*/
echo "<h2>MARCAS</h2>";

$res=$conexion->query("SELECT * FROM marcas");

echo "<table>";
echo "<tr><th>ID</th><th>Nombre</th></tr>";

while($row=$res->fetch_assoc()){
echo "<tr>
<td>".$row['id_marca']."</td>
<td>".$row['nombre']."</td>
</tr>";
}
echo "</table>";



/* ======================
   TABLA CATEGORIAS
======================*/
echo "<h2>CATEGORIAS</h2>";

$res=$conexion->query("SELECT * FROM categorias");

echo "<table>";
echo "<tr><th>ID</th><th>Categoria</th></tr>";

while($row=$res->fetch_assoc()){
echo "<tr>
<td>".$row['id_categoria']."</td>
<td>".$row['nombre_categoria']."</td>
</tr>";
}
echo "</table>";



/* ======================
   TABLA PRODUCTOS
======================*/
echo "<h2>PRODUCTOS (RELACIONADOS)</h2>";

$sql="
SELECT 
p.id_producto,
p.nombre_producto,
p.precio,
m.nombre AS marca,
c.nombre_categoria AS categoria
FROM productos p
INNER JOIN marcas m ON p.id_marca=m.id_marca
INNER JOIN categorias c ON p.id_categoria=c.id_categoria
";

$res=$conexion->query($sql);

echo "<table>";
echo "<tr>
<th>ID</th>
<th>Producto</th>
<th>Precio</th>
<th>Marca</th>
<th>Categoria</th>
</tr>";

while($row=$res->fetch_assoc()){
echo "<tr>
<td>".$row['id_producto']."</td>
<td>".$row['nombre_producto']."</td>
<td>$".$row['precio']."</td>
<td>".$row['marca']."</td>
<td>".$row['categoria']."</td>
</tr>";
}

echo "</table>";

$conexion->close();
?>

</body>
</html>