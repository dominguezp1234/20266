// js/main.js

const contentDiv = document.getElementById('dinamic-content');

// =========================
// LIMPIAR CONTENIDO
// =========================
function clearContent() {
    contentDiv.innerHTML = '';
}

// =========================
// INICIO
// =========================
function renderInicio() {

    clearContent();

    contentDiv.innerHTML = `
        <div class="jumbotron" style="
            background: rgba(255,255,255,0.9);
            border-radius: 15px;
            margin-top: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        ">

            <h1 style="
                color: #2E0A16;
                text-align:center;
                font-family: 'Jumbotron', sans-serif;
                font-size:70px;
            ">
                BIENVENIDOS AL SISTEMA SPA
            </h1>

            <p class="lead" style="
                text-align:center;
                color:black;
                margin-top:30px;
                font-size:22px;
            ">
                Sistema dinámico desarrollado con Vanilla JavaScript.
            </p>

            <hr>

            <p style="
                text-align:center;
                color:black;
                font-size:18px;
            ">
                Navega utilizando el menú superior para interactuar con todos los módulos.
            </p>

        </div>
    `;
}

// =========================
// FUNCIONES DE APERTURA
// =========================

function openEquipos() {

    clearContent();

    if (window.renderEquipos) {

        window.location.hash = "equipos";

        setTimeout(() => {
            window.renderEquipos(contentDiv);
        }, 10);

    } else {

        contentDiv.innerHTML = `
            <div class="alert alert-danger">
                Error cargando módulo Equipos.
            </div>
        `;
    }
}

function openAutos() {

    clearContent();

    if (window.initAutosModulo) {

        window.location.hash = "autos";

        setTimeout(() => {
            window.initAutosModulo(contentDiv);
        }, 10);

    } else {

        contentDiv.innerHTML = `
            <div class="alert alert-danger">
                Error cargando módulo Autos.
            </div>
        `;
    }
}

function openPokedex() {

    clearContent();

    if (window.initPokedexModulo) {

        window.location.hash = "pokedex";

        setTimeout(() => {
            window.initPokedexModulo(contentDiv);
        }, 10);

    } else {

        contentDiv.innerHTML = `
            <div class="alert alert-danger">
                Error cargando módulo Pokedex.
            </div>
        `;
    }
}

function openPeliculas() {

    clearContent();

    if (window.renderPeliculas) {

        window.location.hash = "peliculas";

        setTimeout(() => {
            window.renderPeliculas(contentDiv);
        }, 10);

    } else {

        contentDiv.innerHTML = `
            <div class="alert alert-danger">
                Error cargando módulo Películas.
            </div>
        `;
    }
}

// =========================
// ROUTER HASH
// =========================

function loadRoute() {

    const hash = window.location.hash;

    switch (hash) {

        case "#equipos":
            if (window.renderEquipos) {
                clearContent();
                window.renderEquipos(contentDiv);
            }
            break;

        case "#autos":
            if (window.initAutosModulo) {
                clearContent();
                window.initAutosModulo(contentDiv);
            }
            break;

        case "#pokedex":
            if (window.initPokedexModulo) {
                clearContent();
                window.initPokedexModulo(contentDiv);
            }
            break;

        case "#peliculas":
            if (window.renderPeliculas) {
                clearContent();
                window.renderPeliculas(contentDiv);
            }
            break;

        default:
            renderInicio();
            break;
    }
}

// =========================
// NAVBAR LISTENERS
// =========================

// Inicio
const inicioLink = document.getElementById('link-inicio');

if (inicioLink) {

    inicioLink.addEventListener('click', function (e) {

        e.preventDefault();

        history.pushState("", document.title, window.location.pathname);

        renderInicio();

    });

}

// Equipos
const equiposLink = document.getElementById('link-equipos');

if (equiposLink) {

    equiposLink.addEventListener('click', function (e) {

        e.preventDefault();

        openEquipos();

    });

}

// Autos
const autosLink = document.getElementById('link-autos');

if (autosLink) {

    autosLink.addEventListener('click', function (e) {

        e.preventDefault();

        openAutos();

    });

}

// Pokedex
const pokedexLink = document.getElementById('link-pokedex');

if (pokedexLink) {

    pokedexLink.addEventListener('click', function (e) {

        e.preventDefault();

        openPokedex();

    });

}

// Películas
const peliculasLink = document.getElementById('link-peliculas');

if (peliculasLink) {

    peliculasLink.addEventListener('click', function (e) {

        e.preventDefault();

        openPeliculas();

    });

}

// =========================
// EVENTOS GLOBALES
// =========================

// Al cargar página
window.addEventListener('load', function () {

    if (window.location.hash) {

        loadRoute();

    } else {

        renderInicio();

    }

});

// Cuando cambia el hash
window.addEventListener('hashchange', loadRoute);