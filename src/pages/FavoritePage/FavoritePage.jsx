import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import MoveCard from "../../components/Movies/MovieCard";
import styles from "./FavoritePage.module.css";

// export const StorageMovies = React.createContext(
//   JSON.parse(localStorage.getItem("favorites"))
// );

export default function FavoritePage({ isAuth }) {
  // const [movies, setMovies] = useState(
  //   localStorage.getItem("favorites")
  //     ? JSON.parse(localStorage.getItem("favorites"))
  //     : []
  // );
  const movies = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  const [fakeState, setFakeState] = useState(1);

  // const toggleFavMovies = (id) => {
  //   const updateMovies = [...movies];
  //   let movieIndex = updateMovies.findIndex((movie) => movie.id === id);
  //   updateMovies.splice(movieIndex, 1);
  //   localStorage.setItem("favorites", JSON.stringify(updateMovies));
  //   setMovies(updateMovies);
  // };

  const fakeRender = () => {
    setFakeState(fakeState + 1);
  };
  console.log("fav page render");
  return isAuth ? (
    <section className={styles.container}>
      {!movies.length ? (
        <h2>You have not any favorite</h2>
      ) : (
        movies.map((movie) => {
          return (
            <MoveCard
              // toggle={toggleFavMovies}
              fakeRender={fakeRender}
              key={movie.id}
              title={movie.title}
              imgPath={movie.imgPath}
              genres={movie.genres}
              id={movie.id}
            />
          );
        })
      )}
    </section>
  ) : (
    <Redirect to="/" />
  );
}
