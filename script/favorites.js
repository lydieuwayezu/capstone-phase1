
const STORAGE_KEY = "favoriteBooks";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}



export function addToFavorites(book) {
  const favorites = getFavorites();
  const exists = favorites.find(item => item.id === book.id);
  if (exists) return false;
  
  favorites.push(book);
  saveFavorites(favorites);
  return true;
}

export function removeFromFavorites(bookId) {
  let favorites = getFavorites();
  favorites = favorites.filter(book => book.id !== bookId);
  saveFavorites(favorites);
}

export function isFavorite(bookId) {
  const favorites = getFavorites();
  return favorites.some(book => book.id === bookId);
}


