import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovieById } from "../../services";
import Loader from "../Loader/Loader";

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
        <Loader />
      ) : (
        <div>
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
        </div>
      )}
    </>
  );
}
