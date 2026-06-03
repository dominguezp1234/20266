// js/modulos_antiguos.js

// ==== NIKE VS ADIDAS ====
window.renderNikeAdidas = function(container) {
    container.innerHTML = `
        <div class="module-container">
            <h2 class="module-title" style="text-align: center;">Registro de Clientes Nike vs Adidas</h2>
            
            <form id="form-nike" style="width: 50%; margin: auto; background: #222; padding: 20px; border-radius: 10px;">
                <label style="color: white;">Nombre Cliente</label>
                <input type="text" id="nike-nombre" required style="width: 100%; margin-bottom: 15px; padding: 10px; border-radius: 5px; border: 1px solid yellow; background: #000; color: white;">
                
                <label style="color: white;">Edad</label>
                <input type="number" id="nike-edad" required style="width: 100%; margin-bottom: 15px; padding: 10px; border-radius: 5px; border: 1px solid yellow; background: #000; color: white;">
                
                <input type="submit" value="Guardar Cliente" style="background: yellow; color: black; font-weight: bold; padding: 10px; border: none; width: 100%; cursor: pointer;">
            </form>

            <div id="nike-table-container" style="margin-top: 30px;"></div>
        </div>
    `;

    document.getElementById('form-nike').addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nike-nombre').value;
        const edad = document.getElementById('nike-edad').value;

        const data = JSON.parse(localStorage.getItem('nike_adidas_data') || '[]');
        data.push({ id: Date.now(), nombre, edad });
        localStorage.setItem('nike_adidas_data', JSON.stringify(data));
        
        document.getElementById('form-nike').reset();
        renderNikeTable();
    });

    renderNikeTable();
};

function renderNikeTable() {
    const data = JSON.parse(localStorage.getItem('nike_adidas_data') || '[]');
    let html = `
        <table style="width: 90%; margin: auto; background: white; color: black; border-collapse: collapse;">
            <tr>
                <th style="background: #3498db; color: white; padding: 10px; border: 1px solid #ddd;">ID</th>
                <th style="background: #3498db; color: white; padding: 10px; border: 1px solid #ddd;">Nombre</th>
                <th style="background: #3498db; color: white; padding: 10px; border: 1px solid #ddd;">Edad</th>
            </tr>
    `;

    if (data.length === 0) {
        html += `<tr><td colspan="3" style="padding: 10px; text-align: center;">No hay registros</td></tr>`;
    } else {
        data.forEach((item, index) => {
            html += `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${index + 1}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.nombre}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.edad}</td>
                </tr>
            `;
        });
    }
    
    html += `</table>`;
    document.getElementById('nike-table-container').innerHTML = html;
}


// ==== MARVEL ====
window.renderMarvel = function(container) {
    container.innerHTML = `
        <div class="module-container">
            <h2 class="module-title" style="text-align: center; color: var(--color-extra);">Agregar Personaje de Marvel</h2>
            <form id="form-marvel" style="width: 80%; margin: auto; display: flex; flex-direction: column; align-items: center;">
                <label style="color: #f60000; margin-bottom: 8px;">Nombre:</label>
                <input type="text" id="marvel-nombre" required style="width: 80%; padding: 10px; margin-bottom: 15px; border: 2px solid #1255f1; border-radius: 5px; background-color: #1f1f1f; color: yellow; text-align: center;">

                <label style="color: #f60000; margin-bottom: 8px;">Alias:</label>
                <input type="text" id="marvel-alias" required style="width: 80%; padding: 10px; margin-bottom: 15px; border: 2px solid #1255f1; border-radius: 5px; background-color: #1f1f1f; color: yellow; text-align: center;">

                <label style="color: #f60000; margin-bottom: 8px;">Fecha de Creación:</label>
                <input type="date" id="marvel-fecha" required style="width: 80%; padding: 10px; margin-bottom: 15px; border: 2px solid #1255f1; border-radius: 5px; background-color: #1f1f1f; color: yellow; text-align: center;">

                <label style="color: #f60000; margin-bottom: 8px;">Descripción:</label>
                <textarea id="marvel-desc" required style="width: 80%; padding: 10px; margin-bottom: 15px; border: 2px solid #1255f1; border-radius: 5px; background-color: #1f1f1f; color: yellow; text-align: center;"></textarea>

                <label style="color: #f60000; margin-bottom: 8px;">Comics (separados por comas):</label>
                <input type="text" id="marvel-comics" placeholder="Ejemplo: Spiderman, Ironman" required style="width: 80%; padding: 10px; margin-bottom: 15px; border: 2px solid #1255f1; border-radius: 5px; background-color: #1f1f1f; color: yellow; text-align: center;">

                <label style="color: #f60000; margin-bottom: 8px;">Superpoderes (separados por comas):</label>
                <input type="text" id="marvel-poderes" placeholder="Ejemplo: Fuerza, Velocidad" required style="width: 80%; padding: 10px; margin-bottom: 15px; border: 2px solid #1255f1; border-radius: 5px; background-color: #1f1f1f; color: yellow; text-align: center;">

                <input type="submit" value="Guardar Personaje" style="background-color: #f43f08; color: #000; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">
            </form>

            <div id="marvel-msg" style="text-align: center; margin-top: 20px; color: lime;"></div>
        </div>
    `;

    document.getElementById('form-marvel').addEventListener('submit', function(e) {
        e.preventDefault();
        const character = {
            nombre: document.getElementById('marvel-nombre').value,
            alias: document.getElementById('marvel-alias').value,
            fecha: document.getElementById('marvel-fecha').value,
            desc: document.getElementById('marvel-desc').value,
            comics: document.getElementById('marvel-comics').value,
            poderes: document.getElementById('marvel-poderes').value
        };

        const data = JSON.parse(localStorage.getItem('marvel_data') || '[]');
        data.push(character);
        localStorage.setItem('marvel_data', JSON.stringify(data));

        document.getElementById('form-marvel').reset();
        document.getElementById('marvel-msg').innerText = "Personaje guardado correctamente en LocalStorage.";
        setTimeout(() => { document.getElementById('marvel-msg').innerText = ''; }, 3000);
    });
};
