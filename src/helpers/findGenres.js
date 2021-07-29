// export default function findGenres(movieResults, genreIds) {
//   movieResults.map((result, idx) => {
//     return (
//       <ul key={idx}>
//         {genreIds.map((genreId, index) => {
//           if (result.genre_ids.includes(genreId)) {
//             return <li key={index}>{genreId}</li>;
//           }
//         })}
//       </ul>
//     );
//   });
// }

// export default function findGenres(movieResults, genres) {
//   movieResults.map((movie, index) => {
//     return (
//       <ul key={index}>
//         {genres.map((genre, index) => {
//           return (
//             <li key={index}>
//               {movie.genre_ids.includes(genre.id) ? genre.name : ""}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   });
// }

export default function findGenres(movie, genres) {
  return (
    <ul>
      {genres.map((genre, index) => {
        if (movie.genre_ids.includes(genre.id)) {
          return <li key={index}>{genre.name}</li>;
        }
      })}
    </ul>
  );
}
