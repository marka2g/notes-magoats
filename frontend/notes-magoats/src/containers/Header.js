import React, {Component} from 'react';
import { connect } from 'react-redux';
// update our header to use react-router-dom's Link components to fix this:
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">NotesMa🐐s</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <Link to="/login" className="nav-link" href="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link" href="/signup">Sign Up!</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Header);
