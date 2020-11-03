import React from 'react';
import {Link} from 'react-router-dom';

const UnAuthNav = () => {

    return <ul className="navbar-nav">
    <li className="nav-item" key={1}>
      <Link className="btn btn-primary" to="/signup">Sign Up</Link>
    </li>
    <li className="nav-item" key={2}>
      <Link className="btn btn-secondary ml-sm-2" to="/signin">Sign In</Link>
    </li>
  </ul>
};

export default UnAuthNav;