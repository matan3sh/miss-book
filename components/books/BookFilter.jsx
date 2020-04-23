import eventBus from '../../services/eventBusService.js';

export default class BookFilter extends React.Component {
  state = {
    filter: {
      title: '',
      maxPrice: '',
      minPrice: '',
    },
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

  render() {
    const { title, maxPrice, minPrice } = this.state.filter;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='title'
          type='text'
          placeholder='Search By Title'
          value={title}
          onChange={this.onChange}
        />
        {/* <input
          name='maxPrice'
          type='number'
          placeholder='Max Price'
          value={maxPrice}
          onChange={this.onChange}
        />
        <input
          name='minPrice'
          type='number'
          placeholder='Min Price'
          value={minPrice}
          onChange={this.onChange}
        /> */}
        <button className='btn btn-primary btn-block'>Filter</button>
      </form>
    );
  }
}
