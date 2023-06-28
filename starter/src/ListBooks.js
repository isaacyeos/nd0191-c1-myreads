import Book from "./Book";
import { useState } from "react";

const ListBooks = ({books, onChangeShelf}) => {
    const [query, setQuery] = useState("");

    const updateQuery = (query) => {
        setQuery(query);
    };

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
            //   onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {books.filter((b) => b.title.toLowerCase().includes(query.toLowerCase())).map((book, index) => (
                <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                ))}
            </ol>
          </div>
        </div>
    )
}

export default ListBooks;