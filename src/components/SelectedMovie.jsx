import { useEffect, useState } from "react";
import "./SelectedMovie.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function SelectedMovie({selected = 66}) { // default: Batman (1989)
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const movieId = selected;

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch movie");

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchMovie();
  }, [selected]);

  if (error) return <p className="error-message">{error}</p>;
  if (!movie) return <p className="loading-message">Loading...</p>;

  // Use backdrop first, fallback to poster
  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="selected-movie">
      <h3 className="movie-title">
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h3>

      {imageUrl ? (
        <img src={imageUrl} alt={movie.title} className="movie-image" />
      ) : (
        <div className="image-placeholder">No image available</div>
      )}

      {movie.overview && <p className="movie-overview">{movie.overview}</p>}
    </div>
  );
}

export default SelectedMovie;
