import { getFavorites, removeFromFavorites } from "./favorites.js";

const favoritesContainer = document.getElementById("favorites-container");
const emptyMessage = document.getElementById("empty-message");

function displayFavorites() {
  const favorites = getFavorites();
  
  if (favorites.length === 0) {
    emptyMessage.classList.remove("hidden");
    favoritesContainer.innerHTML = "";
    return;
  }
  
  emptyMessage.classList.add("hidden");
  favoritesContainer.innerHTML = "";
  
  favorites.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 book-card fade-in";
    card.innerHTML = `
      <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
        ${book.cover ? `<img src="https://covers.openlibrary.org/b/id/${book.cover}-M.jpg" alt="${book.title}" class="h-full w-full object-cover hover:scale-110 transition-transform duration-300">` : '<span class="text-gray-500 text-4xl">📖</span>'}
      </div>
      <div class="p-4">
        <h4 class="font-semibold text-lg mb-1 line-clamp-2">${book.title}</h4>
        <p class="text-sm text-gray-600 mb-3">${book.author}</p>
        <button class="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded hover:from-red-700 hover:to-pink-700 transition-all hover:shadow-lg" data-id="${book.id}">
          🗑️ Remove
        </button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      removeFromFavorites(book.id);
      displayFavorites();
    });
    favoritesContainer.appendChild(card);
  });
}

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => menu.classList.toggle("hidden"));
}

displayFavorites();
