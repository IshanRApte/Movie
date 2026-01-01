import { useEffect, useState } from "react";
import "./SelectedMovie.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function SelectedMovie({ selected }) {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!selected) return;

    async function fetchData() {
      // Movie details
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${selected}?api_key=${API_KEY}`
      );
      const movieData = await movieRes.json();
      setMovie(movieData);

      // Trailer
      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${selected}/videos?api_key=${API_KEY}`
      );
      const videoData = await videoRes.json();

      const trailer = videoData.results?.find(
        v => v.site === "YouTube" && v.type === "Trailer"
      );

      setTrailerKey(trailer?.key || null);
      setShowTrailer(false);
    }

    fetchData();
  }, [selected]);

  if (!movie) return <p>Loading...</p>;

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="selected-movie">
      <h3>
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h3>

      {imageUrl && (
        <img src={imageUrl} alt={movie.title} className="movie-image" />
      )}

      <br/>
      {trailerKey && (
        
        <button
          className="trailer-btn"
          onClick={() => setShowTrailer(!showTrailer)}
        >
          {showTrailer ? "Hide Trailer" : "Play Trailer"}
        </button>
      )}

      {showTrailer && trailerKey && (
        <iframe
          className="trailer-frame"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default SelectedMovie;
