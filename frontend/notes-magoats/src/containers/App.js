import React, { Component } from 'react';
import { connect } from 'react-redux';
// Next, we need to update our App to fire our action creator function whenever the search term changes:
import { bindActionCreators } from 'redux';
// we're importing all (expressed with *) exported modules in our actions/index.js file as a single object, Actions. This will give us access to all of our action creators so that we can hook them into our components.
import * as actions from '../actions';
import SearchBar from '../components/SearchBar';
import '../styles/app.css';

//(removed) We are rendering our GifHardCodedTemp component and passing in gifs as props—but where is the gifs object coming from? To answer that, we need to look at the next bit of code. - hint mapStateToProps
class App extends Component {
  // now, passing along our requestGifs action creator to our SearchBar via the onTermChange prop. This means that, whenever the onInputChange method is fired by entering or removing text in the input, our action creator will fire as well.
  // The App component renders a SearchBar, passing through the requestGifs action creator via a prop called onTermChange
  render() {
    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestGifs} />
      </div>
    );
  }
}

// The mapStateToProps function is going to be passed as the first argument of the connect function we imported from react-redux. This function allows the App component to subscribe to the Redux store update; whenever the store changes, mapStateToProps is called. mapStateToProps must return a plain object, and it then becomes available on the App component as props (which we can then pass down to our GifHardCodedTemp component as this.props.gifs.)
// But where are these gifs coming from? Way back in our combineReducers function, we set the result of the GifsReducer as part of our state with the gifs key. Here, in our mapStateToProps function, we are linking the gifs from our GifsReducer to this.props.gifs on our App component.
function mapStateToProps(state) {
  return {
    gifs: state.gifs
  };
}

// But how did our App receive the requestGifs action creator? To understand this, we must look at the next bit of code:
function mapDispatchToProps(dispatch) {
  // bindActionCreators method sets `this.props.actions` on our App
  // bindActionCreators takes a single object whose values are action creators (in this case, our actions object that we imported from src/actions/index.js) and wraps every action creator in a dispatch call so that they can be invoked within our container. This is how our app is notified that there is a state change.
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

// connect is what we need to use in order to link React and Redux; ; remember, they're two totally separate libraries! The react-redux package will, essentially, give us a way to pull Redux's state into React as props.
// When we were writing vanilla React, we would export our components directly by writing something like export default App. Here, we are not exporting our App but instead exporting the results of the connect function from react-redux.
// The <Provider> made our Redux store available to any connect()() calls within child components. This is how mapStateToProps can access our state. By doing this, we are not exporting just our vanilla React App component; we are exporting an entirely new, Redux-connected App component.
// why does connect()() has two sets of parentheses? There are actually two different function calls going on here. When connect(mapStateToProps) is called, it actually returns another function; because of the second set of parentheses, this second function is then called immediately with App passed in as an argument.
export default connect(mapStateToProps, mapDispatchToProps)(App);
