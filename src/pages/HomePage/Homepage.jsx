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
import { Routes } from "../../constants/routes";
import { getLocalStorage } from "../../helpers/localStorage";
import { storage } from "../../constants/storage";

const initialFavCount = getLocalStorage(storage.favorites)
  ? getLocalStorage(storage.favorites).length
  : 0;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(1);
  const isAuth = getLocalStorage(storage.isAuth);
  const [favCount, setFavCount] = useState(initialFavCount);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getMoviesByPage(offset).then((res) => {
      setMovies([...movies, ...res.results]);
      setLoading(false);
    });
  }, [offset]);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      getMovieByQuery(searchQuery)
        .then((res) => {
          setMovies(res.results);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      getMoviesByPage(1).then((res) => {
        setMovies(res.results);
        setLoading(false);
      });
    }
  }, [searchQuery]);
  // console.log("homeRendered");
  return isAuth ? (
    <>
      <Header handleSearchInput={handleSearchInput} favCount={favCount} />
      <Switch>
        <Route exact path={Routes.homePage.url}>
          {/* {loggedIn ? <Redirect to="/home" /> : <PublicHomePage />} */}
          <Movies
            setOffset={setOffset}
            isAuth={isAuth}
            loading={loading}
            movies={movies}
            setFavCount={setFavCount}
          />
        </Route>

        <Route path="/home/favorites">
          <FavoritePage setFavCount={setFavCount} isAuth={isAuth} />
        </Route>

        <Route path="/home/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </>
  ) : (
    <Redirect to="/" />
  );
}
