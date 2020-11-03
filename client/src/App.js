import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

import Welcome from './components/Welcome';
import PostList from './components/posts/PostList';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">

      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ Welcome } />
          <Route exact path="/posts" component={ PostList } />
          <Route path="/signup" component={ Welcome } />
          <Route path="/signup" component={ Welcome } />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
