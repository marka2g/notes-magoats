import React, { Component } from 'react';
import GifHardCodedTemp from './components/GifHardCodedTemp';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <GifHardCodedTemp gifs={ this.props.gifs } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gifs: state.gifs
  };
}

export default connect(mapStateToProps)(App);
