import Spinner from '../components/layout/Spinner.jsx';
import BookAddList from '../components/books/BookAddList.jsx';

export default class BookAdd extends React.Component {
  state = {
    books: [],
    loading: false,
    bookName: '',
  };

  componentDidMount() {
    this.loadBooks();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  loadBooks = () => {
    if (this.state.bookName === '') return;
    var books = [];
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.state.bookName}`
      )
      .then((res) => {
        res.data.items.forEach((item) => {
          let book = {
            id: item.id,
            title: item.volumeInfo.title,
            subtitle: item.volumeInfo.subtitle,
            authors: item.volumeInfo.authors,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
            pageCount: item.volumeInfo.pageCount,
            categories: item.volumeInfo.categories,
            thumbnail: item.volumeInfo.imageLinks.thumbnail,
            language: item.volumeInfo.language,
            listPrice: {
              amount:
                item.saleInfo.saleability === 'FOR_SALE'
                  ? item.saleInfo.listPrice.amount
                  : 0,
              currencyCode:
                item.saleInfo.saleability === 'FOR_SALE'
                  ? item.saleInfo.listPrice.currencyCode
                  : 'NONE',
              isOnSale: item.saleInfo.saleability === 'FOR_SALE' ? true : false,
            },
          };
          books.push(book);
        });
      });
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
