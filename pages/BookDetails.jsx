import bookService from '../services/bookService.js';
import ReviewList from '../components/books/reviews/ReviewList.jsx';
import ReviewRate from '../components/books/reviews/ReviewRate.jsx';

export default class BookDetails extends React.Component {
  state = {
    book: null,
    updatePage: false,
  };

  componentDidMount() {
    const id = this.props.match.params.bookId;
    bookService.getById(id).then((book) => this.setState({ book }));
  }

  getBookRating = () => {
    const { reviews } = this.state.book;
    if (reviews === undefined) return 0;
    if (reviews.length > 0) {
      let count = 0;
      for (let i = 0; i < reviews.length; i++) {
        count += +reviews[i].rate;
      }
      const avg = count / reviews.length;
      let res = (avg * 100) / 5;
      return res;
    } else return 0;
  };

  getCurrencyIcon = () => {
    switch (this.state.book.listPrice.currencyCode) {
      case 'USD':
        return 'dollar-sign';
      case 'EUR':
        return 'euro-sign';
      default:
        return 'shekel-sign';
    }
  };

  getLanguageString = () => {
    switch (this.state.book.language.toUpperCase()) {
      case 'EN':
        return 'English';
      case 'SP':
        return 'Spanish';
      default:
        return 'Hebrew';
    }
  };

  getPageCountDescription = () => {
    const pagesCount = this.state.book.pageCount;
    switch (pagesCount) {
      case pagesCount < 100:
        return 'Light Reading';
      case pagesCount > 200 && pagesCount < 500:
        return 'Decent Reading';
      case pagesCount > 500:
        return 'Long Reading';
      default:
        return;
    }
  };

  getPriceClass = () => {
    return this.state.book.listPrice['amount'] > 150 ? 'danger' : 'success';
  };

  onRemoveBook = () => {
    bookService
      .remove(this.state.book.id)
      .then(() => {
        console.log('Book Removed');
        this.props.history.push('/book');
      })
      .catch((err) => console.error(err));
  };

  onRemoveReview = (reviewId) => {
    bookService.removeReview(this.state.book, reviewId);
    this.onRenderUpdatedPage();
  };

  onRenderUpdatedPage = () => {
    bookService.save(this.state.book);
    this.setState((prevState) => ({ updatePage: !prevState.updatePage }));
  };

  render() {
    const { book } = this.state;
    const Loading = <p>Loading...</p>;
    return !book ? (
      Loading
    ) : (
      <div className='container'>
        <div className='grid-1'>
          <div className='card grid-2'>
            <div className='text-center details-left'>
              <img
                src={book.thumbnail}
                alt='Book-Thumbnil'
                className='book-img-details'
              />
            </div>
            <div>
              <h2 className='text-left'>
                {book.title.charAt(0).toUpperCase() + book.title.slice(1)}{' '}
                <span className='book-subtitle-detals'>- {book.subtitle}</span>
              </h2>
              <h2 className='text-left text-danger book-categories-details'>
                <ReviewRate rate={this.getBookRating()} />
                <span className='text-grey'>
                  {' '}
                  {parseInt(this.getBookRating() * 5) / 100}/5
                </span>{' '}
                {book.reviews && (
                  <span className='text-grey text-small'>
                    ({book.reviews.length} reviews)
                  </span>
                )}
              </h2>
              <h3 className='text-grey text-left'>{book.description}</h3>
              <hr />
              <div>
                <strong>Category: {book.categories.toString()}</strong>{' '}
                <span className='page-count'>
                  {this.getPageCountDescription()}
                </span>{' '}
              </div>
              <div>
                <strong>Writting By: {book.authors.toString()}</strong>{' '}
              </div>
              <div>
                <strong>Published Year: {book.publishedDate}</strong>{' '}
              </div>
              <div>
                <strong>Language: {this.getLanguageString()}</strong>{' '}
              </div>
              <span
                className={`badge badge-${this.getPriceClass()} float-right`}
                style={{ fontSize: '18px' }}
              >
                Price: {book.listPrice.amount}{' '}
                <i className={`fas fa-${this.getCurrencyIcon()}`}></i>
              </span>
              {book.listPrice.isOnSale ? (
                <h3 className='badge badge-primary float-right'>ON SALE</h3>
              ) : (
                <h3 className='badge badge-danger float-right'>NOT FOR SALE</h3>
              )}
            </div>
          </div>
        </div>
        <ReviewList
          reviews={book.reviews}
          book={book}
          onRenderUpdatedPage={this.onRenderUpdatedPage}
          onRemoveReview={this.onRemoveReview}
        />
      </div>
    );
  }
}
