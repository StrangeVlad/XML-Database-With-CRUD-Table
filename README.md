# Movie Database Web Application

## Mini Project for Advanced Database Using XML/XQuery/XPath

**Database Name**: `movieDatabase`

## Project Overview

This project includes a **web application** built to manage a movie database, perform CRUD operations, execute XQuery commands through an input field, and display XML structures of recently added items.

## Web App Features

- **CRUD Table**: Allows adding, updating, deleting, and viewing entries in the `Movies` table, built using Express.js and body-parser.
- **XQuery Execution**: Users can input custom XQuery statements, which are executed and displayed on the page.
- **XML Serialization**: Recently added or modified items are shown in XML format to visualize the structure and data being stored.

## Technologies Used

```javascript
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const { DOMParser, XMLSerializer } = require("xmldom");
const xpath = require("xpath");
```

## Database Entities

1. **Movies**: Information about each movie.
   - `movie_id`, `title`, `release_year`, `genre`, `duration`, `director_id`, `rating`
2. **Directors**: Information about movie directors.
   - `director_id`, `name`, `birthdate`, `nationality`
3. **Actors**: Information about actors.
   - `actor_id`, `name`, `birthdate`, `nationality`
4. **Movie_Actors**: Links movies and actors in a many-to-many relationship.
   - `movie_id`, `actor_id`
5. **Genres**: Different movie genres.
   - `genre_id`, `genre_name`
6. **Reviews**: User reviews for movies.
   - `review_id`, `movie_id`, `user_id`, `rating`, `comment`, `review_date`
7. **Users**: Information about users who can leave reviews.
   - `user_id`, `username`, `email`

## Key Functionalities

### XQuery Execution Examples

<<<<<<< HEAD
1. **Select all movies**:
   ```xquery
   for $x in doc("movieDatabase")/movieDatabase/movies/movie
=======
for $x in doc('C:/Users/Aures/Desktop/XML-Database-With-CRUD-Table-master/movieDatabase.xml')//actor
return $x

1. **Select all movies**:
   ```xquery
   for $x in doc('C:/Users/Aures/Desktop/XML-Database-With-CRUD-Table-master/movieDatabase.xml')/movieDatabase/movies/movie
>>>>>>> a2e79d3 (second commit)
   return $x
   ```
2. **Select all actors, directors, or users**:
   ```xquery
   for $x in doc("movieDatabase")/movieDatabase/actors/actor
   return $x
   ```
3. **Select movies created by a specific director (e.g., "Frank Darabont")**:
   ```xquery
      for $movie in doc("movieDatabase")/movieDatabase/movies/movie,
         $director in doc("movieDatabase")/movieDatabase/directors/director
      where $movie/director_id = $director/director_id
            and $director/name = "Frank Darabont"
      return
         <Movie>
            <Title>{ $movie/title }</Title>
            <Genre>{ $movie/genre }</Genre>
            <Release_date>{ $movie/release_date }</Release_date>
               <Director>{ $director/name }</Director>
         </Movie>
   ```
4. **Select actors for a specific movie ("The Shawshank Redemption")**:
   ```xquery
      for $movie in doc("movieDatabase")/movieDatabase/movies/movie,
         $actor in doc("movieDatabase")/movieDatabase/actors/actor,
         $movie_actor in doc("movieDatabase")/movieDatabase/movie_actors/entry
      where $movie/movie_id = $movie_actor/movie_id
            and $movie_actor/actor_id = $actor/actor_id
            and $movie/title = "The Shawshank Redemption"
      return
      <Actor>
            <name>{ $actor/name }</name>
            <birthdate>{ $actor/birthdate }</birthdate>
            <nationality>{ $actor/nationality }</nationality>
      </Actor>
   ```
5. **Select movies with a specific genre ("Crime")**:
   ```xquery
      for $movie in doc("movieDatabase")/movieDatabase/movies/movie,
      $genre in doc("movieDatabase")/movieDatabase/genres/genre
      where $genre/genre_id = $movie/genre
         and $genre/genre_name = "Crime"
      return
      <Movie>
         <Title>{ $movie/title }</Title>
         <Genre>{ $genre/genre_name }</Genre>
         <Release_date>{ $movie/release_date }</Release_date>
         <Director>{ $movie/director }</Director>
      </Movie>
   ```
6. **Get the average rating of all movies**:

   ```xquery
   let $ratings := doc("movieDatabase")/movieDatabase/movies/movie/rating
   return avg($ratings)
   ```

# Installation and Setup

## Install Dependencies: Clone the project and run:

```bash
npm install express body-parser xmldom xpath
```

**Run the Server**:

```bash
node app.js
Access the Web App: Open a browser and navigate to http://localhost:3000.
```

## Usage

- **CRUD Operations**: Use the form to add, edit, and delete movie records, with entries displayed in a table.
- **Execute XQuery**: Enter an XQuery command to retrieve or manipulate XML data, with results shown in real-time.
- **XML Output**: XML structure of recent additions is displayed to verify data integrity.
  This project demonstrates the integration of XML/XQuery/XPath in a Node.js web app, showcasing advanced querying, XML serialization, and XPath for in-depth data handling within a database context.
