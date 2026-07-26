import { getTrendingMovies } from "../api.js";
import { createMovieCard } from "../components/movieCard.js";

export async function renderTrending() {
  const main = document.querySelector(".mainContent");

  main.innerHTML = `
    <h1 class="pageTitle">
      Trending
    </h1>

    
    <section class="contentFeed">
    <p class="mutedText">
      Loading trending movies...
    </p>
    </section>
  `;

  const feed = document.querySelector(".contentFeed");

  try {
    const data = await getTrendingMovies();

    const movies = data.results;

    feed.innerHTML = createMovieCard(movies)

  } catch (error) {
    console.error(error);

    feed.innerHTML = `
      <p>
        Failed loading trending movies.
      </p>
    `;
  }
}
