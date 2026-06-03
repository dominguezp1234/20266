// js/autos.js

window.initAutosModulo = function (container) {

    container.innerHTML = `
        <div class="antigravity-module">

            <!-- HERO -->
            <section class="hero-floating">
                <div class="hero-blur-card">
                    <span class="badge-float">Auto Universe</span>

                    <h1 class="hero-title">
                        Catálogo de <span class="levitate-text">Autos Premium</span>
                    </h1>

                    <p class="hero-desc">
                        Explora deportivos, eléctricos, clásicos y vehículos de lujo.
                    </p>
                </div>
            </section>

            <!-- BUSCADOR -->
            <section style="margin: 30px auto; width: 80%; text-align:center;">

                <input 
                    type="text" 
                    id="search-car"
                    placeholder="Buscar auto..."
                    style="
                        width: 100%;
                        max-width: 500px;
                        padding: 15px;
                        border-radius: 10px;
                        border: none;
                        font-size: 18px;
                        background: rgba(255,255,255,0.1);
                        color: white;
                        outline: none;
                    "
                >

            </section>

            <!-- FILTROS -->
            <section class="filter-section">

                <div class="container-gravity">

                    <div class="filter-blur-bar">

                        <button class="filter-btn active" data-filter="all">
                            Todos
                        </button>

                        <button class="filter-btn" data-filter="sports">
                            Deportivos
                        </button>

                        <button class="filter-btn" data-filter="electric">
                            Eléctricos
                        </button>

                        <button class="filter-btn" data-filter="luxury">
                            Lujo
                        </button>

                        <button class="filter-btn" data-filter="classic">
                            Clásicos
                        </button>

                    </div>

                </div>

            </section>

            <!-- GRID -->
            <section class="catalog-section">

                <div class="container-gravity">

                    <div class="cars-gravity-grid" id="cars-grid-container"></div>

                </div>

            </section>

            <!-- MODAL -->
            <div id="carModal" style="
                display:none;
                position:fixed;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background: rgba(0,0,0,0.8);
                z-index:9999;
                justify-content:center;
                align-items:center;
                padding:20px;
            ">

                <div id="modalContent" style="
                    background:#111;
                    color:white;
                    width:90%;
                    max-width:800px;
                    border-radius:20px;
                    overflow:hidden;
                    box-shadow:0 0 30px rgba(0,0,0,0.6);
                    animation: aparecer 0.3s ease;
                    position:relative;
                ">

                    <button id="closeModal" style="
                        position:absolute;
                        top:15px;
                        right:15px;
                        background:red;
                        border:none;
                        color:white;
                        width:40px;
                        height:40px;
                        border-radius:50%;
                        font-size:20px;
                        cursor:pointer;
                        z-index:10;
                    ">
                        ✕
                    </button>

                    <div id="modalBody"></div>

                </div>

            </div>

        </div>
    `;

    // BASE DE DATOS
    const autosDatos = [

        {
            name: "Porsche 911 GT3",
            year: 2024,
            type: "sports",
            hp: "510 HP",
            speed: "318 km/h",
            price: "$175,000",
            engine: "Motor Boxer 4.0L",
            transmission: "Automática PDK",
            country: "Alemania",
            description: "El Porsche 911 GT3 es uno de los deportivos más icónicos del mundo. Diseñado para pista pero legal para carretera, ofrece una aceleración brutal, manejo preciso y sonido legendario.",
            img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&q=80"
        },

        {
            name: "Tesla Model S Plaid",
            year: 2024,
            type: "electric",
            hp: "1020 HP",
            speed: "322 km/h",
            price: "$135,000",
            engine: "Triple Motor Eléctrico",
            transmission: "Automática",
            country: "Estados Unidos",
            description: "El Tesla Model S Plaid redefine los autos eléctricos con una aceleración extrema y tecnología futurista. Tiene una de las mejores autonomías y pantallas inteligentes del mercado.",
            img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&q=80"
        },

        {
            name: "BMW M4 Competition",
            year: 2024,
            type: "sports",
            hp: "503 HP",
            speed: "290 km/h",
            price: "$84,000",
            engine: "3.0L Twin Turbo",
            transmission: "Automática 8 velocidades",
            country: "Alemania",
            description: "El BMW M4 Competition mezcla lujo y agresividad deportiva. Destaca por su potencia, diseño moderno y experiencia de conducción premium.",
            img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80"
        },

        {
            name: "Audi R8",
            year: 2023,
            type: "sports",
            hp: "602 HP",
            speed: "330 km/h",
            price: "$190,000",
            engine: "V10 5.2L",
            transmission: "S Tronic",
            country: "Alemania",
            description: "El Audi R8 es un superdeportivo elegante con ADN de Lamborghini. Su motor V10 produce un sonido espectacular y una experiencia emocionante.",
            img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"
        },

        {
            name: "Lamborghini Huracan",
            year: 2024,
            type: "sports",
            hp: "631 HP",
            speed: "325 km/h",
            price: "$240,000",
            engine: "V10 Atmosférico",
            transmission: "Automática DCT",
            country: "Italia",
            description: "El Lamborghini Huracan combina lujo italiano con velocidad extrema. Su diseño agresivo y motor V10 lo convierten en una leyenda moderna.",
            img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&q=80"
        },

        {
            name: "Ferrari SF90",
            year: 2024,
            type: "luxury",
            hp: "986 HP",
            speed: "340 km/h",
            price: "$550,000",
            engine: "Híbrido V8 Twin Turbo",
            transmission: "Automática",
            country: "Italia",
            description: "El Ferrari SF90 es uno de los Ferrari más rápidos jamás fabricados. Su sistema híbrido combina lujo, innovación y desempeño brutal.",
            img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&q=80"
        }

    ];

    const gridContainer = document.getElementById('cars-grid-container');

    let filtroActual = 'all';

    // MODAL
    const modal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');

    function openModal(car) {

        modal.style.display = 'flex';

        modalBody.innerHTML = `
            <img 
                src="${car.img}" 
                style="
                    width:100%;
                    height:350px;
                    object-fit:cover;
                "
            >

            <div style="padding:30px;">

                <h1 style="
                    margin-top:0;
                    font-size:40px;
                    color:#00e1ff;
                ">
                    ${car.name}
                </h1>

                <p style="
                    font-size:18px;
                    line-height:1.7;
                    color:#ddd;
                    margin-top:20px;
                ">
                    ${car.description}
                </p>

                <hr style="border-color:rgba(255,255,255,0.1);">

                <div style="
                    display:grid;
                    grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
                    gap:20px;
                    margin-top:25px;
                ">

                    <div>
                        <h3>Potencia</h3>
                        <p>${car.hp}</p>
                    </div>

                    <div>
                        <h3>Velocidad Máxima</h3>
                        <p>${car.speed}</p>
                    </div>

                    <div>
                        <h3>Motor</h3>
                        <p>${car.engine}</p>
                    </div>

                    <div>
                        <h3>Transmisión</h3>
                        <p>${car.transmission}</p>
                    </div>

                    <div>
                        <h3>País</h3>
                        <p>${car.country}</p>
                    </div>

                    <div>
                        <h3>Precio</h3>
                        <p>${car.price}</p>
                    </div>

                </div>

            </div>
        `;
    }

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {
            modal.style.display = 'none';
        }

    });

    // RENDER
    function renderCars(filter = 'all', search = '') {

        gridContainer.innerHTML = '';

        let filtrados = autosDatos;

        if (filter !== 'all') {
            filtrados = filtrados.filter(car => car.type === filter);
        }

        if (search.trim() !== '') {
            filtrados = filtrados.filter(car =>
                car.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filtrados.length === 0) {

            gridContainer.innerHTML = `
                <h2 style="color:white; text-align:center;">
                    No se encontraron autos.
                </h2>
            `;

            return;
        }

        filtrados.forEach(car => {

            const card = document.createElement('article');

            card.className = 'gravity-card';

            card.innerHTML = `
                <div class="card-inner">

                    <div class="image-wrapper">

                        <img 
                            src="${car.img}" 
                            alt="${car.name}" 
                            style="
                                width:100%;
                                height:250px;
                                object-fit:cover;
                            "
                        >

                    </div>

                    <div class="card-info">

                        <div class="card-header-main">

                            <h3 class="car-title">
                                ${car.name}
                            </h3>

                            <span class="car-year-badge">
                                ${car.year}
                            </span>

                        </div>

                        <p style="
                            color:#ccc;
                            line-height:1.6;
                            margin:15px 0;
                        ">
                            ${car.description.substring(0, 110)}...
                        </p>

                        <div class="spec-row">

                            <p><strong>Potencia:</strong> ${car.hp}</p>

                            <p><strong>Velocidad:</strong> ${car.speed}</p>

                        </div>

                        <div class="card-footer-main">

                            <span class="car-price-tag">
                                ${car.price}
                            </span>

                            <button class="action-float-btn ver-mas-btn">
                                Ver Más
                            </button>

                        </div>

                    </div>

                </div>
            `;

            // BOTON VER MAS
            card.querySelector('.ver-mas-btn').addEventListener('click', () => {
                openModal(car);
            });

            gridContainer.appendChild(card);

        });

    }

    // FILTROS
    const filterButtons = container.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            filterButtons.forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            filtroActual = btn.getAttribute('data-filter');

            const textoBusqueda = document.getElementById('search-car').value;

            renderCars(filtroActual, textoBusqueda);

        });

    });

    // BUSCADOR
    document.getElementById('search-car').addEventListener('input', function () {

        renderCars(filtroActual, this.value);

    });

    // INICIAL
    renderCars();

};