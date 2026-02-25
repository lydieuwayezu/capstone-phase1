export async function fetchBooks(query) {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`);
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
