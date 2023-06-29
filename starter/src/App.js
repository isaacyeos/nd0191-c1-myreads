import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import ListBooks from "./ListBooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log(res);
      console.log("getAll() called");
      setBooks(res);
    };

    getBooks();
  }, []);  

  const handleChangeShelf = (book, shelf) => {
    // https://javascript.info/async-await
    const updateBook = async () => {
      const res = await BooksAPI.update(book, shelf);
      console.log(res);
      console.log("book " + book.id + " updated");

      // now update state - the updateBook function suspends execution and waits for BooksAPI.update to be done before continuing
      book.shelf = shelf;
      const booksNew = books.filter(b => b.id !== book.id).concat(book);
      setBooks(booksNew);
      console.log(booksNew);
    };
    updateBook();
  };

  return (
    <Routes>
      <Route
        exact path="/" element={
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf shelf="currentlyReading" title="Currently Reading" books={books} onChangeShelf={handleChangeShelf} />
            <Bookshelf shelf="wantToRead" title="Want to Read" books={books} onChangeShelf={handleChangeShelf} />
            <Bookshelf shelf="read" title="Read" books={books} onChangeShelf={handleChangeShelf} />
          </div>
          <div className="open-search">
            <Link to="/search" className="add-contact">
              Add a book
            </Link>
          </div>
        </div>
        }
      />
      <Route
        path="/search"
        element={
          <ListBooks books={books} onChangeShelf={handleChangeShelf} />
        }
      />
    </Routes>
  );
}

export default App;
