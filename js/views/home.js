import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../api.js";

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

  await Promise.all([loadTrending(), loadPopular(), loadTopRated()]);
}

async function loadTrending() {
  const feed = document.querySelector("#trendingFeed");

  try {
    const data = await getTrendingMovies();

    feed.innerHTML = data.results.slice(0, 10).map(movieCard).join("");
  } catch {
    feed.innerHTML = "<p>Unable to load trending movies.</p>";
  }
}

async function loadPopular() {
  const feed = document.querySelector("#popularFeed");

  try {
    const data = await getPopularMovies();

    feed.innerHTML = data.results.slice(0, 10).map(movieCard).join("");
  } catch {
    feed.innerHTML = "<p>Unable to load popular movies.</p>";
  }
}

async function loadTopRated() {
  const feed = document.querySelector("#topRatedFeed");

  try {
    const data = await getTopRatedMovies();

    feed.innerHTML = data.results.slice(0, 10).map(movieCard).join("");
  } catch {
    feed.innerHTML = "<p>Unable to load top rated movies.</p>";
  }
}

function movieCard(movie) {
  const title = movie.title || movie.name;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";

  return `
    <article class="movieCard">

      <img
        class="cardImg"
        src="${poster}"
        alt="${title}"
      >

      <div class="movieCardContent">

        <h3>
          ${title}
        </h3>

        <p>
          ⭐ ${movie.vote_average.toFixed(1)}
          • ${year}
        </p>

        <button
          class="viewDetails"
          data-id="${movie.id}"
          data-type="${movie.media_type || "movie"}"
        >
          View Details
        </button>

      </div>

    </article>
  `;
}
