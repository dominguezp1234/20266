// js/equipos.js

window.renderEquipos = function(container) {
    container.innerHTML = `
        <div class="module-container">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#form-equipo" aria-controls="form-equipo" role="tab" data-toggle="tab">Registro de Equipos</a></li>
                <li role="presentation"><a href="#galeria-equipo" aria-controls="galeria-equipo" role="tab" data-toggle="tab" id="tab-galeria">Galería de Jugadores</a></li>
            </ul>

            <div class="tab-content" style="margin-top: 20px;">
                <!-- Tab Formulario -->
                <div role="tabpanel" class="tab-pane active" id="form-equipo">
                    <h2 class="module-title" style="text-align: center;">Registrar Equipo/Jugador</h2>
                    <form id="form-equipos-registro" style="width: 60%; margin: auto;">
                        <div class="form-group">
                            <label>Equipos:</label>
                            <input type="text" id="eq-nombre" class="form-control" placeholder="Ej. Nombre del equipo" required>
                        </div>
                        <div class="form-group">
                            <label>Jugadores:</label>
                            <input type="text" id="eq-jugador" class="form-control" placeholder="Ej. Nombre del jugador" required>
                        </div>
                        <div class="form-group">
                            <label>Posiciones:</label>
                            <input type="text" id="eq-posicion" class="form-control" placeholder="Ej. Delantero" required>
                        </div>
                        <div class="form-group">
                            <label>Posiciones de los jugadores:</label>
                            <input type="text" id="eq-posicion-det" class="form-control" placeholder="Ej. Posición asignada" required>
                        </div>
                        <div class="form-group">
                            <label>Fotografía:</label>
                            <input type="file" id="eq-imagen" class="form-control" accept="image/*" required>
                        </div>
                        <div style="text-align: center; margin-top: 20px;">
                            <button type="submit" class="btn btn-primary btn-lg">REGISTRAR DATOS</button>
                        </div>
                    </form>
                    <div id="eq-msg" style="text-align: center; margin-top: 20px; color: lime;"></div>
                </div>

                <!-- Tab Galería -->
                <div role="tabpanel" class="tab-pane" id="galeria-equipo">
                    <h2 class="module-title" style="text-align: center; color: yellow;">Galería de Jugadores</h2>
                    <div id="eq-galeria-grid" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;"></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('form-equipos-registro').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('eq-imagen');
        const file = fileInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;
                
                const jugador = {
                    equipo: document.getElementById('eq-nombre').value,
                    jugador: document.getElementById('eq-jugador').value,
                    posicion: document.getElementById('eq-posicion').value,
                    posicionDetalle: document.getElementById('eq-posicion-det').value,
                    imagen: base64Image
                };

                const data = JSON.parse(localStorage.getItem('equipos_data') || '[]');
                data.push(jugador);
                localStorage.setItem('equipos_data', JSON.stringify(data));

                document.getElementById('form-equipos-registro').reset();
                document.getElementById('eq-msg').innerText = "Jugador guardado exitosamente.";
                setTimeout(() => { document.getElementById('eq-msg').innerText = ''; }, 3000);
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('tab-galeria').addEventListener('click', function() {
        renderGaleriaEquipos();
    });
};

function renderGaleriaEquipos() {
    const data = JSON.parse(localStorage.getItem('equipos_data') || '[]');
    const grid = document.getElementById('eq-galeria-grid');
    
    if (data.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%;">No hay jugadores registrados.</p>';
        return;
    }

    let html = '';
    data.reverse().forEach(jugador => {
        html += `
            <div class="panel panel-default" style="width: 300px; background: #333; color: white; border-color: #444;">
                <div class="panel-heading" style="background: #111; color: yellow; border-color: #444;">
                    <h3 class="panel-title">${jugador.jugador}</h3>
                </div>
                <div class="panel-body" style="padding: 0; text-align: center;">
                    <img src="${jugador.imagen}" style="width: 100%; height: 300px; object-fit: cover;">
                </div>
                <div class="panel-footer" style="background: #222; border-color: #444; text-align: left; color: #ddd;">
                    <p><strong>Equipo:</strong> ${jugador.equipo}</p>
                    <p><strong>Posición:</strong> ${jugador.posicion}</p>
                    <p><strong>Detalle:</strong> ${jugador.posicionDetalle}</p>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}
