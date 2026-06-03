// js/peliculas.js

window.renderPeliculas = function(container) {
    container.innerHTML = `
        <div class="movies-module">
            <h1>Página de Películas (TMDB)</h1>
            <form id="form-movies">
                <input type="text" id="search-movies" placeholder="Buscar película (ej. Shrek)">
                <input type="submit" value="Buscar">
            </form>
            <div id="movies-main" class="row"></div>
        </div>
    `;

    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

    const main = document.getElementById('movies-main');
    const form = document.getElementById('form-movies');
    const search = document.getElementById('search-movies');

    async function getMovies(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            showMovies(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
            main.innerHTML = '<p style="color:red; text-align:center; width:100%;">Error al cargar películas.</p>';
        }
    }

    function showMovies(movies) {
        main.innerHTML = '';
        if(!movies || movies.length === 0) {
            main.innerHTML = '<p style="color:white; text-align:center; width:100%;">No se encontraron resultados.</p>';
            return;
        }

        movies.forEach((movie) => {
            const { title, poster_path, vote_average, release_date } = movie;
            const colEl = document.createElement('div');
            // Usamos las clases de Bootstrap 3 para el grid responsivo
            colEl.className = 'col-md-3 col-sm-4 col-xs-6';
            colEl.style.marginBottom = '25px';
            
            // Si no hay poster, usamos un placeholder
            const imgSrc = poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/1280x1920.png?text=No+Image';

            colEl.innerHTML = `
                <div class="movie-card">
                    <div class="movie-image-container">
                        <img src="${imgSrc}" alt="${title}">
                        <div class="movie-hover">
                            <span class="movie-star">⭐</span>
                            <span class="movie-rating" style="color: ${getClassByRate(vote_average)}">${vote_average}</span>
                        </div>
                    </div>
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <p class="movie-date">Estreno: ${release_date || 'N/D'}</p>
                    </div>
                </div>
            `;
            main.appendChild(colEl);
        });
    }

    function getClassByRate(vote) {
        if (vote >= 8) {
            return 'lime';
        } else if (vote >= 5) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = search.value;
        if (searchTerm && searchTerm !== '') {
            getMovies(SEARCH_API + searchTerm + '"');
        } else {
            getMovies(API_URL);
        }
    });

    // Cargar inicial
    getMovies(API_URL);
};
