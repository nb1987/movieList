import { useState } from "react";
import StarRating from "./StarRating";

export default function WatchedMovie({ movie, handleDeleteWatched }) {
  const [yourRating, setYourRating] = useState(movie.yourRating || null);

  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{yourRating ? yourRating : "Not Rated"}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>

      <button
        className="btn-delete"
        onClick={() => handleDeleteWatched(movie.imdbID)}
      >
        ⛔
      </button>

      <StarRating
        maxRating={10}
        messages={["😤", "😑", "🙂", "🥰", "😍"]}
        defaultRating={yourRating || 5}
        onSetYourRating={(newRating) => {
          setYourRating(newRating);
        }}
      />
      <p style={{ marginTop: "50px" }}>Your Rate: {yourRating}</p>
    </li>
  );
}
