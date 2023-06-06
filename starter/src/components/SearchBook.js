import { useNavigate } from "react-router";
import { React, useState, useEffect } from "react";
import { getAll, search, update } from "../BooksAPI";
import Book from "./Books";
import options from "../untils/untils";

const SearchBook = () => {
  const navigate = useNavigate();
  const [searchBooks, setSearchBooks] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchBooks?.trim() !== "") {
      search(searchBooks)
        .then((data) => {
          const searchResultsWithShelf = data.map((book) => {
            const matchingBook = books.find((b) => b.id === book.id);
            if (matchingBook) {
              return { ...book, shelf: matchingBook.shelf };
            } else {
              return book;
            }
          });
          setSearchResults(searchResultsWithShelf);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchBooks]);

  const handleShelfChange = (event, book) => {
    const newShelf = event.target.value;

    update(book, newShelf)
      .then(() => {
        // Handle successful update
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSearchBooks(e.target.value);
  };

  const handleBackPage = () => {
    navigate("/");
  };

  // Get the books from the main page
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  handleShelfChange={handleShelfChange}
                  options={options}
                />
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
