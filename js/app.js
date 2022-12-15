var searchInput = document.querySelector(".search");
var itemWrapper = document.querySelector("main");

function displayMatches(matches) {
  // Clear search paragraph text
  itemWrapper.innerHTML = "";

  if (matches.length === 0) {
    // If no matches were found, display a message to the user
    itemWrapper.innerHTML = "<p class='no-search'>Sorry, no movies were found matching your search.</p>";
  } else {
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
}

function getMovieData() {
  // Validate search input, trim white space and account for case sensitivity
  var searchText = searchInput.value.trim().toLowerCase();

  // Push each movie to matches arr if input matches search text
  if (searchText) {
    var matches = [];

    for (var movie of movieData) {
      if (movie.title.toLowerCase().includes(searchText)) {
        matches.push(movie);
      }
    }

    var responsePromise = fetch("https://www.omdbapi.com/?apikey=e732dbce&t=drive");

    function handleResponse(responseObj) {
      return responseObj.json();
    }

    responsePromise.then(handleResponse).then(function (data) {
      console.log(data);
    });
    // responsePromise.then(function (responseObj) {
    //   var dataPromise = responseObj.json();
    //   dataPromise.then(function (data) {
    //     console.log(data);
    //   });
    // });

    displayMatches(matches);
    // If there is no search input, display search paragraph text
  } else {
    itemWrapper.innerHTML = `<p class="no-search">Use the search box to find details about a specific movie</p>
    `;
  }
}

function init() {
  searchInput.addEventListener("input", getMovieData);
}

init();

// Grab html elements
// Get inputs value on enter key press
// Grab data related to users search
// Inject the movie items into the DOM based on users search
