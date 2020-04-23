import ReviewRate from './ReviewRate.jsx';

const ReviewPreview = ({ review, onRemoveReview }) => {
  const getFormattedDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
  };

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
          <div className='text-grey'>{getFormattedDate(review.readAt)}</div>
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
