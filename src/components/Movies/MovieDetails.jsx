import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCompanyImgUrl, getImgUrl, getMovieById } from "../../services";
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
  console.log(movieDetails);
  return (
    <>
      {loading ? (
        <div className={styles.loadContainer}>
          <Loader />
        </div>
      ) : (
        <div
          // style={{
          //   backgroundColor: "lightgrey",
          //   // backgroundImage:
          //   //   "url(" + `${getImgUrl(movieDetails.backdrop_path)}` + ")",
          //   // backgroundPosition: "fixed",
          //   // backgroundSize: "cover",
          //   // opacity: "0.7",
          //   textAlign: "center",
          // }}
          className={styles.container}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{
                    marginRight: "50px",
                    height: "100vh",
                  }}
                  src={`${getImgUrl(movieDetails.poster_path)}`}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h1>{movieDetails.title}</h1>
                  <h3>
                    {movieDetails.production_countries.map((countryDetails) => (
                      <p>{countryDetails.name}</p>
                    ))}
                  </h3>
                  <p>{movieDetails.overview}</p>
                  <div>
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
                  <div>
                    <p>Produced by</p>
                    {movieDetails.production_companies.map((company) => {
                      return (
                        <img
                          style={{ margin: "10px", height: "80px" }}
                          src={`${getCompanyImgUrl(company.logo_path)}`}
                        />
                      );
                    })}
                  </div>
                </div>
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
        </div>
      )}
    </>
  );
}
