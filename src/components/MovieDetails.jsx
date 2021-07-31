import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovieById } from "../services";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    getMovieById(id).then((response) => setMovieDetails(response));
  }, []);
  console.log(movieDetails);

  return (
    <>
      <h1>{movieDetails.title}</h1>,<p>{movieDetails.overview}</p>
    </>
  );
}
