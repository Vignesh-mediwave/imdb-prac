// const movielist = [
//   {
//     id: 1641812427483,
//     name: "Ironman",
//     year: 2008,
//     rating: "4",
//     genre: "Fantasy, Super hero",
//     image: {
//       url: "https://m.media-amazon.com/images/I/517EnJmL7+L.jpg",
//       altInfo: "Ironman DVD cover",
//     },
//   },
// ];

function makeMovieListHTML(movies) {
  const listDiv = document.querySelector("#movie-list");
  listDiv.innerHTML = "";
  for (const movie of movies) {
    /*
      <div class="item">
            <img
              src="https://m.media-amazon.com/images/I/517EnJmL7+L.jpg"
              alt="iron man dvd cover image"
            />
            <h4>Ironman</h4>
            <p>1998</p>
            <p>8.5</p>
            <p>fantacy</p>
          </div>*/
    const div = document.createElement("div");
    div.setAttribute("id", movie.id);
    div.classList.add("item");

    const img = document.createElement("img");
    img.setAttribute("src", movie.image.url);
    img.setAttribute("alt", movie.image.altInfo);
    div.appendChild(img);

    const h4 = document.createElement("h4");
    h4.textContent = movie.name;
    div.appendChild(h4);

    const pYear = document.createElement("p");
    pYear.textContent = movie.year;
    div.appendChild(pYear);

    const pRating = document.createElement("p");
    pRating.textContent = movie.rating;
    div.appendChild(pRating);

    const pGenre = document.createElement("p");
    pGenre.textContent = movie.genre;
    div.appendChild(pGenre);

    listDiv.appendChild(div);
  }
}

function addloading() {
  const listDiv = document.querySelector("#movie-list");
  listDiv.innerHTML = "please wait...";
}

function getMoviesFromApi() {
  addloading();
  fetch("http://localhost:1337/api/movies")
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      makeMovieListHTML(data);
    });
}
getMoviesFromApi();
