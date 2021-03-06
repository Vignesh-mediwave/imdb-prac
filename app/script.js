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
function createMovieInApi(movie) {
  fetch("http://localhost:1337/api/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      console.log("API Success");
      console.log("data");
    });
}

function hookbuttons() {
  const addbtn = document.querySelector("#add-movies-btn");
  addbtn.addEventListener("click", function () {
    const el1 = document.querySelector("#all-movies");
    el1.classList.add("d-none");
    const el2 = document.querySelector("#add-movies");
    el2.classList.remove("d-none");
  });
  const showbtn = document.querySelector("#show-movies-btn");
  showbtn.addEventListener("click", function () {
    const el1 = document.querySelector("#all-movies");
    el1.classList.remove("d-none");
    const el2 = document.querySelector("#add-movies");
    el2.classList.add("d-none");
  });
}
function hookAddMovieForm() {
  console.log("hookAddMovieForm()");
  const form = document.querySelector("#add-movie-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formdata = new FormData(form);
    const movie = {
      name: formdata.get("movie-name"),
      year: formdata.get("movie-year"),
      rating: formdata.get("movie-rating"),
      genre: formdata.get("movie-genre"),
      image: {
        url: formdata.get("movie-image-url"),
        altInfo: formdata.get("movie-image-alt"),
      },
    };
    console.log(movie);
    createMovieInApi(movie);
  });
}
getMoviesFromApi();
hookbuttons();
hookAddMovieForm();
