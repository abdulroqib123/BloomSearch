import { renderHome } from "./views/home.js";
import { renderTrending } from "./views/trending.js";
import { renderMovies } from "./views/movies.js";
import { renderTV } from "./views/tv.js";
import { renderTopRated } from "./views/topRated.js";
import { renderSearch } from "./views/search.js";

const routes = {
  home: renderHome,
  trending: renderTrending,
  movies: renderMovies,
  tv: renderTV,
  "top-rated": renderTopRated,
  search: renderSearch,
};

export function navigate(route, params = {}) {
  const view = routes[route];

  if (!view) {
    console.error(`Route ${route} not found`);
    return;
  }

  view(params);
}
