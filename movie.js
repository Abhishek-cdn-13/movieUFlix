const API_KEY_M = "7b7e43db815082715b238d674a499785";
const Similargird = document.querySelector("#Sim-movieGrid");
const movieId = new URLSearchParams(window.location.search).get("id");
const posterBox = document.querySelector(".movie-poster");

fetch(
  `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY_M}`
)
  .then((res) => res.json())
  .then((data) => {
    displaySimilarMovies(data.results.slice(0, 6)); // first 5 only
  });

fetch(
  `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY_M}`
)
  .then((res) => res.json())
  .then((videoData) => {
    const trailer = videoData.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    if (trailer) {
      posterBox.innerHTML = `
        <iframe width="100%" height="100%"
          src="https://www.youtube.com/embed/${trailer.key}"
          title="Movie Trailer"
          frameborder="0"
          allowfullscreen></iframe>
      `;
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_M}`
      )
        .then((res) => res.json())
        .then((movie) => {
          posterBox.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

          <div class="movie-details-box">
              <div class="movie-title">${movie.title}</div>
              <div class="movie-description">${movie.overview}</div>

              <div class="movie-extra-info">
                  <span>⭐ ${movie.vote_average.toFixed(1)}</span>
                  <span>📅 ${movie.release_date.substring(0, 4)}</span>
                  <span>⏳ ${movie.runtime} min</span>
              </div>
          </div>`;
        });
    }
  });

function displaySimilarMovies(movies) {
  Similargird.innerHTML = "";

  movies.forEach((movie) => {
    Similargird.innerHTML += `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-img">
                <i class="fa-solid fa-play playbtn"></i>
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="${movie.title}">
            </div>
            <div class="movie-details">
                <span>${movie.vote_average.toFixed(1)}</span>
                <span>${movie.release_date.substring(0, 4)}</span>
                <div class="movie-name">${movie.title}</div>
            </div>
        </div>`;
  });
  watchMovie();
}

function watchMovie() {
  document.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", () => {
      let id = card.getAttribute("data-id");
      window.location.href = `movie.html?id=${id}`;
    });
  });
}
