export default function findGenreName(genres, genreIds) {
  const res = [];
  genreIds.forEach((genreId) => {
    genres.forEach((genre) => {
      if (genreId === genre.id) {
        res.push(genre.name);
      }
    });
  });
  return res;
}
