import styles from "./Movies.module.css";
import findGenreName from "../../helpers/findGenreName";
import MoveCard from "../../components/MovieCard";
import { useState, useEffect } from "react";
import { getGenres } from "../../services";

export default function Movies({ loading, movies }) {
  const [genres, setGenres] = useState("");

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  return (
    <section className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : !movies.results.length ? (
        <h3>No Such Film</h3>
      ) : (
        movies.results.map((movie, index) => {
          return (
            <MoveCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              description={movie.overview}
              imgPath={movie.poster_path}
              genres={genres ? findGenreName(genres, movie.genre_ids) : []}
            />
          );
        })
      )}
    </section>
  );
}
