import { StylesProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getGenres, getMoviesByPage } from "../../services";
import styles from "./Homepage.module.css";
import findGenres from "../../helpers/findGenres";

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

  console.log("Movies::", movies);
  console.log("Movies.results::", movies.results);
  console.log("Genres::", genres);
  // console.log("findGenres::", findGenres(movies.results, genres));

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
