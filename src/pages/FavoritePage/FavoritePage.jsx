import React, { useState, useEffect } from "react";
import MoveCard from "../../components/Movies/MovieCard";
import styles from "./FavoritePage.module.css";

export default function FavoritePage() {
  // const movies = localStorage.getItem("favorites")
  //   ? JSON.parse(localStorage.getItem("favorites"))
  //   : [];

  const [movies, setMovies] = useState(
    localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : []
  );

  return (
    <section className={styles.container}>
      {!movies.length ? (
        <h2>You have not any favorite</h2>
      ) : (
        movies.map((movie) => {
          return (
            <MoveCard
              title={movie.title}
              imgPath={movie.imgPath}
              genres={movie.genres}
              id={movie.id}
            />
          );
        })
      )}
    </section>
  );
}
