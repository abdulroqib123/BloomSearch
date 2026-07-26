import { getTv } from "../api.js";
import { createMovieCard } from "../components/movieCard.js";

export async function renderTV() {
  document.querySelector(".mainContent").innerHTML = `

<h1>
TV Shows
</h1>

<section class="contentFeed">
</section>

`;

const feed = document.querySelector(".contentFeed");

  try {
    const data = await getTv();

    const movies = data.results;

    feed.innerHTML = createMovieCard(movies)

  } catch (error) {
    console.error(error);

    feed.innerHTML = `
      <p>
        Failed loading Tv shows.
      </p>
    `;
  }
}
