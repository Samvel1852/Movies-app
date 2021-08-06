import MovieDetails from "../components/Movies/MovieDetails";
import Movies from "../components/Movies/Movies";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import HomePage from "../pages/HomePage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUp from "../pages/SignUp/SignUpPage";

export const Routes = {
  loginPage: {
    url: "/",
    component: LoginPage,
  },
  signUp: {
    url: "/signup",
    component: SignUp,
  },
  homePage: {
    url: "/home/",
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
