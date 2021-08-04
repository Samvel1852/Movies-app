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

// const isAuth = localStorage.getItem("isAuth");

function App() {
  const isAuth = localStorage.getItem("isAuth");
  console.log(isAuth);
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
