import styles from "./Movies.module.css";
import findGenreName from "../../helpers/findGenres";
import MoveCard from "./MovieCard";
import { useState, useEffect } from "react";
import { getGenres } from "../../services";
import Loader from "../Loader/Loader";
import { Redirect } from "react-router-dom";

export default function Movies({ loading, movies, isAuth }) {
  const [genres, setGenres] = useState("");

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  return isAuth ? (
    <section className={styles.container}>
      {loading ? (
        <Loader />
      ) : !movies.length ? (
        <h3>No Such Film</h3>
      ) : (
        movies.map((movie, index) => {
          return (
            <MoveCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              description={movie.overview}
              imgPath={movie.poster_path}
              genres={genres ? findGenreName(genres, movie.genre_ids) : []}
              favorites={[]}
            />
          );
        })
      )}
    </section>
  ) : (
    <Redirect to="/" />
  );
}
