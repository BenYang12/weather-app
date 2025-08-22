import "./style.css";

//Reusable dropdown initializer
function initDropdowns(selector) {
  const dropdowns = document.querySelectorAll(selector);

  dropdowns.forEach((dropdown) => {
    const toggleBtn = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    //use .toggle(), if .visible exists, remove it; otherwise add it
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("visible");
    });
  });
}

//wait for DOM content before initializing
document.addEventListener("DOMContentLoaded", () => {
  initDropdowns(".dropdown");
});
