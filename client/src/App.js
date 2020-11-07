import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import AlertCard from './components/Alert/Alert';
import PrivateRoute from './components/Auth/CheckAuth';
import Welcome from './components/Welcome';
import PostList from './components/posts/PostList';
import Header from './components/NavBar/header';
import Footer from './components/footer';
import Signup2 from './components/Auth/Signup2';
import Signin2 from './components/Auth/Signin2';
import MyPosts from './components/posts/MyPosts';
import NewPost from './components/posts/NewPost';
import PostView from './components/posts/PostView';
import NotFound from './components/NotFound';
import ProfileView from './components/profile/showProfile';
import UpdateProfile from './components/profile/updateProfile';
//import CheckAuth from './components/Auth/CheckAuth';
//import { makeStyles } from '@material-ui/core';

function App() {
  return (
    <Provider store={store}>
    <div className="App">

      <Router>
        <Header />
        <AlertCard />
        <Switch>
          <Route exact path="/" component={ Welcome } />
          <Route exact path="/posts" component={ PostList } />
          <Route path="/signup" component={ Signup2 } />
          <Route path="/signin" component={ Signin2 } />
          <PrivateRoute path='/posts/my' redirectPath='/' component={ MyPosts } />
          <PrivateRoute path="/posts/new" redirectPath='/' component={ NewPost } />
          <Route path='/posts/view/:id' component={ PostView } />
          <PrivateRoute path="/profile/my" redirectPath='/' component={ ProfileView } />
          <PrivateRoute path="/profile/update" redirectPath='/' component={ UpdateProfile } />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </div>
    </Provider>
  );
}

export default App;
