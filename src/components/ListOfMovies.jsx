import { useEffect, useState } from "react";
import "./ListOfMovies.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function ListOfMovies({ string = "", setSelected }) {
  const search = string;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      const filteredMovies = data.results.filter(
        (movie) => movie.poster_path && movie.release_date
      );

      setMovies(filteredMovies);
    }

    fetchMovies();
  }, [search]);

  return (
    <div className="list-of-movies">
      <h3>Movies</h3>

      <ul>
        {movies.map((movie) => (
          <li
            key={movie.id}
            onClick={() => setSelected(movie.id)}   // ✅ works now
          >
            {movie.title} ({movie.release_date.slice(0, 4)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfMovies;
