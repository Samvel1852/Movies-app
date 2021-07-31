import { StylesProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import MoveCard from "../../components/MovieCard";
import { getGenres, getMoviesByPage, getMovieByQuery } from "../../services";
import styles from "./Homepage.module.css";
import findGenreName from "../../helpers/findGenreName";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieDetails from "../../components/MovieDetails";

export default function HomePage() {
  const [movies, setMovies] = useState("");
  const [genres, setGenres] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getMoviesByPage(1).then((res) => {
      setMovies(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getGenres().then(({ genres }) => {
      setGenres(genres);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      getMovieByQuery(searchQuery).then((res) => {
        setMovies(res);
        setLoading(false);
      });
    } else {
      getMoviesByPage(1).then((res) => {
        setMovies(res);
        setLoading(false);
      });
    }
  }, [searchQuery]);

  // console.log(searchQuery);

  return (
    <>
      <Router>
        <Header handleSearchInput={handleSearchInput} />
        <Switch>
          <Route exact path="/home">
            <section className={styles.container}>
              {loading ? (
                <p>Loading</p>
              ) : (
                movies.results.map((movie, index) => {
                  return (
                    <MoveCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      description={movie.overview}
                      imgPath={movie.poster_path}
                      genres={
                        genres ? findGenreName(genres, movie.genre_ids) : []
                      }
                    />
                  );
                })
              )}
            </section>
          </Route>
          <Route path="/home/:id" children={<MovieDetails />} />
        </Switch>
      </Router>
    </>
  );
}
