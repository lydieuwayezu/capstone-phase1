const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => menu.classList.toggle("hidden"));
}
