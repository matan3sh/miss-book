const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const history = History.createBrowserHistory();

import Navbar from './components/layout/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import BookApp from './pages/BookApp.jsx';
import BookDetails from './pages/BookDetails.jsx';
import BookAdd from './pages/BookAdd.jsx';
import UserMsg from './components/layout/UserMsg.jsx';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact component={Home} path='/' />
          <Route exact component={About} path='/about' />
          <Route exact component={BookApp} path='/book' />
          <Route exact component={BookDetails} path='/book/:bookId' />
          <Route exact component={BookAdd} path='/addbook' />
        </Switch>
        <UserMsg />
      </Router>
    );
  }
}
