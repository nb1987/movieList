// check if the array length is greater than 0 before dividing.
// If it's an empty array, it returns 0 to avoid dividing by zero.
const average = (arr) =>
  arr.length > 0 ? arr.reduce((acc, cur) => acc + cur, 0 / arr.length) : 0;

export default function Summary({ watched = [] }) {
  const totalWatched = watched.length;
  const avgImdbRating =
    watched.length > 0 ? average(watched.map((movie) => movie.imdbRating)) : 0;
  const avgUserRating =
    watched.length > 0 ? average(watched.map((movie) => movie.yourRating)) : 0;
  const avgRuntime =
    watched.length > 0 ? average(watched.map((movie) => movie.runtime)) : 0;
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{totalWatched} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
