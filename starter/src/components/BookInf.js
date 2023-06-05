import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { get } from "../BooksAPI";
import { useParams } from "react-router-dom";
import { Row } from "antd";
import Flex from "./Flex.js";

const BookInf = () => {
  const [book, setBook] = useState({
    id: "",
    title: "",
    description: "",
    author: "",
    image: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();
  const fetchBook = async () => {
    const getInfBooks = await get(id);

    const dataPush = {
      id: getInfBooks.id || "",
      title: getInfBooks.title || "",
      description: getInfBooks.description || "",
      author:
        getInfBooks.authors && getInfBooks.authors.length > 0
          ? getInfBooks.authors[0]
          : "",
      image: getInfBooks.imageLinks.thumbnail || "",
      previewLink: getInfBooks.previewLink || "",
    };
    setBook(dataPush);
  };
  useEffect(() => {
    fetchBook();
  }, []);

  const handleBackPage = () => {
    navigate("/");
  };

  if (!book) {
    return <div>Loading...</div>; // Add a loading state while fetching the book details
  }

  return (
    <div className="search-books">
      <div className="list-books">
        <Row>
          <Flex className="list-books-title">
            <a className="close-search" onClick={handleBackPage}>
              Back HomePage
            </a>
            <h1>Book Details</h1>
            {/* <div className="list-books-title"></div> */}
          </Flex>
        </Row>
        <div className="list-books-content">
          <div
            className="d-flex"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <img id="book-image" src={book?.image} alt="Book Cover" />
          </div>
          <div className="info">
            <p>
              <strong>Title: </strong>{" "}
              <span id="book-title">{book?.title}</span>
            </p>
            <p>
              <strong>Author: </strong>
              <span id="book-author">{book?.author}</span>
            </p>
            <p>
              <strong>Description: </strong>
              <span id="book-description">{book?.description}</span>
            </p>
            <p id="book-description">
              <strong> id: </strong>{" "}
              <span id="book-description">{book?.id}</span>
            </p>
            <p id="book-description">
              <strong> Link read book: </strong>
              <a id="book-previewLink" href={book?.previewLink}>
                Click Read Books
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookInf;
