import { BLOOMSEARCH_API, BLOOMSEARCH_KEY } from "./config.js";

async function request(endpoint) {
  const response = await fetch(`${BLOOMSEARCH_API}/${endpoint}`, {
    method: "GET",
    headers: {
      "x-api-key": BLOOMSEARCH_KEY,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || "Request failed");
  }

  return result.data;
}

export function getTrendingMovies() {
  return request("trending");
}

export function getPopularMovies() {
  return request("popular");
}

export function getTopRatedMovies() {
  return request("top-rated");
}

export function getTv() {
  return request("tv/trending");
}

export function getSearchResults(query) {
  return request(`search?q=${encodeURIComponent(query)}`);
}

export function getMovieDetails(id) {
  return request(`movie?id=${id}`);
}

export function getTVDetails(id) {
  return request(`tv?id=${id}`);
}
