import { getMovieDetails, getTVDetails } from "../../js/api.js";

const params = new URLSearchParams(location.search);

const id = params.get("id");
const type = params.get("type") || "movie";

const container = document.querySelector("#detailsContainer");

load();

async function load() {
  try {
    const data =
      type === "tv" ? await getTVDetails(id) : await getMovieDetails(id);

    render(data);
  } catch (error) {
    console.error(error);

    container.innerHTML = "<h2>Unable to load movie.</h2>";
  }
}

function render(movie) {
  const trailer = movie.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const providers = movie["watch/providers"]?.results?.DE?.flatrate || [];

  container.innerHTML = `

<section class="hero">

<img
class="poster"
src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
>

<div class="heroInfo">

<h1>
${movie.title || movie.name}
</h1>

<p class="tagline">
${movie.tagline || ""}
</p>

<div class="facts">

<span>
⭐ ${movie.vote_average}
</span>

<span>
${movie.release_date || movie.first_air_date}
</span>

<span>
${movie.runtime || "-"} min
</span>

</div>

<div class="genres">

${movie.genres.map((g) => `<span>${g.name}</span>`).join("")}

</div>

</div>

</section>


<section>

<h2>Overview</h2>

<p>

${movie.overview}

</p>

</section>


${
  trailer
    ? `
<section>

<h2>Trailer</h2>

<iframe

width="100%"

height="500"

src="https://www.youtube.com/embed/${trailer.key}"

allowfullscreen

></iframe>

</section>
`
    : ""
}


<section>

<h2>

Where to Watch

</h2>

<div class="providers">

${
  providers.length
    ? providers
        .map(
          (provider) =>
            `

<div class="provider">

<img
src="https://image.tmdb.org/t/p/w92${provider.logo_path}"
>

<span>

${provider.provider_name}

</span>

</div>

`,
        )
        .join("")
    : "<p>No streaming information.</p>"
}

</div>

</section>


<section>

<h2>

Cast

</h2>

<div class="cast">

${movie.credits.cast
  .slice(0, 12)
  .map(
    (actor) =>
      `

<div class="actor">

<img
src="https://image.tmdb.org/t/p/w185${actor.profile_path}"
>

<p>

${actor.name}

</p>

</div>

`,
  )
  .join("")}

</div>

</section>


<section>

<h2>

Recommendations

</h2>

<div class="recommendations">

${movie.recommendations.results
  .map(
    (movie) =>
      `

<div class="recommendation">

<a
            href=?id=${movie.id}&type=${movie.media_type || "movie"}
              class="viewDetails"
              data-id="${movie.id}"
              data-type="${movie.media_type || "movie"}"
            >
<img
src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
>

<p>

${movie.title || movie.name}

</p>
</a>
</div>

`,
  )
  .join("")}

</div>

</section>

`;
}
