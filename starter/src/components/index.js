import ListBook from "./ListBooks";
import Header from "./Header";

const BookContent = ({ item, listBooks }) => {
  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{item}</h2>
          {item === "Currently Reading" && (
            <ListBook
              nameShelf={item}
              //   listBooksCurrentlyReading={currentlyReading}
              listBooks={listBooks}
              //   handelSubmit={handelSubmit}
            />
          )}
          {item === "Want to Read" && (
            <ListBook
              nameShelf={item}
              //   listBooksCurrentlyReading={wantToRead}
              listBooks={listBooks}
              //   handelSubmit={handelSubmit}
            />
          )}
          {item === "Read" && (
            <ListBook
              nameShelf={item}
              //   listBooksCurrentlyReading={read}
              listBooks={listBooks}
              //   handelSubmit={handelSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default BookContent;
