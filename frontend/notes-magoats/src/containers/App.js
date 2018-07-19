import React, {Component} from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom';
import { history } from './../store/configureStore';
import { connect } from 'react-redux';

import Header from '../containers/Header';
import Home from '../containers/Home';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import Favorites from '../containers/Favorites';

// Higher-Order Component, sometimes known as a decorator.
// even though users can only see the My Favorites link in the header when they're signed in, there's nothing to stop them from navigating to it when they're not authenticated. We need a way to redirect them to the login page if they're trying to access a page only logged in user should be able to see.
// a higher-order component is a function that takes an existing component and then wraps it in another component in order to add some new functionality.
// Here, we have two functions that return Route components. We are passing through a component and checking whether our user is authenticated, then either returning the component we are passing in as an argument or redirecting them to the /login or /favorites location. PrivateRoutes are restricted to authenticated users, and PublicRoutes are restricted to users who are not logged in.
const PrivateRoute = ({component: Component, authenticated, ...props}) => {
  return (
    <Route
      {...props}
      render={(props) => authenticated === true
              ? <Component {...props} />
              : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> }
      />
  );
};

const PublicRoute = ({component: Component, authenticated, ...props}) => {
  return (
    <Route
      {...props}
      render={(props) => authenticated === false
              ? <Component {...props} />
              : <Redirect to='/favorites' /> }
      />
  );
};

// Here, we are calling our <PublicRoute>s and <PrivateRoute> instead of just our vanilla <Route>s. We are also passing through whether our user is authenticated from the store.
// Because this component is now connected to the store, we want to move it to the containers directory and update its location in index.js:
class App extends Component {
  render () {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Header />
          <div className="container">
            <Route exact path="/" component={ Home }/>
            <PublicRoute authenticated={this.props.authenticated }  path="/signup" component={ Signup } />
            <PublicRoute authenticated={this.props.authenticated }  path="/login" component={ Login } />
            <PrivateRoute authenticated={this.props.authenticated }  path="/favorites" component={ Favorites } />
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated };
}

// export default connect(mapStateToProps)(App);
export default connect(mapStateToProps)(App);
