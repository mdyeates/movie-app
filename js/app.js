var searchInput = document.querySelector(".search");
var itemWrapper = document.querySelector("main");

// Display the matches from the search query in the itemWrapper element
var displayMatches = (matches) => {
  // Clear search paragraph text
  itemWrapper.innerHTML = "";

  if (!matches) {
    // If no matches were found, display a message to the user
    itemWrapper.innerHTML = '<p class="no-search">Sorry, no movies were found matching your search.</p>';
  } else {
    for (var match of matches) {
      // Insert HTML for each matching movie
      itemWrapper.insertAdjacentHTML(
        "beforeend",
        `<div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, .7)),
        url(${match.Poster})">
        <h3>${match.Title}</h3>
        <p>Release Year: ${match.Year}</p>
        <a href="https://www.imdb.com/title/${match.imdbID}" target="_blank">View More Details</a>
        </div>`
      );
    }
  }
};

var getMovieData = () => {
  // Validate search input, trim white space and account for case sensitivity
  var searchText = searchInput.value.trim().toLowerCase();

  if (searchText) {
    // Fetch data from the OMDb API
    var responsePromise = fetch(`https://www.omdbapi.com/?apikey=e732dbce&s=${searchText}`);

    // Convert the response to JSON
    var handleResponse = (responseObj) => responseObj.json();

    // Display the search results
    responsePromise.then(handleResponse).then((data) => displayMatches(data.Search));
  } else {
    // If no search text was entered, display a message to the user
    itemWrapper.innerHTML = `<p class="no-search">Use the search box to find details about a specific movie</p>
    `;
  }
};

// Initialize the event listener for the search input
var init = () => {
  searchInput.addEventListener("input", getMovieData);
};

init();

// var searchInput = document.querySelector(".search");
// var itemWrapper = document.querySelector("main");

// function displayMatches(matches) {
//   // Clear search paragraph text
//   itemWrapper.innerHTML = "";

//   if (matches.length === 0) {
//     // If no matches were found, display a message to the user
//     itemWrapper.innerHTML = "<p class='no-search'>Sorry, no movies were found matching your search.</p>";
//   } else {
//     for (var match of matches) {
//       itemWrapper.insertAdjacentHTML(
//         "beforeend",
//         `<div class="movie-item" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
//         url(${match.image_url})">
//         <h3>${match.Title}</h3>
//         <p>Release Year: ${match.Year}</p>
//         <a href="https://www.imdb.com/title/${match.imdbID}" target="_blank">View More Details</a>
//         </div>`
//       );
//     }
//   }
// }

// function getMovieData() {
//   // Validate search input, trim white space and account for case sensitivity
//   var searchText = searchInput.value.trim().toLowerCase();

//   if (searchText) {
//     // for (var movie of movieData) {
//     //   if (movie.title.toLowerCase().includes(searchText)) {
//     //     matches.push(movie);
//     //   }
//     // }

//     var responsePromise = fetch(`https://www.omdbapi.com/?apikey=e732dbce&s=${searchText}`);

//     function handleResponse(responseObj) {
//       return responseObj.json();
//     }

//     responsePromise.then(handleResponse).then(function (data) {
//       displayMatches(data.Search);
//     });

//     // arrow function clean code
//     //fetch('https://www.omdbapi.com/?apikey=20dc4c7f&t=drive')
//     //  .then(res => res.json())
//     // .then(data => console.log(data))

//     // responsePromise.then(function (responseObj) {
//     //   var dataPromise = responseObj.json();
//     //   dataPromise.then(function (data) {
//     //     console.log(data);
//     //   });
//     // });

//     // If there is no search input, display search paragraph text
//   } else {
//     itemWrapper.innerHTML = `<p class="no-search">Use the search box to find details about a specific movie</p>
//     `;
//   }
// }

// function init() {
//   searchInput.addEventListener("input", getMovieData);
// }

// init();

// // Grab html elements
// // Get inputs value on enter key press
// // Grab data related to users search
// // Inject the movie items into the DOM based on users search
