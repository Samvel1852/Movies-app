import { StylesProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getGenres, getMoviesByPage, getMovieByQuery } from "../../services";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieDetails from "../../components/MovieDetails";
import Movies from "../../components/Movies/Movies";

export default function HomePage() {
  const [movies, setMovies] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

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
    if (searchQuery) {
      setLoading(true);
      getMovieByQuery(searchQuery)
        .then((res) => {
          // setError(false);
          setMovies(res);
          setLoading(false);
        })
        .catch((e) => {
          // setError(true);
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
            <Movies loading={loading} movies={movies} />
          </Route>
          <Route path="/home/:id" children={<MovieDetails />} />
        </Switch>
      </Router>
    </>
  );
}
