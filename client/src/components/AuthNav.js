import React from 'react';
import { Link } from 'react-router-dom';

const AuthNav = ({ handleSignOut, username }) => {
  
    return <div className="navbar-nav nav-item dropdown ml-auto">
          <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{username ? "rai" : "not conn"}</a>
          <div className="dropdown-menu" aria-labelledby="dropdown02">
            <Link className="dropdown-item" to="/my_posts">Your Posts</Link>
            <Link className="dropdown-item" to="/profile">Your Profile</Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/settings">Settings</Link>
            <Link className="dropdown-item" to="/" onClick={ handleSignOut }>Sign out</Link>
          </div>
        </div>
 };

export default AuthNav;
