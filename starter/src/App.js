import { useState, useEffect } from "react";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import { getAll, update } from "./BooksAPI";

import HomePage from "./pages/HomePage";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const moveBook = (book, shelf) => {
    update(book, shelf).then(() => {
      book.shelf = shelf;
      setBooks(books.filter((b) => b.id !== book.id).concat(book));
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<HomePage books={books} moveBook={moveBook} />}
        />
        <Route
          path="/search"
          element={<SearchPage booksOnShelf={books} moveBook={moveBook} />}
        />
        <Route
          path="*"
          element={
            <div>
              <h3>404 Page not found!</h3>

              <Link to={"/"}>Back home</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
