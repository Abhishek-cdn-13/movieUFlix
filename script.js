const grid = document.querySelector("#movieGrid");
const API_KEY = "7b7e43db815082715b238d674a499785";
const logo = document.querySelector(".logo");

logo.addEventListener("click", ()=>{
  window.location.href="index.html";
})

async function loadMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  displayMovies(data.results);
}


function displayMovies(movies) {
  grid.innerHTML = "";

  movies.forEach((movie) => {
    grid.innerHTML += `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-img">
                <i class="fa-solid fa-play playbtn"></i>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-details">
                <span>${movie.vote_average.toFixed(1)}</span>
                <span>${movie.release_date.substring(0,4)}</span>
                <div class="movie-name">${movie.title}</div>
            </div>
        </div>`;
  });
  watchMovie();
};
loadMovies();

function watchMovie(){
  document.querySelectorAll(".movie-card").forEach((card)=>{
    card.addEventListener("click", ()=>{
      let id = card.getAttribute("data-id");
      window.location.href=`movie.html?id=${id}`;
    })
  })
}

document.querySelector("#search").addEventListener("keydown", function(e){
  if(e.key==="Enter"){
     let query = this.value.trim();

  if(query.length > 2){
    searchMovies(query);
  } else if(query.length === 0){
    loadMovies(); // reset to popular
  }
  }
});


async function searchMovies(query) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  displayMovies(data.results);
}


