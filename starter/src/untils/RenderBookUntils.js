/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router";
import options from "./untils";
import { update } from "../BooksAPI";

const RenderBooksByShelf = (books, shelf, fetchBooks) => {
  const navigate = useNavigate();

  const handleShelfChange = (event, book) => {
    const newShelf = event.target.value;

    update(book, newShelf)
      .then((response) => {
        fetchBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ol className="books-grid">
      {books
        .filter((book) => book?.shelf === shelf)
        .map((book) => (
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
                    value={book?.shelf}
                    onChange={(event) => handleShelfChange(event, book)}
                  >
                    <option value="none" disabled>
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
              <div className="book-authors">{book.authors.join(", ")}</div>
            </div>
          </li>
        ))}
    </ol>
  );
};

export default RenderBooksByShelf;
