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

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    marginBottom: 30,
    marginTop: 10,
    zIndex: 2,
  },
});

let favorites = [];

export default function MoveCard({ title, imgPath, description, genres, id }) {
  favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  let isFav = favorites.some((movie) => movie.id === id);

  const [isFavorite, setIsFavorite] = useState(isFav);

  const classes = useStyles();

  let movieInfo = {
    title,
    imgPath,
    genres,
    id,
    isFavorite: !isFavorite,
  };

  const handleFavIconToggle = () => {
    setIsFavorite((prevState) => !prevState);
    if (isFavorite) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((movie) => movie.id !== id))
      );
    } else {
      favorites.push(movieInfo);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  // console.log({ title, imgPath, genres, id });
  return (
    <Card className={classes.root}>
      <Link to={`/home/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="350"
            image={getImgUrl(imgPath)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="h4" color="textPrimary" component="p">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {genres.map((genre, idx) => {
                return <span key={idx}>{genre}</span>;
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button onClick={handleFavIconToggle} size="small" color="primary">
          {isFavorite ? "-" : "+"}
        </Button>
      </CardActions>
    </Card>
  );
}
