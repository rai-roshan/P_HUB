import React, { useState } from 'react';
import AuthNav from './AuthNav';
import UnAuthNav from './UnAuthNav';

import { Link } from 'react-router-dom';

const Header = (props) => {
    //const [navToggler, setNavToggler] = useState('');
    const [collapse, setCollapse] = useState('');

    const authenticated = false;

    return <nav className="navbar  navbar-dark bg-dark navbar-expand-lg sticky-top mb-3">
          <div className="container">
          <button class="navbar-toggler collapsed" 
          type="button" 
          onClick={ ()=>setCollapse("show") }
          data-toggle="collapse" 
          data-target="#navbarTogglerDemo03" 
          aria-controls="navbarTogglerDemo03" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <Link className="navbar-brand" to="/">DEV Blog</Link>
  
            <div className={ `collapse navbar-collapse ${ collapse } .navbar-expand-lg` } id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">Posts</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/haichao-yu/react-redux-blog">GitHub</a>
                </li>
              </ul>
              <form className="form-inline my-2 my-md-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search Post" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <div className="ml-auto">
                { authenticated ? <AuthNav /> : <UnAuthNav /> }
              </div>
            </div>

            
          </div>
        </nav>
};

export default Header;