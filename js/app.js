import { handleSidebarToggle } from "./utils/toggle.js";
import { navigate } from "./router.js";

handleSidebarToggle();

const buttons = document.querySelectorAll(".navBtn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    navigate(button.dataset.nav);
  });
});

navigate("home");


//VIEW DETAILS ROUTER
document.addEventListener("click", (event) => {
  const button = event.target.closest(".viewDetails");

  if (!button) return;

  const card = button.closest(".movieCard");

  navigate("details", {
    id: card.dataset.id,
    type: card.dataset.type,
  });
});

//BROWSER BACK/FORWARD
window.addEventListener("popstate", () => {
  const params = new URLSearchParams(location.search);

  navigate(params.get("view") || "home", {
    id: params.get("id"),
    type: params.get("type"),
  });
});