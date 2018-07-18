import React, {Component} from 'react';

// Next, we need to simplify our SearchBar component a bit, since we no longer want it to handle any sort of state:
// Our App container, which is wired into Redux, will be handling that now.
class SearchBar extends Component {
  // constructor() {
  //   super();
  //   this.state = {term: ''}
  // }

  onInputChange(term) {
    // this.setState({term});

    // We do want to leave the call to this.props.onTermChange(term)—this is how our App component is going to pass our REQUEST_GIFS action to our SearchBar.
    this.props.onTermChange(term);
  }

  render(){
    // onInputChange calls the onTermChange prop passed from App, and the requestGifs action creator function receives the term as an argument
    return(
      <div className="search">
        <input placeholder="Enter text to search for gifs!" onChange={evt => this.onInputChange(evt.target.value)} />
      </div>
    );
  }
}

export default SearchBar;
