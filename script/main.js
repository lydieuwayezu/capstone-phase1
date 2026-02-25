import { fetchBooks } from "./fetchbooks.js";
import { addToFavorites, isFavorite } from "./favorites.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookGrid = document.getElementById("book-grid");
const loading = document.getElementById("loading");
const noResults = document.getElementById("no-results");
const gridTitle = document.getElementById("grid-title");

function showLoading() {
  loading.classList.remove("hidden");
  noResults.classList.add("hidden");
  bookGrid.innerHTML = "";
}

function hideLoading() {
  loading.classList.add("hidden");
}

function displayBooks(books, searchQuery = null) {
  hideLoading();
  bookGrid.innerHTML = "";
  
  if (searchQuery) {
    gridTitle.textContent = `Search Results for "${searchQuery}"`;
  } else {
    gridTitle.textContent = "Featured Books";
  }

  if (books.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 book-card fade-in";
    
    const isFav = isFavorite(book.key);
    
    card.innerHTML = `
      <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
        ${book.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title}" class="h-full w-full object-cover hover:scale-110 transition-transform duration-300">` : '<span class="text-gray-500 text-4xl">📖</span>'}
      </div>
      <div class="p-4">
        <h4 class="font-semibold text-lg mb-1 line-clamp-2">${book.title}</h4>
        <p class="text-sm text-gray-600 mb-3">${book.author_name?.[0] || "Unknown Author"}</p>
        <button class="w-full ${isFav ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white py-2 rounded transition-all hover:shadow-lg" data-id="${book.key}">
          ${isFav ? '✓ In Favorites' : '❤️ Add to Favorites'}
        </button>
      </div>
    `;
    
    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      if (isFavorite(book.key)) return;
      
      const success = addToFavorites({ 
        id: book.key, 
        title: book.title, 
        author: book.author_name?.[0] || "Unknown Author", 
        cover: book.cover_i 
      });
      
      if (success) {
        btn.textContent = "✓ In Favorites";
        btn.className = "w-full bg-gray-400 text-white py-2 rounded transition-all";
      }
    });
    
    bookGrid.appendChild(card);
  });
}

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;
  
  showLoading();
  const books = await fetchBooks(query);
  displayBooks(books, query);
}

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => menu.classList.toggle("hidden"));
}

showLoading();
fetchBooks("popular").then(books => displayBooks(books));
