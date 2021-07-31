import { StylesProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getGenres, getMoviesByPage } from "../../services";
import styles from "./Homepage.module.css";
import findGenres from "../../helpers/findGenres";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieDetails from "../../components/MovieDetails";

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

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/home">
            <section className={styles.container}>
              {movies &&
                movies.results.map((movie, index) => {
                  return (
                    <MoveCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      description={movie.overview}
                      imgPath={movie.poster_path}
                      genres={genres ? findGenres(movie, genres) : ""}
                    />
                  );
                })}
            </section>
          </Route>
          <Route path="/home/:id" children={<MovieDetails />} />
        </Switch>
      </Router>
    </>
  );
}
