import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import MoveCard from "../../components/Movies/MovieCard";
import { storage } from "../../constants/storage";
import { getLocalStorage } from "../../helpers/localStorage";
import styles from "./FavoritePage.module.css";
import PropTypes from "prop-types";
import { Routes } from "../../constants/routes";

// export const StorageMovies = React.createContext(
//   JSON.parse(localStorage.getItem("favorites"))
// );

export default function FavoritePage({ isAuth, setFavCount }) {
  const movies = getLocalStorage(storage.favorites)
    ? getLocalStorage(storage.favorites)
    : [];

  return isAuth ? (
    <section className={styles.container}>
      {!movies.length ? (
        <h2>You have not any favorite</h2>
      ) : (
        movies.map((movie) => {
          return (
            <MoveCard
              setFavCount={setFavCount}
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
    <Redirect to={Routes.loginPage.url} />
  );
}

FavoritePage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
