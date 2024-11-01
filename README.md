# Mini Project for Advanced Database Using XML/XQuery/XPath

## Database Name: `movieDatabase`

### Tables (Entities)

1. **Movies**: Information about each movie.

   - **Attributes**:
     - `movie_id`
     - `title`
     - `release_year`
     - `genre`
     - `duration`
     - `director_id`
     - `rating`

2. **Directors**: Information about movie directors.

   - **Attributes**:
     - `director_id`
     - `name`
     - `birthdate`
     - `nationality`

3. **Actors**: Information about actors.

   - **Attributes**:
     - `actor_id`
     - `name`
     - `birthdate`
     - `nationality`

4. **Movie_Actors**: A junction table to link movies and actors (many-to-many relationship).

   - **Attributes**:
     - `movie_id`
     - `actor_id`

5. **Genres**: Different movie genres.

   - **Attributes**:
     - `genre_id`
     - `genre_name`

6. **Reviews**: User reviews for movies.

   - **Attributes**:
     - `review_id`
     - `movie_id`
     - `user_id`
     - `rating`
     - `comment`
     - `review_date`

7. **Users**: Information about users who can leave reviews.
   - **Attributes**:
     - `user_id`
     - `username`
     - `email`

---

### Queries Using XQuery/XPath

Here are some example queries that can be used with this database:

#### XQuery Examples

1. **Select all movies**:

   ```xquery
   for $x in doc(movieDatabase)/movieDatabase/movies/movie
   return $x

   ```

2. **Select all actors/directors/Users**:
   is the same thing as selecting all

3. **Select movies created By a director using his Name**:

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

4. **Select actors (information) of a movie**:
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

5. **Select movies with genre(crime)**:
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
          3-Find all movies by a specific director:
    for $x in doc("db.xml")/movies/movie
      where $x/movie[director_id='1']
    return $x
   4-Get the average rating of all movies:
    for $rating in doc("db.xml")/movies/movie/rating
    return avg($rating)
   5-Count the number of reviews for a movie:
   for $rev in doc("db.xml")/reviews/review
      return count($rev/[movie_id="?"])

   ```

   ```
