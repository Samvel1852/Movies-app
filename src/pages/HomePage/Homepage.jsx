import { StylesProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getGenres, getMoviesByPage } from "../../services";
import styles from "./Homepage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState("");
  const [genres, setGenres] = useState("");

  useEffect(() => {
    getMoviesByPage(1).then((res) => {
      setMovies(res);
    });
  }, []);

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  console.log(movies);
  console.log(genres);

  return (
    <>
      <h1>HOME PAGES</h1>
      <section className={styles.container}>
        {movies &&
          movies.results.map((movie) => {
            return (
              <MoveCard
                key={movie.id}
                title={movie.title}
                description={movie.overview}
                imgPath={movie.poster_path}
              />
            );
          })}
      </section>
    </>
  );
}
