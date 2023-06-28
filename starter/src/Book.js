import { useState } from "react";

// reference: https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option

const Book = ({ book, onChangeShelf }) => {
    // const [shelf, setShelf] = useState("None");

    const handleOnChange = (e) => {
        // onChangeShelf({...book, "shelf": e.target.value});
        onChangeShelf(book, e.target.value);
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 174,
                        backgroundImage: 'url("' + book.imageLinks.thumbnail + '")',
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={handleOnChange}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        {book.shelf !== "none"} && <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">
                {book.title}
                </div>
                <div className="book-authors">{book.authors.join("")}</div>
            </div>
        </li>

    )
};

export default Book;