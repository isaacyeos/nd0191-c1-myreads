import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import ListBooks from "./ListBooks";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log(res);
      setBooks(res);
    };

    getBooks();
  }, []);  

  const handleChangeShelf = (book, shelf) => {
    // console.log(book);
    const booksNew = books.map(b => {
      if (b.id === book.id)
        b.shelf = shelf;
      return b;
    })
    setBooks(booksNew);
    const updateBook = async () => {
      const res = await BooksAPI.update(book, shelf);
      console.log(res);
    };
    updateBook();
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <ListBooks books={books} onChangeShelf={handleChangeShelf} />
      ) : (
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
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
