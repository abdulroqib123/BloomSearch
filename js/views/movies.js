import { getPopularMovies } from "../api.js";
import { createMovieCard } from "../components/movieCard.js";

export async function renderMovies() {
  const main = document.querySelector(".mainContent");
document.title = "Movies | Bloomsearch";

  main.innerHTML = `

<h1 class="pageTitle">
Movies
</h1>

<section class="contentFeed">
Loading...
</section>

`;

  const feed = document.querySelector(".contentFeed");

  const data = await getPopularMovies();

      const movies = data.results;

  feed.innerHTML = createMovieCard(movies)
}
