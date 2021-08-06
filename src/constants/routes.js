import Movies from "../components/Movies/Movies";
import { FavoritePage } from "../pages/FavoritePage/FavoritePage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import SignUp from "../pages/SignUpPage/SignUp";

export const Routes = {
  loginPage: {
    url: "/",
    component: LoginPage,
  },
  signUp: {
    url: "/signUp",
    component: SignUp,
  },
  homePage: {
    url: "/home",
    component: HomePage,
  },
  movies: {
    url: "/home/movies",
    component: Movies,
  },
  favoritePage: {
    url: "/home/favorites",
    component: FavoritePage,
  },
  movieDetails: {
    url: "/home/movies/",
    component: MovieDetails,
  },
};
