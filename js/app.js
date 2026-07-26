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