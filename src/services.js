import axios from "axios";

const API_KEY = "e8e227add2a2e5c168f7c3845928d8db";
const API_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const COMP_IMG_URL = "https://image.tmdb.org/t/p/w200";

export function getAllMovies() {
  return axios
    .get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`)
    .then((res) => res.data);
}

export function getMoviesByPage(page) {
  return axios
    .get(
      `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    )
    .then((res) => res.data);
}

export function getMovieById(id) {
  return axios
    .get(`${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then((res) => res.data);
}

export function getGenres() {
  return axios
    .get(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((res) => res.data);
}

export function getImgUrl(path) {
  return `${IMG_URL}${path}`;
}

export function getCompanyImgUrl(path) {
  return `${COMP_IMG_URL}${path}`;
}

export function getMovieByQuery(query) {
  return axios
    .get(`${API_URL}search/movie?api_key=${API_KEY}&query=${query}`)
    .then((res) => res.data);
}
