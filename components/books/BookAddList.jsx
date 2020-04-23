import BookAddPreview from './BookAddPreview.jsx';

const BookAddList = ({ books }) => {
  return (
    <React.Fragment>
      {books.map((book) => (
        <BookAddPreview book={book} key={book.id} />
      ))}
    </React.Fragment>
  );
};

export default BookAddList;
