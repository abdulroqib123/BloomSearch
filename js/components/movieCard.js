export function createMovieCard(movies) {
  return movies
    .map((movie) => {
      const title = movie.title || movie.name;

      const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : movie.first_air_date
          ? movie.first_air_date.slice(0, 4)
          : "N/A";

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

            <h2>${title}</h2>

            <p>${movie.overview || "No description available."}</p>

            <div class="cardMeta">
              <span>⭐ ${movie.vote_average?.toFixed(1) || "N/A"}</span>
              <span>${year}</span>
            </div>

            <button
              class="viewDetails btn"
              data-id="${movie.id}"
              data-type="${movie.media_type || "movie"}"
            >
              View Details
            </button>

          </div>

        </article>
      `;
    })
    .join("");
}
