import Book from "./Book";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

// reference for debouncing: https://blog.logrocket.com/how-and-when-to-debounce-or-throttle-in-react/
// filterTimeout needs to be placed outside of the ListBooks component. If it is placed inside, then a new filterTimeout variable will be created each time ListBooks is re-rendered and the timeout will not be cleared
let filterTimeout; 

const ListBooks = ({books, onChangeShelf}) => {
    const [query, setQuery] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);

    const updateQuery = (query) => {
        clearTimeout(filterTimeout);
        setQuery(query);
        const searchBooks = async () => {
            if (query.length === 0)
            {
              console.log("searchBooks empty"); // for debugging debouncing issue
              setSearchedBooks([]);
            }
            else
            {
              const res = await BooksAPI.search(query);
              if (res.error)
                  setSearchedBooks([]);
              else
              {
                  const res2 = res.map(searchedBook => {
                      books.forEach(book => {
                          if (book.id === searchedBook.id)
                              searchedBook.shelf = book.shelf;
                      });
                      return searchedBook;
                  });
                  console.log("searchBooks async " + query); // for debugging debouncing issue
                  setSearchedBooks(res2);
              }
            }

          };

        // for debouncing
        filterTimeout = setTimeout(() => {
          searchBooks();
        }, 300);
    };

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close
            </Link>
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
                {searchedBooks.map((book, index) => (
                <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                ))}
            </ol>
          </div>
        </div>
    )
}

export default ListBooks;