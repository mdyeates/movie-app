var searchInput = document.querySelector(".search");
var itemWrapper = document.querySelector("main");

function displayMatches(matches) {
  itemWrapper.innerHTML = "";

  for (var match of matches) {
    itemWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${match.image_url})">
        <h3>${match.title}</h3>
        <p>${match.description}</p>
        <a href="${match.imdb_url}" target="_blank">View More Details</a>
        </div>`
    );
  }
}

function getMovieData(event) {
  var keyCode = event.keyCode;
  var searchText = searchInput.value.trim().toLowerCase();

  if (keyCode === 13 && searchText) {
    var matches = [];

    for (var movie of movieData) {
      if (movie.title.toLowerCase().includes(searchText)) {
        matches.push(movie);
      }
    }
    displayMatches(matches);
  }
}

function init() {
  searchInput.addEventListener("keydown", getMovieData);
}

init();

// Grab html elements
// Get inputs value on enter key press
// Grab data related to users search
// Inject the movie items into the DOM based on users search
