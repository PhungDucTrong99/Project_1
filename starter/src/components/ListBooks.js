import { useEffect, useState } from "react";
import { getAll } from "../BooksAPI";
import Header from "./Header";
import { useNavigate } from "react-router";
import Shelf from "./Shelf";

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

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChangePageSearch = () => {
    navigate("/search");
  };

  return (
    <>
      <Header />
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <Shelf
              books={books}
              shelfTitle="Currently Reading"
              shelfType="currentlyReading"
              fetchBooks={fetchBooks}
            />

            <Shelf
              books={books}
              shelfTitle="Want to Read"
              shelfType="wantToRead"
              fetchBooks={fetchBooks}
            />

            <Shelf
              books={books}
              shelfTitle="Read"
              shelfType="read"
              fetchBooks={fetchBooks}
            />
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
