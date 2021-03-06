import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCompanyImgUrl, getImgUrl, getMovieById } from "../../services";
import Loader from "../Loader/Loader";
import Chip from "@material-ui/core/Chip";
import styles from "./MovieDetails.module.css";
import { fixRequestBody } from "http-proxy-middleware";
import StarsIcon from "@material-ui/icons/Stars";

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

  // console.log(movieDetails);

  return (
    <>
      {loading ? (
        <div className={styles.loadContainer}>
          <Loader size={80} />
        </div>
      ) : (
        <div className={styles.page}>
          <img
            className={styles.backgroundDetails}
            src={getImgUrl(movieDetails.backdrop_path)}
            alt={movieDetails.title}
            width="100%"
            height="100%"
          />
          <div className={styles.container}>
            <div className={styles.poster}>
              <img
                className={styles.backgroundPath}
                src={getImgUrl(movieDetails.poster_path)}
                alt={movieDetails.title}
                width="100%"
              />
            </div>
            <div className={styles.date}>{movieDetails.release_date}</div>
            <div className={styles.info}>{movieDetails.status}</div>
            <div className={styles.title}>{movieDetails.title}</div>
            <div className={styles.overview}>
              <i>{movieDetails.overview}</i>
            </div>
            <div className={styles.rating}>
              <StarsIcon className={styles.icon} />
              {movieDetails.vote_average}
            </div>
            <div className={styles.status}>
              <i>{movieDetails.tagline}</i>
            </div>
            <div className={styles.runtime}>{movieDetails.runtime} minute</div>
          </div>
        </div>
        // <div className={styles.container}>
        //   <div
        //     style={{
        //       width: "100%",
        //       display: "flex",
        //       justifyContent: "center",
        //     }}
        //   >
        //     <img
        //       style={{
        //         marginRight: "50px",
        //         height: "100vh",
        //       }}
        //       src={`${getImgUrl(movieDetails.poster_path)}`}
        //     />
        //     <div style={{ display: "flex", flexDirection: "column" }}>
        //       <h1>{movieDetails.title}</h1>
        //       <h3>
        //         {movieDetails.production_countries.map((countryDetails) => (
        //           <p>{countryDetails.name}</p>
        //         ))}
        //       </h3>
        //       <p>{movieDetails.overview}</p>
        //       <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        //         {movieDetails.genres.map((genre, idx) => (
        //           // <li key={idx}>{genre.name}</li>
        //           <Chip
        //             // className={classes.genreName}
        //             style={{ margin: "2px" }}
        //             key={idx}
        //             variant="outlined"
        //             color="primary"
        //             label={genre.name}
        //             size="small"
        //           />
        //         ))}
        //       </div>
        //       <p style={{ width: "100%", fontSize: "30px" }}>Produced by</p>
        //       <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        //         {movieDetails.production_companies.map((company) => {
        //           return (
        //             <img
        //               style={{ margin: "10px", height: "80px" }}
        //               src={`${getCompanyImgUrl(company.logo_path)}`}
        //             />
        //           );
        //         })}
        //       </div>
        //     </div>
        //   </div>
        //   <p style={{ width: "100%", display: "block", fontSize: "20px" }}>
        //     Visit to learn more
        //     <a
        //       style={{ color: "blue", textDecoration: "underline" }}
        //       target="_blank"
        //       // style={{ color: "black" }}
        //       href={movieDetails.homepage}
        //     >
        //       {` ${movieDetails.homepage.slice(8)}`}
        //     </a>
        //   </p>
        // </div>
      )}
    </>
  );
}
