import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getImgUrl, getMovieById } from "../../services";
import Loader from "../Loader/Loader";
import Chip from "@material-ui/core/Chip";
import styles from "./MovieDetails.module.css";
import { fixRequestBody } from "http-proxy-middleware";
// import { coverage } from "browserslist"

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    getMovieById(id).then((response) => {
      setMovieDetails(response);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.loadContainer}>
          <Loader />
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "lightgrey",
            backgroundImage:
              "url(" + `${getImgUrl(movieDetails.backdrop_path)}` + ")",
            backgroundPosition: "fixed",
            backgroundSize: "cover",
            // opacity: "0.7",
            textAlign: "center",
          }}
          className="container"
        >
          <h1>{movieDetails.title}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <img
              style={{
                marginRight: "50px",
              }}
              src={`${getImgUrl(movieDetails.poster_path)}`}
            />

            <div>
              <p>{movieDetails.overview}</p>
              {movieDetails.genres.map((genre, idx) => (
                // <li key={idx}>{genre.name}</li>
                <Chip
                  // className={classes.genreName}
                  style={{ margin: "2px" }}
                  key={idx}
                  variant="outlined"
                  color="primary"
                  label={genre.name}
                  size="small"
                />
              ))}
            </div>

            <p>
              Visit to learn more
              <a
                style={{ color: "red" }}
                target="_blank"
                style={{ color: "black" }}
                href={movieDetails.homepage}
              >
                {` ${movieDetails.homepage.slice(8)}`}
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
