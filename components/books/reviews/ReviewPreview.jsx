import utilService from '../../../services/utilService.js';
import ReviewRate from './ReviewRate.jsx';

const ReviewPreview = ({ review, onRemoveReview }) => {
  return (
    <div>
      <div className='card-review grid-2'>
        <div className='review-left text-center'>
          <img
            className='round-img'
            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
            alt=''
            style={{ width: '50px' }}
          />
          <div>{review.fullName}</div>
          <div className='text-grey'>
            {utilService.getFormattedDate(review.readAt)}
          </div>
          <ReviewRate rate={(100 / 5) * review.rate} />
        </div>
        <div className='grid-1'>
          <h3
            className='pointer'
            onClick={() => onRemoveReview(review.id)}
            style={{ float: 'right' }}
          >
            X
          </h3>
          <div>{review.textArea}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPreview;
