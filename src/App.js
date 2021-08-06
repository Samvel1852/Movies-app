import "./App.css";
import HomePage from "./pages/HomePage/Homepage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import SignUp from "./pages/SignUp/SignUpPage";
import { getLocalStorage } from "./helpers/localStorage";
import { storage } from "./constants/storage";

// const isAuth = localStorage.getItem("isAuth");

function App() {
  const isAuth = getLocalStorage(storage.isAuth);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home" children={<HomePage isAuth={isAuth} />} />
          <Route
            path="/home/favorites"
            children={<FavoritePage isAuth={isAuth} />}
          />
          <Route exact path="/" children={<LoginPage isAuth={isAuth} />} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
