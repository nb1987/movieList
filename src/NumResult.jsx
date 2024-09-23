export default function NumResult({ movies = [] }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}
// provided a default value ([]) for movies,
// so `movies.length` will not throw an error
// even if movies is undefined or null.
