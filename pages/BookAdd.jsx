import bookService from '../services/bookService.js';
import Spinner from '../components/layout/Spinner.jsx';
import BookAddList from '../components/books/BookAddList.jsx';

export default class BookAdd extends React.Component {
  state = {
    books: [],
    loading: false,
    bookName: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.loadBooks();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  loadBooks = () => {
    if (this.state.bookName === '') return;
    var books = [];
    bookService.getBooksFromAPI(this.state.bookName, books);
    this.setState({ books });
  };

  onChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(
      (prevState) => ({ ...prevState.bookName, [field]: value }),
      () => {
        this.loadBooks();
      }
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ bookName: e.target.value });
  };

  render() {
    const { books, loading, bookName } = this.state;
    return (
      <div className='container'>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <form onSubmit={this.onSubmit}>
              <input
                name='bookName'
                type='text'
                placeholder='Search A Book...'
                value={bookName || ''}
                onChange={this.onChange}
              />
              <button className='btn btn-primary btn-block'>Search</button>
            </form>
            {this.state.bookName === '' ? (
              <h1>Search From Google Books API</h1>
            ) : (
              <table className='table grid-1'>
                <thead>
                  <tr>
                    <th className='p'>Language</th>
                    <th>Title</th>
                    <th>Authors</th>
                    <th>Year</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <BookAddList books={books} />
                </tbody>
              </table>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
