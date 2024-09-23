import Movie from "./Movie";

export default function MovieList({
  movies,
  handleSelectedMovie,
  handleDeleteWatched,
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleSelectedMovie={handleSelectedMovie}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
}
