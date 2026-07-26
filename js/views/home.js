export function renderHome() {

  const main =
    document.querySelector(".mainContent");


  main.innerHTML = `
    <h1 class="pageTitle">
      Home
    </h1>

    <p class="mutedText">
      Discover movies and TV shows
    </p>

    <section class="contentFeed">
      <p>
        Home view loaded.
      </p>
    </section>
  `;

}