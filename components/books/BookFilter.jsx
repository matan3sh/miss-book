export default class BookFilter extends React.Component {
  state = {
    filter: {
      title: '',
      maxPrice: '',
      minPrice: '',
    },
    openFilter: false,
  };

  onChange = ({ target }) => {
    const field = target.name;
    const value =
      target.type === 'number' ? parseInt(target.value) : target.value;

    this.setState(
      (prevState) => ({ filter: { ...prevState.filter, [field]: value } }),
      () => {
        this.props.onSetFilter(this.state.filter);
      }
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSetFilter(this.state.filter);
  };

  openFilter = () => {
    this.setState((prevState) => ({ openFilter: !prevState.openFilter }));
  };

  render() {
    const { title, maxPrice, minPrice } = this.state.filter;
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.openFilter && (
          <React.Fragment>
            <div className='card-review'>
              <input
                name='title'
                type='text'
                placeholder='Search By Title'
                value={title}
                onChange={this.onChange}
              />
            </div>
            <div className='min-max-filter text-center filter-grid-3 card-review'>
              <div>
                <span>{minPrice}</span>
                <input
                  type='range'
                  name='minPrice'
                  min='1'
                  max='200'
                  step='1'
                  value={minPrice}
                  onChange={this.onChange}
                />
              </div>
              <h3 className='filter-title '>
                <i className='fas fa-coins'></i>
              </h3>
              <div>
                <span>{maxPrice}</span>
                <input
                  type='range'
                  name='maxPrice'
                  min='1'
                  max='200'
                  step='1'
                  value={maxPrice}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </React.Fragment>
        )}
        <button
          className='btn btn-dark btn-block my-1'
          onClick={this.openFilter}
        >
          {this.state.openFilter ? 'Search' : 'Filter'}
        </button>
      </form>
    );
  }
}
