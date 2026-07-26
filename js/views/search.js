import { getSearchResults } from "../api.js";

export function renderSearch() {
  const main = document.querySelector(".mainContent");

  main.innerHTML = `

    <h1 class="pageTitle">
      Search
    </h1>


    <div class="searchBar">

      <input
        id="searchInput"
        type="search"
        placeholder="Search movies and TV shows..."
      >

      <button id="searchBtn">
        Search
      </button>

    </div>


    <section class="contentFeed">
    </section>

  `;

  const input = document.querySelector("#searchInput");

  const button = document.querySelector("#searchBtn");

  const feed = document.querySelector(".contentFeed");

  async function search() {
    const query = input.value.trim();

    if (!query) {
      return;
    }

    feed.innerHTML = `
      <p>
        Searching...
      </p>
    `;

    try {
      const data = await getSearchResults(query);

      if (!data.results.length) {
        feed.innerHTML = `
          <p>
            No results found.
          </p>
        `;

        return;
      }

      feed.innerHTML = data.results.map(movieCard).join("");
    } catch (error) {
      console.error(error);

      feed.innerHTML = `
        <p>
          Search failed.
        </p>
      `;
    }
  }

  button.addEventListener("click", search);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      search();
    }
  });
}

function movieCard(movie) {
  const title = movie.title || movie.name;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  return `

    <article class="movieCard">

      <img
        class="cardImg"
        src="${poster}"
        alt="${title}"
      >


      <div class="movieCardContent">

        <h2>
          ${title}
        </h2>


        <p>
          ⭐ ${movie.vote_average?.toFixed(1) || "N/A"}
        </p>


        <p>
          ${movie.overview || "No description available."}
        </p>


        <button
          class="viewDetails"
          data-id="${movie.id}"
        >
          View Details
        </button>

      </div>

    </article>

  `;
}
