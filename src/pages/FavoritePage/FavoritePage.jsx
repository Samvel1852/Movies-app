import React, { useState, useEffect } from "react";
import MoveCard from "../../components/Movies/MovieCard";
import styles from "./FavoritePage.module.css";

const initialState = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

export default function FavoritePage() {
  const [movies, setMovie] = useState(initialState);

  console.log(movies);

  return (
    <section className={styles.container}>
      {movies.map((movie) => {
        return (
          <MoveCard
            title={movie.title}
            imgPath={movie.imgPath}
            genres={movie.genres}
            id={movie.id}
          />
        );
      })}
    </section>
  );
}
