import { StylesProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  getGenres,
  getMoviesByPage,
  getMovieByQuery,
  getAllMovies,
} from "../../services";
import Header from "../../components/Header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import MovieDetails from "../../components/Movies/MovieDetails";
import Movies from "../../components/Movies/Movies";
import FavoritePage from "../FavoritePage/FavoritePage";
import LoginPage from "../LoginPage/LoginPage";

export default function HomePage({}) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [offset, setOffset] = useState(1);
  const isAuth = localStorage.getItem("isAuth");

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  // const toggleFavMovies = (id) => {
  //   const updateMovies = [...movies];
  //   let movieIndex = updateMovies.findIndex((movie) => movie.id === id);
  //   updateMovies.splice(movieIndex, 1);
  //   localStorage.setItem("favorites", JSON.stringify(updateMovies));
  //   setMovies(updateMovies);
  // };

  useEffect(() => {
    getMoviesByPage(offset).then((res) => {
      // console.log("Results::", res.results);
      setMovies([...movies, ...res.results]);
      setLoading(false);
      // console.log("AnotherMovies::", movies);
    });
    // console.log(offset);
  }, [offset]);

  // console.log("AnotherMovies::", movies);

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

  return isAuth ? (
    <>
      <Router>
        <Header handleSearchInput={handleSearchInput} />
        <Switch>
          <Route exact path="/">
            <LoginPage isAuth={isAuth} />
          </Route>
          <Route exact path="/home">
            {/* {loggedIn ? <Redirect to="/home" /> : <PublicHomePage />} */}
            <Movies
              setOffset={setOffset}
              isAuth={isAuth}
              loading={loading}
              movies={movies}
            />
          </Route>
          <Route path="/home/favorites">
            <FavoritePage isAuth={isAuth} />
          </Route>
          <Route path="/home/:id" children={<MovieDetails />}></Route>
        </Switch>
      </Router>
    </>
  ) : (
    <Redirect to="/" />
  );
}
