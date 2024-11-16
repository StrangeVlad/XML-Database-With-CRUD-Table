const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const { DOMParser, XMLSerializer } = require("xmldom");
const xpath = require("xpath");
<<<<<<< HEAD
=======
const xmlFilePath =
  "C:/Users/Aures/Desktop/XML-Database-With-CRUD-Table-master/movieDatabase.xml";
>>>>>>> a2e79d3 (second commit)

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from the 'public' directory

// Load XML data
function loadXMLData() {
  const xmlData = fs.readFileSync("movieDatabase.xml", "utf8");
  return new DOMParser().parseFromString(xmlData, "text/xml");
}
<<<<<<< HEAD
=======
function saveXMLData(xmlDoc) {
  const xmlString = new XMLSerializer().serializeToString(xmlDoc);
  fs.writeFileSync("movieDatabase.xml", xmlString, "utf8");
}
>>>>>>> a2e79d3 (second commit)

// Execute XQuery
app.post("/execute-xquery", (req, res) => {
  const { query } = req.body;

  // Construct the command to execute XQuery
<<<<<<< HEAD
  const command = `xbase --query "${query}"`; // Adjust this command based on your XBase setup
=======
  const command = `basex -i "${xmlFilePath}" --query "${query}"`;
>>>>>>> a2e79d3 (second commit)

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing XQuery: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    console.log(`XQuery Results: ${stdout}`);
    // Send the results back as JSON
    res.json({ results: stdout });
  });
});

// Get all movies
app.get("/movies", (req, res) => {
  const xmlDoc = loadXMLData();
  const movies = xpath.select("//movie", xmlDoc);
  const movieList = movies.map((movie) => ({
    id: movie.getElementsByTagName("movie_id")[0].textContent,
    title: movie.getElementsByTagName("title")[0].textContent,
    releaseYear: movie.getElementsByTagName("release_year")[0].textContent,
    genre: movie.getElementsByTagName("genre")[0].textContent,
    duration: movie.getElementsByTagName("duration")[0].textContent,
    directorId: movie.getElementsByTagName("director_id")[0].textContent,
    rating: movie.getElementsByTagName("rating")[0].textContent,
  }));

  res.json(movieList);
});

// Get a specific movie by ID
app.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const xmlDoc = loadXMLData();
  const movie = xpath.select1(`//movie[movie_id='${movieId}']`, xmlDoc);

  if (movie) {
    const movieData = {
      id: movie.getElementsByTagName("movie_id")[0].textContent,
      title: movie.getElementsByTagName("title")[0].textContent,
      releaseYear: movie.getElementsByTagName("release_year")[0].textContent,
      genre: movie.getElementsByTagName("genre")[0].textContent,
      duration: movie.getElementsByTagName("duration")[0].textContent,
      directorId: movie.getElementsByTagName("director_id")[0].textContent,
      rating: movie.getElementsByTagName("rating")[0].textContent,
    };
    res.json(movieData);
  } else {
    res.status(404).send("Movie not found");
  }
});

// Add or update a movie
app.post("/movies", (req, res) => {
  const { id, title, releaseYear, genre, duration, directorId, rating } =
    req.body;
  const xmlDoc = loadXMLData();
  let movie = xpath.select1(`//movie[movie_id='${id}']`, xmlDoc);

  if (movie) {
    // Update existing movie
    movie.getElementsByTagName("title")[0].textContent = title;
    movie.getElementsByTagName("release_year")[0].textContent = releaseYear;
    movie.getElementsByTagName("genre")[0].textContent = genre;
    movie.getElementsByTagName("duration")[0].textContent = duration;
    movie.getElementsByTagName("director_id")[0].textContent = directorId;
    movie.getElementsByTagName("rating")[0].textContent = rating;
  } else {
    // Add new movie
    const newMovie = xmlDoc.createElement("movie");
    const movieIdElem = xmlDoc.createElement("movie_id");
    movieIdElem.textContent = id;
    newMovie.appendChild(movieIdElem);
    const titleElem = xmlDoc.createElement("title");
    titleElem.textContent = title;
    newMovie.appendChild(titleElem);
    const yearElem = xmlDoc.createElement("release_year");
    yearElem.textContent = releaseYear;
    newMovie.appendChild(yearElem);
    const genreElem = xmlDoc.createElement("genre");
    genreElem.textContent = genre;
    newMovie.appendChild(genreElem);
    const durationElem = xmlDoc.createElement("duration");
    durationElem.textContent = duration;
    newMovie.appendChild(durationElem);
    const directorElem = xmlDoc.createElement("director_id");
    directorElem.textContent = directorId;
    newMovie.appendChild(directorElem);
    const ratingElem = xmlDoc.createElement("rating");
    ratingElem.textContent = rating;
    newMovie.appendChild(ratingElem);

    xmlDoc.getElementsByTagName("movies")[0].appendChild(newMovie);
  }

  saveXMLData(xmlDoc);
  res.sendStatus(200);
});

// Delete a movie
app.delete("/movies/:id", (req, res) => {
  const xmlDoc = loadXMLData();
  const movie = xpath.select1(`//movie[movie_id="${req.params.id}"]`, xmlDoc);

  if (movie) {
    movie.parentNode.removeChild(movie);
    saveXMLData(xmlDoc);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Remove the exec command section
app.post("/execute-xquery", (req, res) => {
  const xquery = req.body.query; // Get the XQuery from the request body
  console.log("Received XQuery:", xquery);

  const xmlDoc = loadXMLData(); // Load your XML data
  const nodes = xpath.select(xquery, xmlDoc); // Execute the XQuery (XPath)

  if (!nodes || nodes.length === 0) {
    console.log("No results found for the query.");
    return res.status(404).json({ error: "No results found" });
  }

  const results = nodes.map((node) => ({
    id: node.getElementsByTagName("movie_id")[0].textContent,
    title: node.getElementsByTagName("title")[0].textContent,
    releaseYear: node.getElementsByTagName("release_year")[0].textContent,
    genre: node.getElementsByTagName("genre")[0].textContent,
    duration: node.getElementsByTagName("duration")[0].textContent,
    directorId: node.getElementsByTagName("director_id")[0].textContent,
    rating: node.getElementsByTagName("rating")[0].textContent,
  }));

  console.log("Query results:", results); // Log the results
  res.json(results); // Return the results as JSON
});

app.listen(3000, () => console.log("Server running on port 3000"));
