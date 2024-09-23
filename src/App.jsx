import { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "./Navbar";
import Logo from "./Logo";
import Search from "./Search";
import NumResult from "./NumResult";
import MainBox from "./MainBox";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import Box from "./Box";
import Summary from "./Summary";
import WatchedList from "./WatchedList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const key = "822f3b5a";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectedMovie = (passedId) => {
    setSelectedId((selectedId) => (selectedId == passedId ? null : passedId));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (data) => {
    setWatched((watched) => [...watched, data]);
  };

  const handleDeleteWatched = (passedId) => {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== passedId)
    );
  };

  async function fetchMovies(controller) {
    setIsLoading(true);
    setError(""); // Reset the error state before fetching.

    try {
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
        { signal: controller.signal }
      );
      // Pass the signal to axios request

      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }
      if (res.data.Response !== "True") {
        throw new Error("Movies Not Found");
      }

      setMovies(res.data.Search);
    } catch (e) {
      setError(e.message); //error message in case of failure
    } finally {
      setIsLoading(false); //loading state is turned off no matter what.
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    if (query.length < 3) {
      setMovies([]); // If query length is less than 3,
      setError(""); // then clear movies and errors.
      return; // Don't display `movies not found`.
    }

    fetchMovies(controller);

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <MainBox>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </MainBox>
    </>
  );
}
// http://www.omdbapi.com/?i=tt3896198&apikey=822f3b5a
// http://www.omdbapi.com/?apikey=[yourkey]&
// https://www.omdbapi.com/?apikey=822f3b5a&s=interstellar
