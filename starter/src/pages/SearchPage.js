import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, search } from "../BooksAPI";
import Book from "../components/Book";

const SearchPage = ({ booksOnShelf, moveBook }) => {
  const [query, setQuery] = useState("");

  const [books, setBooks] = useState([]);

  async function fetchData() {
    try {
      if (query === "") {
        setBooks([]);
        return;
      }
      const searchResults = await search(query, 30);

      const newBooks = [];
      if (searchResults && Array.isArray(searchResults)) {
        for (let i in searchResults) {
          const filteredBooks = booksOnShelf.filter(
            (x) => x.id === searchResults[i].id
          );
          if (filteredBooks.length > 0) {
            newBooks.push(filteredBooks[0]);
          } else {
            newBooks.push(searchResults[i]);
          }
        }
      }
      setBooks(newBooks);
    } catch (err) {
      console.log(err);
      setBooks([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} moveBook={moveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
