export function getImgUrl(path) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function findGenreName(genres, genreIds) {
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

export function isUserValid(users, value) {
  let res = false;
  users.forEach((el) => {
    if (el.email === value.email && el.password === value.password) {
      res = true;
    }
  });
  return res;
}
