import { useEffect, useState } from "react";
import { getAll } from "../BooksAPI";
import Header from "./Header";
import { useNavigate } from "react-router";
import RenderBooksByShelf from "../untils/RenderBookUntils";

const ListBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const booksData = await getAll();
      setBooks(booksData);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const booksData = await getAll();
  //       setBooks(booksData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchBooks();
  // }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  // useEffect(() => {
  //   setBooks(books);
  // }, [books]);

  const handleChangePageSearch = () => {
    navigate("/search");
  };

  return (
    <>
      <Header />
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                {RenderBooksByShelf(books, "currentlyReading", fetchBooks)}
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                {RenderBooksByShelf(books, "wantToRead", fetchBooks)}
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                {RenderBooksByShelf(books, "read", fetchBooks)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={handleChangePageSearch}>Add a book</a>
      </div>
    </>
  );
};

export default ListBook;
