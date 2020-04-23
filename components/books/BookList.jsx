import BookPreview from './BookPreview.jsx';

const BookList = ({ books }) => {
  return (
    <React.Fragment>
      {books.map((book) => (
        <BookPreview key={book.id} book={book} />
      ))}
    </React.Fragment>
  );
};

export default BookList;
