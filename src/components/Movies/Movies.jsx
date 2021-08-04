import styles from "./Movies.module.css";
import findGenreName from "../../helpers/findGenres";
import MoveCard from "./MovieCard";
import { useState, useEffect } from "react";
import { getGenres } from "../../services";
import Loader from "../Loader/Loader";
import { Redirect } from "react-router-dom";

export default function Movies({ loading, movies, isAuth, setOffset }) {
  const [genres, setGenres] = useState("");

  const lazyLoad = function () {
    // console.log(
    //   "ScrlHeight::",
    //   document.documentElement.scrollHeight,
    //   "ClientHeight::",
    //   document.documentElement.clientHeight,
    //   "WindScrlYHeight::",
    //   window.scrollY
    // );
    if (
      Math.ceil(window.scrollY) + 50 >=
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    ) {
      setOffset((prevOffset) => prevOffset + 1);
      window.scrollBy(-20, -20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", lazyLoad);

    return () => window.removeEventListener("scroll", lazyLoad);
  });

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  return (
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
  );
  // : (
  //   <Redirect to="/" />
  // );
}
