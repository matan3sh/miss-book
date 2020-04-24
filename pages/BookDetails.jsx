import bookService from '../services/bookService.js';
import ReviewList from '../components/books/reviews/ReviewList.jsx';
import ReviewRate from '../components/books/reviews/ReviewRate.jsx';
import ReadMore from '../components/books/ReadMore.jsx';

const { Link } = ReactRouterDOM;

export default class BookDetails extends React.Component {
  state = {
    book: null,
    updatePage: false,
    readMore: false,
  };

  componentDidMount() {
    this.loadBook();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook();
    }
  }

  loadBook = () => {
    const id = this.props.match.params.bookId;
    bookService.getById(id).then((book) => {
      this.setState({ book });
    });
    this.prevNext = bookService.getNextPrevBooks(id);
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

  onRemoveReview = (reviewId) => {
    bookService.removeReview(this.state.book, reviewId);
    this.onRenderUpdatedPage();
  };

  onRenderUpdatedPage = () => {
    bookService.save(this.state.book);
    this.setState(({ updatePage }) => ({ updatePage: !updatePage }));
  };

  onToggleReadMore = () => {
    this.setState(({ readMore }) => ({ readMore: !readMore }));
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
                <ReviewRate rate={bookService.getBookRating(book)} />
                <span className='text-grey'>
                  {' '}
                  {parseInt(bookService.getBookRating(book) * 5) / 100}/5
                </span>{' '}
                {book.reviews && (
                  <span className='text-grey text-small'>
                    ({book.reviews.length} reviews)
                  </span>
                )}
              </h2>
              <ReadMore
                description={book.description}
                readMore={this.state.readMore}
                onToggleReadMore={this.onToggleReadMore}
              />
              <hr />
              <div>
                <strong>Category: {book.categories.join(', ')}</strong>{' '}
                <span className='page-count'>
                  {this.getPageCountDescription()}
                </span>{' '}
              </div>
              <div>
                <strong>Writting By: {book.authors.join(', ')}</strong>{' '}
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
        <div className='text-center my-1'>
          <Link to={`/book/${this.prevNext.prevId}`}>
            <button className='bottom-nav'>Prev</button>
          </Link>{' '}
          <Link to={`/book/${this.prevNext.nextId}`}>
            <button className='bottom-nav'>Next</button>
          </Link>{' '}
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
