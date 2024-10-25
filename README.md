# This is a mini Project for Advanced Database using XML/XQuery/Xpath

Database Name = "movieDatabase"

# Tables (Entities):

# Movies: Information about each movie.

    Attributes: movie_id, title, release_year, genre, duration, director_id, rating

# Directors: Information about movie directors.

    Attributes: director_id, name, birthdate, nationality

# Actors: Information about actors.

    Attributes: actor_id, name, birthdate, nationality

# Movie_Actors: A junction table to link movies and actors (many-to-many relationship).

    Attributes: movie_id, actor_id
    Genres: Different movie genres.
    Attributes: genre_id, genre_name

# Reviews: User reviews for movies.

    Attributes: review_id, movie_id, user_id, rating, comment, review_date

# Users: Information about users who can leave reviews.

    Attributes: user_id, username, email

# All queries that can be used in this Database using XQuery/Xpath

# XQuery :

    1-Select all movies :
      for $x in doc("db.xml")/movies
        return $x
    2-Select all actors/ :
