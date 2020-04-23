import bookService from '../../services/bookService.js';
import eventBus from '../../services/eventBusService.js';
export default class BookAddPreview extends React.Component {
  state = {
    bookIsAdd: false,
  };
  onAddBook = (book) => {
    console.log('Book Saved Succesfuly');
    bookService.saveBookFromAPI(book);
  };
  render() {
    const { book } = this.props;
    return (
      <tr>
        <td>{book.language}</td>
        <td>{book.title}</td>
        <td>{book.authors}</td>
        <td>{book.publishedDate}</td>
        <td>
          {!this.state.bookIsAdd && (
            <button
              className='btn btn-primary btn-sm'
              onClick={() => {
                this.setState({ bookIsAdd: true });
                eventBus.emit('show-msg', {
                  txt: 'Book Add Successfully',
                  body: 'thank you',
                });
                this.onAddBook(book);
              }}
            >
              <i className='fas fa-plus'></i>
            </button>
          )}
        </td>
      </tr>
    );
  }
}