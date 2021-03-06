import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getImgUrl } from "../../services";
import { Link } from "react-router-dom";
import { StorageMovies } from "../../pages/FavoritePage/FavoritePage";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";
import { storage } from "../../constants/storage";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import { Routes } from "../../constants/routes";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    marginBottom: 70,
    marginTop: 10,
    zIndex: 2,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#FAFAFA",
  },

  favBtn: {
    padding: 0,
  },

  genreName: {
    margin: 2,
  },

  movieTitle: {
    textAlign: "center",
  },
});

let favorites = [];

export default function MoveCard({
  title,
  imgPath,
  genres,
  id,
  setFavCount,
  fakeRender,
}) {
  favorites = getLocalStorage(storage.favorites)
    ? getLocalStorage(storage.favorites)
    : [];

  let isFav = favorites.some((movie) => movie.id === id);

  const [isFavorite, setIsFavorite] = useState(isFav);

  const classes = useStyles();

  const handleFavIconToggle = () => {
    setIsFavorite(!isFavorite);
    const movieInfo = {
      title,
      imgPath,
      genres,
      id,
      isFavorite: !isFavorite,
    };

    if (isFavorite) {
      setLocalStorage(
        storage.favorites,
        favorites.filter((movie) => movie.id !== id)
      );
      setFavCount((prevFavCount) => prevFavCount - 1);
    } else {
      favorites.push(movieInfo);
      setLocalStorage(storage.favorites, favorites);
      setFavCount((prevFavCount) => prevFavCount + 1);
    }
  };
  return (
    <Card className={classes.root}>
      <Link to={`${Routes.homePage.url}${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="350"
            image={getImgUrl(imgPath)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              className={classes.movieTitle}
              variant="h6"
              color="textPrimary"
              component="p"
            >
              {title}
            </Typography>
            <div style={{ width: "100%" }}>
              <Typography variant="body2" color="textSecondary" component="p">
                {genres.map((genre, idx) => {
                  return (
                    <Chip
                      className={classes.genreName}
                      key={idx}
                      variant="outlined"
                      color="primary"
                      label={genre}
                      size="small"
                    />
                  );
                })}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button
          className={classes.favBtn}
          size="small"
          color="primary"
          onClick={handleFavIconToggle}
        >
          {isFavorite ? (
            <FavoriteIcon style={{ color: "orange" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Button>
      </CardActions>
    </Card>
  );
}

MoveCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  fakeRender: PropTypes.func.isRequired,
};
