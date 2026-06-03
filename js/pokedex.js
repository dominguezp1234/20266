// js/pokedex.js

window.initPokedexModulo = function(container) {
    container.innerHTML = `
        <div class="pokedex-container" style="background: #0a0a0a; min-height: 80vh; padding: 40px 20px; border-radius: 10px;">
            <h1 style="color: white; margin-bottom: 30px; font-family: 'Zachary', sans-serif;">Pokedex Neón</h1>
            <div class="pokedex-search" style="text-align: center; margin-bottom: 40px;">
                <input type="text" placeholder="Buscar Pokémon (Ej: pikachu)" id="pokeName">
                <button id="btn-pokedex" onclick="window.fetchPokemon()">Buscar</button>
            </div>
            
            <div id="pokedex-grid" class="row">
                <!-- Aquí se inyectan las tarjetas -->
            </div>
        </div>
    `;
    
    // Cargar Pikachu por defecto al abrir
    window.fetchPokemon('pikachu');
};

const typeColors = {
    normal: '#A8A77A',
    fire: '#FF421C',
    water: '#2C9BE3',
    electric: '#F7D02C',
    grass: '#3BD13B',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

window.fetchPokemon = (defaultName = null) => {
    let pokeName;
    if(typeof defaultName === 'string') {
        pokeName = defaultName;
    } else {
        const pokeNameInput = document.getElementById("pokeName");
        if(!pokeNameInput) return;
        pokeName = pokeNameInput.value.toLowerCase().trim();
        if(pokeName === '') pokeName = 'pikachu';
    }
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    const gridDiv = document.getElementById('pokedex-grid');
    gridDiv.innerHTML = '<p style="color: white; text-align: center; width:100%;">Buscando...</p>';

    fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error("No encontrado");
        }
        return res.json();
    }).then((data) => {
        const typeName = data.types[0].type.name;
        const mainColor = typeColors[typeName] || '#ffffff';
        const imgUrl = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
        
        gridDiv.innerHTML = `
            <div class="col-xs-12 col-sm-6 col-md-4" style="margin: 0 auto; float: none;">
                <div class="pokemon-card" style="box-shadow: 0 0 25px ${mainColor}; border-color: ${mainColor};">
                    <div class="pokemon-img-container" style="border-color: ${mainColor}; box-shadow: inset 0 0 20px ${mainColor}; background: rgba(255,255,255,0.05);">
                        <img src="${imgUrl}" alt="${data.name}" class="pokemon-img">
                    </div>
                    
                    <h2 class="pokemon-name" style="text-shadow: 0 0 15px ${mainColor};">${data.name}</h2>
                    <div style="text-align:center;">
                        <span class="pokemon-type-badge" style="background-color: ${mainColor}; color: #000; box-shadow: 0 0 10px ${mainColor};">${typeName}</span>
                    </div>
                    
                    <div class="pokemon-info">
                        <div class="pokemon-stat"><span>Altura:</span> <strong>${data.height / 10} m</strong></div>
                        <div class="pokemon-stat"><span>Peso:</span> <strong>${data.weight / 10} kg</strong></div>
                        <div class="pokemon-stat"><span>Base XP:</span> <strong>${data.base_experience}</strong></div>
                        <div class="pokemon-stat"><span>Habilidad:</span> <strong style="text-transform: capitalize;">${data.abilities[0]? data.abilities[0].ability.name : 'Ninguna'}</strong></div>
                    </div>
                </div>
            </div>
        `;
    }).catch(err => {
        console.error("Error fetching pokemon", err);
        gridDiv.innerHTML = `
            <div class="col-xs-12 col-sm-6 col-md-4" style="margin: 0 auto; float: none;">
                <div class="pokemon-card" style="box-shadow: 0 0 20px red; border-color: red;">
                    <h2 style="color: red; text-align:center; text-shadow: 0 0 10px red;">Pokémon no encontrado</h2>
                    <div class="pokemon-img-container" style="border-color: red; box-shadow: inset 0 0 15px red; margin-top:20px;">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png" class="pokemon-img" style="opacity: 0.5;">
                    </div>
                </div>
            </div>
        `;
    });
};
