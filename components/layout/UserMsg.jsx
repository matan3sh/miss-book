import eventBus from '../../services/eventBusService.js';

export default class UserMsg extends React.Component {
  state = { msg: null };

  componentDidMount() {
    eventBus.on('show-msg', (msg) => {
      const delay = 2500;
      this.setState({ msg });
      setTimeout(() => this.setState({ msg: null }), delay);
    });
  }
  render() {
    var { msg } = this.state;
    return !msg ? (
      ''
    ) : (
      <div className='modal-container'>
        <div className='modal'>
          <h1>{msg.txt}</h1>
          <p>{msg.body}</p>
          <button
            className='user-msg-close my-2'
            onClick={() => this.setState({ msg: '' })}
          >
            Close Me
          </button>
        </div>
      </div>
    );
  }
}
