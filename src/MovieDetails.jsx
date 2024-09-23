import axios from "axios";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const key = "822f3b5a";

export default function MovieDetails({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState(null); //Initially set to null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [yourRating, setYourRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const yourRatingForTheMovie = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.yourRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {}; // Fallback to empty object to prevent errors

  const onHandleAddWatched = () => {
    const movieToAdd = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating), // ?
      runtime: Number(runtime.split(" ").at(0)), // Extract minutes from runtime string. Number(runtime.split(" ")[0]),
      yourRating,
    };
    handleAddWatched(movieToAdd);
    handleCloseMovie();
  };

  async function getMovieDetails() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );

      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }
      if (res.data.Response !== "True") {
        throw new Error("Movies Not Found");
      }
      setMovie(res.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return; // works without this line
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    }; // Cleanup function to reset title
  }, [title]);

  useEffect(() => {
    // Add event listener for 'Escape' key to close the movie
    const handleEscapeKey = (e) => {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleCloseMovie]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && movie && (
        <>
          <header>
            <button onClick={handleCloseMovie} className="btn-back">
              ❌
            </button>
            <img src={poster} alt={`poster of ${title}`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released}</p>
              <p>{genre}</p>
              <p>{imdbRating}🌟IMDB Rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetYourRating={(rating) => {
                      setYourRating(rating);
                    }}
                  />
                  <button className="btn-add" onClick={onHandleAddWatched}>
                    I Watched This!
                  </button>
                </>
              ) : (
                <p>{yourRatingForTheMovie}</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starting {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
