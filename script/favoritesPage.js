

const STORAGE_KEY = "favoriteBooks";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}


import { removeFromFavorites } from "./favorites.js";






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
    card.className = "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300";
    card.innerHTML = `
      <div class="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        ${book.cover ? `<img src="https://covers.openlibrary.org/b/id/${book.cover}-M.jpg" alt="${book.title}" class="h-full w-full object-cover">` : '<span class="text-gray-500">No Cover</span>'}
      </div>
      <div class="p-4">
        <h4 class="font-semibold text-lg mb-1 line-clamp-2">${book.title}</h4>
        <p class="text-sm text-gray-600 mb-3">${book.author}</p>
        <button class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition" data-id="${book.id}">
          Remove
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

displayFavorites();

