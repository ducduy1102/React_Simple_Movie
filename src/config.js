export const fetcher = (...args) => fetch(...args).then((res) => res.json());
// 214
// export const apiKey = '95f2419536f533cdaa1dadf83c606027';
export const apiKey = "5570dfe1051cca6984d38424bb09bfd4";

// 224 + 225
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";

export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  imgOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  img500: (url) => `https://image.tmdb.org/t/p/w500${url}`,
};
