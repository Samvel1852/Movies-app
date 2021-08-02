import { StylesProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  getGenres,
  getMoviesByPage,
  getMovieByQuery,
  getAllMovies,
} from "../../services";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieDetails from "../../components/Movies/MovieDetails";
import Movies from "../../components/Movies/Movies";
import FavoritePage from "../FavoritePage/FavoritePage";
import LoginPage from "../LoginPage/LoginPage";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [offset, setOffset] = useState(1);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getMoviesByPage(offset).then((res) => {
      console.log("Results::", res.results);
      setMovies([...movies, ...res.results]);
      setLoading(false);
      console.log("AnotherMovies::", movies);
    });
    console.log(offset);
  }, [offset]);

  console.log("AnotherMovies::", movies);

  window.addEventListener("scroll", function (e) {
    console.log(
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight,
      window.scrollY
    );
    if (
      Math.ceil(window.scrollY) + 200 >=
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    ) {
      setOffset((prevOffset) => prevOffset + 1);
      window.scrollBy(-100, -100);
    }
  });

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      getMovieByQuery(searchQuery)
        .then((res) => {
          // setError(false);
          setMovies(res.results);
          setLoading(false);
        })
        .catch((e) => {
          // setError(true);
          setLoading(false);
        });
    } else {
      getMoviesByPage(1).then((res) => {
        setMovies(res.results);
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
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/home">
            <Movies loading={loading} movies={movies} />
          </Route>
          <Route path="/home/favorites">
            <FavoritePage />
          </Route>
          <Route path="/home/:id" children={<MovieDetails />}></Route>
        </Switch>
      </Router>
    </>
  );
}
