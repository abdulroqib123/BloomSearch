const toggleSidebar = document.querySelector(".toggleSidebar");
const sidebar = document.querySelector(".sidebar");
const navBtns = document.querySelectorAll(".navBtn");


export function handleSidebarToggle() {
  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("slideIn");
  });
  
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sidebar.classList.toggle("slideIn");
    })
  })
}