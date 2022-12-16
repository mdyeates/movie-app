var searchInput = $(".search");
var itemWrapper = $("main");

// Display the matches from the search query in the itemWrapper element
var displayMatches = (matches) => {
  // Clear search paragraph text
  itemWrapper.html("");

  if (!matches) {
    // If no matches were found, display a message to the user
    return itemWrapper.html('<p class="no-search">Sorry, no movies were found matching your search.</p>');
  }
  for (var match of matches) {
    // Insert HTML for each matching movie
    itemWrapper.append(
      `<div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${match.Poster})">
        <h3>${match.Title}</h3>
        <p>Release Year: ${match.Year}</p>
        <a href="https://www.imdb.com/title/${match.imdbID}" target="_blank">View More Details</a>
        </div>`
    );
  }
};

var getMovieData = () => {
  // This line of code gets the input from the search input field, trims any whitespace from the beginning and end, and converts it to lowercase.
  var searchText = searchInput.val().trim();

  if (searchText) {
    // Fetch data from the OMDb API
    $.get(`https://www.omdbapi.com/?apikey=e732dbce&s=${searchText}`).then(function (data) {
      displayMatches(data.Search);
    });
  }
};

// Initialize the event listener for the search input
var init = () => {
  searchInput.on("input", getMovieData);
};

init();
