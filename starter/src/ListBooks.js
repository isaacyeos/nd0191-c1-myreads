import Book from "./Book";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

const ListBooks = ({books, onChangeShelf}) => {
    const [query, setQuery] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);

    const updateQuery = (query) => {
        setQuery(query);
        const searchBooks = async () => {
            const res = await BooksAPI.search(query);
            console.log(res);
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
                console.log(res2);
                setSearchedBooks(res2);
            }
          };

        if (query.length === 0)
            setSearchedBooks([]);
        else searchBooks();
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