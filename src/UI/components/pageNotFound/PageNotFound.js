import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => (
  <div className='page-not-found'>
    Oops! Looks like page you're searching not found.
    <br />
    Please check URL and try again or go to Home page
    <div className='page-not-found-buttons'>
      <Link className='page-not-found-button page-not-found-button-link' to='/'>
        Home page
      </Link>
    </div>
  </div>
);

export default PageNotFound;