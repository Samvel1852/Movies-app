import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovieById } from "../../services";

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
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
        </div>
      )}
    </>
  );
}
