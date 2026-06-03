<?php
require_once 'conexion.php'; 
include 'header.php';


try {
    $sql = "SELECT j.*, e.nombre_equipo
            FROM jugadores j 
            LEFT JOIN equipos e ON j.equipo_id = e.id
            ORDER BY j.id DESC";

    $stmt = $pdo->query($sql);
    $personajes = $stmt->fetchAll();
} catch (PDOException $e) {
    $personajes = [];
}
?>

<div class="container-fluid">
    <h1 class="text-center" style="color: var(--x-yellow);">Galería de Jugadores</h1>
    <p style="text-align: center; color: var(--color-de-letras);">Consulta de Registros Relacionados - Base de Datos Pro</p>

    <div class="cards-grid">
        <?php foreach ($personajes as $p): ?>
            <div class="x-card">
                <div class="card-header">
                    <?php echo htmlspecialchars($p['nombre'] ?? 'Sin Nombre'); ?>
                </div>

                <div class="card-img-container">
                    <?php if (!empty($p['imagen'])): ?>
                        <img src="data:image/jpeg;base64,<?php echo base64_encode($p['imagen']); ?>" class="card-img">
                    <?php else: ?>
                        <div style="text-align:center; padding-top: 80px; color: gray;">Sin Imagen</div>
                    <?php endif; ?>
                </div>

                <div class="card-body">
                    <p><span class="stat-label">Equipo:</span> <?php echo htmlspecialchars($p['nombre_equipo'] ?? 'Independiente'); ?></p>
                    
                    <p><span class="stat-label">Jugadores:</span> <?php echo htmlspecialchars($p['nombre']); ?></p>
                    
                    <p><span class="stat-label">Posiciones:</span> <?php echo htmlspecialchars($p['posicion_principal'] ?? 'No asignada'); ?></p>
                    
                    <p><span class="stat-label">Posiciones Jugadores:</span> 
                        <?php echo htmlspecialchars($p['detalle_posicion'] ?? 'N/A'); ?>
                    </p>
                    
                    <hr>
                    <p class="small"><strong>Bio:</strong><br>
                        <em><?php echo nl2br(htmlspecialchars($p['bio'] ?? 'Sin biografía disponible.')); ?></em>
                    </p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>