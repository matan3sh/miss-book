import utilService from '../../../services/utilService.js';
import eventBus from '../../../services/eventBusService.js';
import ReviewRate from './ReviewRate.jsx';

export default class ReviewForm extends React.Component {
  state = {
    review: {
      id: utilService.makeId(),
      fullName: '',
      rate: 1,
      readAt: Date.now(),
      textArea: '',
    },
  };

  onChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => {
      return {
        review: {
          ...prevState.review,
          [field]: value,
        },
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { book } = this.props;
    const { review } = this.state;
    if (review.fullName === '' || review.textArea === '') {
      eventBus.emit('show-msg', {
        txt: 'Error',
        body: 'Please fill in all fields',
      });
      return;
    }
    this.setState({
      review: {
        id: utilService.makeId(),
        fullName: 'Books Reader',
        rate: 1,
        readAt: Date.now(),
        textArea: '',
      },
    });
    if (!book.reviews) book.reviews = [];
    book.reviews.unshift(review);
    this.props.onAddReview(book);
  };

  render() {
    return (
      <div className='card-review grid-1'>
        <form className='grid-2' onSubmit={this.onSubmit}>
          <div className='review-left text-center'>
            <input
              type='text'
              placeholder='Full Name'
              name='fullName'
              value={this.state.review.fullName}
              onChange={this.onChange}
            />
            <input
              type='date'
              placeholder='Read At'
              name='readAt'
              value={this.state.review.readAt}
              onChange={this.onChange}
            />
            <ReviewRate rate={(100 / 5) * this.state.review.rate} />
            <input
              type='range'
              name='rate'
              min='1'
              max='5'
              step='1'
              value={this.state.review.rate}
              onChange={this.onChange}
            />
          </div>
          <div className='text-center'>
            <textarea
              name='textArea'
              placeholder='Your Review'
              rows='7'
              value={this.state.review.textArea}
              onChange={this.onChange}
            ></textarea>
            <button
              className='btn btn-primary my-1'
              onClick={() => {
                eventBus.emit('show-msg', {
                  txt: 'Review Added Successfully',
                  body: 'thank you for your honest opinion :)',
                });
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
