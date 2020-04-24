const ReadMore = ({ description, readMore, onToggleReadMore }) => {
  if (readMore) {
    return (
      <h3 className='text-grey text-left'>
        {description}{' '}
        <span className='sm-text-grey' onClick={() => onToggleReadMore()}>
          (Show Less)
        </span>
      </h3>
    );
  } else {
    return (
      <h3 className='text-grey text-left'>
        {description.slice(0, 100)}{' '}
        <span className='sm-text-grey' onClick={onToggleReadMore}>
          (Show More)
        </span>
      </h3>
    );
  }
};

export default ReadMore;
