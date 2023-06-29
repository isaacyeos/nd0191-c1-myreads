import Book from "./Book";

const Bookshelf = ({shelf, title, books, onChangeShelf}) => {
    // console.log("books updated");
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book => book.shelf === shelf).map((book, index) => (
                    <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Bookshelf;