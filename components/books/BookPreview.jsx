const { Link } = ReactRouterDOM;

import ReviewRate from '../books/reviews/ReviewRate.jsx';

const BookPreview = ({ book }) => {
  const { title, categories, listPrice, thumbnail } = book;

  const getBookRating = () => {
    if (book.reviews === undefined) return 0;
    if (book.reviews.length > 0) {
      let count = 0;
      for (let i = 0; i < book.reviews.length; i++) {
        count += +book.reviews[i].rate;
      }
      const avg = count / book.reviews.length;
      let res = (avg * 100) / 5;
      return res;
    } else return 0;
  };

  const getCurrencyIcon = () => {
    switch (listPrice.currencyCode) {
      case 'USD':
        return 'dollar-sign';
      case 'EUR':
        return 'euro-sign';
      default:
        return 'shekel-sign';
    }
  };

  return (
    <Link to={`/book/${book.id}`}>
      <article className='card grid-1 text-center pointer'>
        <div>
          <img
            src={thumbnail}
            alt='Book-Thumbnil'
            className='book-img-preview'
          />
        </div>
        <div>
          <h3 className='text-primary'>
            {title.charAt(0).toUpperCase() + title.slice(1)}{' '}
          </h3>
          <span className='text-grey'>{categories.toString()}</span>
          <ul className='list'>
            <li>
              <ReviewRate rate={getBookRating()} />
            </li>
            <li>
              <span
                className={`badge badge-${
                  listPrice.amount === 0 ? 'danger' : 'primary'
                }`}
              >
                {listPrice.amount}{' '}
                <i className={`fas fa-${getCurrencyIcon()}`}></i>
              </span>
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
};

export default BookPreview;