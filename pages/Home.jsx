const { Link } = ReactRouterDOM;

const Home = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Welcome to Store</h1>
          <Link to='/book' className='btn btn-primary'>
            Enter
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
