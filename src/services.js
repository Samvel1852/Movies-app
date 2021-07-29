const API_KEY = "e8e227add2a2e5c168f7c3845928d8db";
const API_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export function getMoviesByPage(page) {
  return fetch(
    `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  ).then((res) => res.json());
}

export function getMovieById(id) {
  return fetch(`${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`).then(
    (res) => res.json()
  );
}

export function getGenres() {
  return fetch(
    `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`
  ).then((res) => res.json());
}

export function getImgUrl(path) {
  return `${IMG_URL}${path}`;
}
