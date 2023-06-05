import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { search } from "../BooksAPI";
import options from "../untils/untils";
import { update } from "../BooksAPI";

const SearchBook = () => {
  const navigate = useNavigate();
  const [searchBooks, setSearchBooks] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchBooks?.trim() !== "") {
      search(searchBooks)
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchBooks]);

  const handleShelfChange = (event, book, fetchBooks) => {
    const newShelf = event.target.value;

    update(book, newShelf)
      .then((response) => {
        fetchBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDefaultShelf = (book) => {
    return book.shelf || "none";
  };

  const handleChange = (e) => {
    setSearchBooks(e.target.value);
  };
  const handleBackPage = () => {
    navigate("/");
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={handleBackPage}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchBooks}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((book) => (
              <li key={book?.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book?.imageLinks.smallThumbnail}")`,
                      }}
                      onClick={() => {
                        navigate(`/details/${book?.id}`);
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        value={getDefaultShelf(book)}
                        onChange={(event) => handleShelfChange(event, book)}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        {options.map((option) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book?.title}</div>
                  <div className="book-authors">{book?.authors.join(", ")}</div>
                </div>
              </li>
            ))
          ) : (
            <></>
          )}
        </ol>
      </div>
    </div>
  );
};
export default SearchBook;
