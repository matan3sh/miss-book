const { NavLink } = ReactRouterDOM;

const Navbar = ({ title, icon }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <NavLink exact to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/book'>
            Books
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/addbook'>
            Google Books
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/about'>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Miss Books',
  icon: 'fas fa-book',
};

export default Navbar;
