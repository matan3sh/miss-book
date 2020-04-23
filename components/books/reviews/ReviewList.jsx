import ReviewPreview from './ReviewPreview.jsx';
import ReviewForm from './ReviewForm.jsx';

export default class ReviewList extends React.Component {
  state = {
    reviewForm: false,
  };

  onAddReview = () => {
    this.props.onRenderUpdatedPage();
    this.setState({ reviewForm: false });
  };

  render() {
    const { reviews, book, onRemoveReview } = this.props;
    return (
      <div>
        <button
          className='btn btn-dark btn-block'
          onClick={() =>
            this.setState((prevState) => ({
              reviewForm: !prevState.reviewForm,
            }))
          }
        >
          Add Review
        </button>
        {this.state.reviewForm && (
          <ReviewForm
            book={book}
            onAddReview={this.onAddReview}
            onRenderUpdatedPage={this.props.onRenderUpdatedPage}
          />
        )}
        {reviews && reviews.length > 0 ? (
          <div className='my-3'>
            {reviews.map((review) => (
              <ReviewPreview
                book={book}
                review={review}
                key={review.id}
                onRemoveReview={onRemoveReview}
              />
            ))}
          </div>
        ) : (
          <p>No Reviews Yet...</p>
        )}
      </div>
    );
  }
}
