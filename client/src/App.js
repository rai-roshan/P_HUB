import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import StatusAlert from './components/Alert/StatusAlert';
import PrivateRoute from './components/Auth/CheckAuth';
import Welcome from './components/Welcome';
import AllPosts from './components/posts/AllPosts';
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
import UpdatePost from './components/posts/UpdatePost';
import SearchResult from './components/SearchResult';
//import CheckAuth from './components/Auth/CheckAuth';
//import { makeStyles } from '@material-ui/core';

function App() {
  return (
    <Provider store={store}>
    <div className="App">

      <Router>
        <Header />
        <StatusAlert />
        <Switch>
          <Route exact path="/" component={ Welcome } />
          <Route exact path="/posts" component={ AllPosts } />
          <Route path="/signup" component={ Signup2 } />
          <Route path="/signin" component={ Signin2 } />
          <PrivateRoute path='/posts/my' redirectPath='/signin' component={ MyPosts } />
          <PrivateRoute path="/posts/new" redirectPath='/signin' component={ NewPost } />
          <PrivateRoute path="/posts/update/:id" redirectPath="/signin" component={ UpdatePost } />
          <Route path='/posts/view/:id' component={ PostView } />
          <PrivateRoute path="/profile/my" redirectPath='/' component={ ProfileView } />
          <PrivateRoute path="/profile/update" redirectPath='/' component={ UpdateProfile } />
          <Route path='/search/:keyword' component={ SearchResult } />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </div>
    </Provider>
  );
}

export default App;
