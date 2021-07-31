import { useParams } from "react-router";
import { idText } from "typescript";

export default function MovieDetails() {
  let { id } = useParams();

  return <h1>Details::: {id}</h1>;
}
