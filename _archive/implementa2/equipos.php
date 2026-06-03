<?php include 'header.php' ?>
<div class="container">
  <form action="proceso.php" method="POST" enctype="multipart/form-data">
    
    <div class="form-group">
      <label for="equipos">Equipos:</label>
      <input type="text" name="equipos" id="equipos" placeholder="Ej. Nombre del equipo" required>
    </div>

    <div class="form-group">
      <label for="jugadores">Jugadores:</label>
      <input type="text" name="jugadores" id="jugadores" placeholder="Ej. Nombre del jugador" required>
    </div>

    <div class="form-group">
      <label for="posiciones">Posiciones:</label>
      <input type="text" name="posiciones" id="posiciones" placeholder="Ej. Delantero" required>
    </div>

    <div class="form-group">
      <label for="posiciones_jugadores">Posiciones de los jugadores:</label>
      <input type="text" name="posiciones_jugadores" id="posiciones_jugadores" placeholder="Ej. Posición asignada" required>
    </div>

    <div class="form-group">
      <label for="imagen">Fotografía:</label>
      <input type="file" name="imagen" id="imagen" accept="image/*" required>
    </div>

    <div style="text-align: center;">
      <button type="submit" class="btn">REGISTRAR DATOS</button>
    </div>

  </form>
</div>

</body>
</html>