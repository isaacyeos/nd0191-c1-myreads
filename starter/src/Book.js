import { useState, useEffect } from "react";

// reference: https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option

const Book = ({ book, onChangeShelf }) => {
    const [shelf, setShelf] = useState(''); // set shelf as a state here so that it updates when we change the select field in the search page

    useEffect(() => {
        if ('shelf' in book) 
            setShelf(book.shelf);
        else
            setShelf('none');
      }, [book]); // book needs to be a dependency so that the code in useEffect will run and hence the shelf state will be updated when book changes. This is so that the select field that is checked will update when the query changes

    const handleOnChange = (e) => {
        // onChangeShelf({...book, "shelf": e.target.value});
        setShelf(e.target.value);
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
                        backgroundImage: book.imageLinks ? 'url("' + book.imageLinks.thumbnail + '")' : 'none',
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={handleOnChange}>
                        <option value="none" disabled>
                            {shelf === "none" ? 'Add to...' : 'Move to...'}
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        {shelf !== 'none' && <option value="none">None</option>}
                        </select>
                    </div>
                </div>
                <div className="book-title">
                {'title' in book && book.title}
                </div>
                {'authors' in book && <div className="book-authors">{book.authors.join("")}</div>}
            </div>
        </li>

    )
};

export default Book;