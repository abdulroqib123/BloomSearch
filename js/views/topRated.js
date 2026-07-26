import { getTopRatedMovies } from "../api.js";
import { createMovieCard } from "../components/movieCard.js";

export async function renderTopRated() {
  const main = document.querySelector(".mainContent");

  main.innerHTML = `

<h1>
Top Rated
</h1>

<section class="contentFeed">
Loading...
</section>

`;

  const feed = document.querySelector(".contentFeed");

  const data = await getTopRatedMovies();

        const movies = data.results;
  
    feed.innerHTML = createMovieCard(movies)
}
