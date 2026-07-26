import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../api.js";

import { createMovieCard } from "../components/movieCard.js";

export async function renderHome() {
  const main = document.querySelector(".mainContent");

  main.innerHTML = `
    <h1 class="pageTitle">
      Discover
    </h1>

    <p class="mutedText">
      Find your next movie or TV show.
    </p>

    <section class="homeSection">
      <h2>🔥 Trending</h2>

      <div
        class="contentFeed"
        id="trendingFeed"
      >
        Loading...
      </div>
    </section>

    <section class="homeSection">
      <h2>🎬 Popular Movies</h2>

      <div
        class="contentFeed"
        id="popularFeed"
      >
        Loading...
      </div>
    </section>

    <section class="homeSection">
      <h2>⭐ Top Rated</h2>

      <div
        class="contentFeed"
        id="topRatedFeed"
      >
        Loading...
      </div>
    </section>
  `;

  await Promise.all([
    renderSection("#trendingFeed", getTrendingMovies),
    renderSection("#popularFeed", getPopularMovies),
    renderSection("#topRatedFeed", getTopRatedMovies),
  ]);
}

async function renderSection(feedSelector, request) {
  const feed = document.querySelector(feedSelector);

  try {
    const data = await request();

    if (!data.results?.length) {
      feed.innerHTML = `
        <p class="mutedText">
          No results found.
        </p>
      `;
      return;
    }

    feed.innerHTML = createMovieCard(data.results.slice(0, 10));
  } catch (error) {
    console.error(error);

    feed.innerHTML = `
      <p class="mutedText">
        Failed to load this section.
      </p>
    `;
  }
}
