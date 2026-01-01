import Header from "./Header";
import Footer from "./Footer";
import MainBody from "./MainBody";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MainPage() {
  const [string, setString] = useState("");
  const [selected, setSelected] = useState(null);

  // 🎲 Pick a random popular movie on first load
  useEffect(() => {
    async function fetchRandomMovie() {
      try {
        const randomPage = Math.floor(Math.random() * 10) + 1;

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${randomPage}`
        );

        const data = await res.json();

        if (data.results?.length) {
          const randomIndex = Math.floor(
            Math.random() * data.results.length
          );
          setSelected(data.results[randomIndex].id);
        }
      } catch (err) {
        console.error("Failed to fetch random movie", err);
      }
    }

    fetchRandomMovie();
  }, []);

  return (
    <>
      <Header setString={setString} />
      <MainBody
        string={string}
        selected={selected}
        setSelected={setSelected}
      />
      <Footer />
    </>
  );
}
