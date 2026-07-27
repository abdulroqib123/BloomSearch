function escapeHTML(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(text = "", length = 140) {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}

export function createMovieCard(movies) {
  return movies
    .map((movie) => {
      const title = escapeHTML(movie.title || movie.name || "Untitled");

      const year =
        movie.release_date?.slice(0, 4) ||
        movie.first_air_date?.slice(0, 4) ||
        "N/A";

      const rating =
        typeof movie.vote_average === "number"
          ? movie.vote_average.toFixed(1)
          : "N/A";

      const type = movie.media_type === "tv" ? "TV Show" : "Movie";

      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "assets/images/poster-placeholder.webp";

      const overview = escapeHTML(
        truncate(movie.overview || "No description available."),
      );

      return `
        <article
          class="movieCard"
          data-id="${movie.id}"
          data-type="${movie.media_type || "movie"}"
        >

        
          <img
            class="cardImg"
            src="${poster}"
            alt="${title}"
            loading="lazy"
            onerror="this.src='assets/images/poster-placeholder.webp'"
          >

          <div class="movieCardContent">

            <h2 class="cardTitle">
              ${title}
            </h2>

            <p class="cardDescription">
              ${overview}
            </p>

            <div class="cardMeta">

              <span class="rating">
                ⭐ ${rating}
              </span>

              <span class="year">
                ${year}
              </span>

              <span class="type">
                ${type}
              </span>

            </div>

            <a
            href=/details/?id=${movie.id}&type=${movie.media_type || "movie"}
              class="viewDetails btn"
              data-id="${movie.id}"
              data-type="${movie.media_type || "movie"}"
            >
              View Details
            </a>

          </div>

        </article>
      `;
    })
    .join("");

}


export function createHomeMovieCard(movies) {
  return movies
    .map((movie) => {
      const title = escapeHTML(movie.title || movie.name || "Untitled");

      const year =
        movie.release_date?.slice(0, 4) ||
        movie.first_air_date?.slice(0, 4) ||
        "N/A";

      const rating =
        typeof movie.vote_average === "number"
          ? movie.vote_average.toFixed(1)
          : "N/A";

      const type = movie.media_type === "tv" ? "TV Show" : "Movie";

      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "assets/images/poster-placeholder.webp";

      const overview = escapeHTML(
        truncate(movie.overview || "No description available."),
      );

      return `
        <article
          class="movieCard"
          data-id="${movie.id}"
          data-type="${movie.media_type || "movie"}"
        >

        
        <div class="movieCardContent">
          <img
            class="cardImg"
            src="${poster}"
            alt="${title}"
            loading="lazy"
            onerror="this.src='assets/images/poster-placeholder.webp'"
          >


            <div class="cardMeta">

              <span class="rating">
                ⭐ ${rating}
              </span>

              <span class="year">
                ${year}
              </span>

              <span class="type">
                ${type}
              </span>

            </div>
            </div>

            <a
            href=/details/?id=${movie.id}&type=${movie.media_type || "movie"}
              class="viewDetails btn"
              data-id="${movie.id}"
              data-type="${movie.media_type || "movie"}"
            >
              View Details
            </a>


        </article>
      `;
    })
    .join("");

}