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
    card.className = "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300";
    
    const isFav = isFavorite(book.key);
    
    card.innerHTML = `
      <div class="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        ${book.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title}" class="h-full w-full object-cover">` : '<span class="text-gray-500">No Cover</span>'}
      </div>
      <div class="p-4">
        <h4 class="font-semibold text-lg mb-1 line-clamp-2">${book.title}</h4>
        <p class="text-sm text-gray-600 mb-3">${book.author_name?.[0] || "Unknown Author"}</p>
        <button class="w-full ${isFav ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded transition" data-id="${book.key}">
          ${isFav ? '✓ In Favorites' : 'Add to Favorites'}
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
        btn.className = "w-full bg-gray-400 text-white py-2 rounded transition";
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

showLoading();
fetchBooks("popular").then(books => displayBooks(books));
