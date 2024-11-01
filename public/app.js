// public/app.js
function loadMovies() {
  fetch("/movies")
    .then((response) => response.json())
    .then((movies) => {
      const tbody = document
        .getElementById("movieTable")
        .querySelector("tbody");
      tbody.innerHTML = "";
      movies.forEach((movie) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${movie.id}</td>
                    <td>${movie.title}</td>
                    <td>${movie.releaseYear}</td>
                    <td>${movie.genre}</td>
                    <td>${movie.duration}</td>
                    <td>${movie.directorId}</td>
                    <td>${movie.rating}</td>
                    <td>
                        <button onclick="editMovie('${movie.id}')">Edit</button>
                        <button onclick="deleteMovie('${movie.id}')">Delete</button>
                    </td>
                `;
        tbody.appendChild(row);
      });
    });
}

function displayXMLStructure(movieData) {
  const xmlStructure = `
<movie>
    <movie_id>${movieData.id}</movie_id>
    <title>${movieData.title}</title>
    <release_year>${movieData.releaseYear}</release_year>
    <genre>${movieData.genre}</genre>
    <duration>${movieData.duration}</duration>
    <director_id>${movieData.directorId}</director_id>
    <rating>${movieData.rating}</rating>
</movie>
`;

  const xmlContentElement = document.getElementById("xmlContent");
  xmlContentElement.textContent = xmlStructure;

  const xmlOutputElement = document.getElementById("xmlOutput");
  xmlOutputElement.style.display = "block"; // Show the box
}

function submitMovie() {
  const movieData = {
    id: document.getElementById("id").value,
    title: document.getElementById("title").value,
    releaseYear: document.getElementById("releaseYear").value,
    genre: document.getElementById("genre").value,
    duration: document.getElementById("duration").value,
    directorId: document.getElementById("directorId").value,
    rating: document.getElementById("rating").value,
  };

  fetch("/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  }).then(() => {
    loadMovies();
    document.getElementById("movieForm").reset();
    displayXMLStructure(movieData); // Call to display the XML structure
  });
}

function editMovie(id) {
  console.log("Fetching movie with ID:", id);
  fetch(`/movies/${id}`)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error("Error fetching movie: " + text);
        });
      }
      return response.json();
    })
    .then((movie) => {
      // Populate the form fields with movie data
      document.getElementById("id").value = movie.id;
      document.getElementById("title").value = movie.title;
      document.getElementById("releaseYear").value = movie.releaseYear;
      document.getElementById("genre").value = movie.genre;
      document.getElementById("duration").value = movie.duration;
      document.getElementById("directorId").value = movie.directorId;
      document.getElementById("rating").value = movie.rating;
    })
    .catch((error) => console.error("Error fetching movie:", error));
}

function deleteMovie(id) {
  fetch(`/movies/${id}`, { method: "DELETE" }).then(() => loadMovies());
}

loadMovies();
