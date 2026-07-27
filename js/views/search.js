import { getSearchResults } from "../api.js";
import { createMovieCard } from "../components/movieCard.js";

export function renderSearch() {
  const main = document.querySelector(".mainContent");
document.title = "Search | Bloomsearch";

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

     const movies = data.results;

      feed.innerHTML = createMovieCard(movies);
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

