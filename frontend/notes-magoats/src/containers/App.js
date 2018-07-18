import React, { Component } from 'react';
import GifHardCodedTemp from '../components/GifHardCodedTemp';
import { connect } from 'react-redux';

// We are rendering our GifsTemp component and passing in gifs as props—but where is the gifs object coming from? To answer that, we need to look at the next bit of code. - hint mapStateToProps
class App extends Component {
  render() {
    return (
      <div>
        <GifHardCodedTemp gifs={ this.props.gifs } />
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

// connect is what we need to use in order to link React and Redux; ; remember, they're two totally separate libraries! The react-redux package will, essentially, give us a way to pull Redux's state into React as props.
// When we were writing vanilla React, we would export our components directly by writing something like export default App. Here, we are not exporting our App but instead exporting the results of the connect function from react-redux.
// The <Provider> made our Redux store available to any connect()() calls within child components. This is how mapStateToProps can access our state. By doing this, we are not exporting just our vanilla React App component; we are exporting an entirely new, Redux-connected App component.
// why does connect()() has two sets of parentheses? There are actually two different function calls going on here. When connect(mapStateToProps) is called, it actually returns another function; because of the second set of parentheses, this second function is then called immediately with App passed in as an argument.
export default connect(mapStateToProps)(App);
